package controller

import (
	"context"
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
	"routing/api/utils"
	"routing/config"
	"routing/db"
	t "routing/db/sqlc"
	"time"
)

var UserLocation string = "My Location"

func (c *Controller) getClosestNode(ctx context.Context, centroid interface{}, resultChan chan<- db.ClosestNodeResult) {
	defer close(resultChan)
	node, err := c.store.GetClosestPointToQueryLocation(ctx, centroid)
	select {
	case resultChan <- db.ClosestNodeResult{Node: node, Err: err}:
	case <-ctx.Done():
	}
}

func (c *Controller) getClosestNodeByUserLocationGeom(ctx context.Context, centroid interface{}, resultChan chan<- db.ClosestNodeToUserLocationResult) {
	defer close(resultChan)
	node, err := c.store.GetClosestPointToQueryLocationByLatLngGeom(ctx, centroid)
	select {
	case resultChan <- db.ClosestNodeToUserLocationResult{Node: node, Err: err}:
	case <-ctx.Done():
	}
}

func (c *Controller) calculateShortestPathWorker(ctx context.Context, fromID, toID int64, resultChan chan<- db.DijkstraResult) {
	defer close(resultChan)
	paths, distance, err := config.BidirectionalDijkstra(c.Graph, fromID, toID)
	select {
	case resultChan <- db.DijkstraResult{Paths: paths, Distance: distance, Err: err}:
	case <-ctx.Done():
	}
}

func (c *Controller) getNodesByIdsWorker(ctx context.Context, ids []int64, resultChan chan<- db.Nodes) {
	defer close(resultChan)
	nodes, err := c.store.GetNodesByIds(ctx, ids)
	select {
	case resultChan <- db.Nodes{Nodes: nodes, Err: err}:
	case <-ctx.Done():
	}
}

func (c *Controller) getCityWorker(ctx context.Context, placesResult chan<- db.CityResult) {
	defer close(placesResult)
	cities, err := c.store.ListCities(ctx)
	select {
	case placesResult <- db.CityResult{Cities: cities, Err: err}:
	case <-ctx.Done():
	}
}

// Handler for processing route requests
func (c *Controller) handlerBody(ctx *gin.Context, req db.RouteRequestData) {
	// Create a cancellable context for the pipeline
	pipelineCtx, cancel := context.WithCancel(ctx)
	defer cancel()

	// Channels for receiving the closest node results
	closestNodeFromChan := make(chan db.ClosestNodeResult, 1)
	closestNodeFromUserLocationChan := make(chan db.ClosestNodeToUserLocationResult, 1)

	// Process the "From" location based on its type
	if req.GetFrom() == UserLocation {
		go c.getClosestNodeByUserLocationGeom(pipelineCtx, req.GetFromLocation(), closestNodeFromUserLocationChan)
	} else {
		geomFrom, err := c.store.GetCity(pipelineCtx, req.GetFrom())
		if err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{"error": utils.ErrorResponse(err)})
			return
		}
		go c.getClosestNode(pipelineCtx, geomFrom.Geom, closestNodeFromChan)
	}

	// Retrieve the "To" location data
	geomTo, err := c.store.GetCity(pipelineCtx, req.GetTo())
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": utils.ErrorResponse(err)})
		return
	}
	closestNodeToChan := make(chan db.ClosestNodeResult, 1)
	go c.getClosestNode(pipelineCtx, geomTo.Geom, closestNodeToChan)
	fmt.Println("geomTo", geomTo)

	// Handle the request with a timeout
	timeout := 10 * time.Second
	select {
	case <-time.After(timeout):
		ctx.JSON(http.StatusRequestTimeout, gin.H{"error": "Request timed out"})
		return

	case closestNodeFromUserLocationResult := <-closestNodeFromUserLocationChan:
		// Process using the closest node from user location
		if closestNodeFromUserLocationResult.Err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{"error": closestNodeFromUserLocationResult.Err.Error()})
			return
		}
		c.processShortestPath(ctx, pipelineCtx, &closestNodeFromUserLocationResult, closestNodeToChan)

	case closestNodeFromResult := <-closestNodeFromChan:
		// Process using the closest node from the standard location
		if closestNodeFromResult.Err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{"error": closestNodeFromResult.Err.Error()})
			return
		}
		c.processShortestPath(ctx, pipelineCtx, &closestNodeFromResult, closestNodeToChan)
	}
}

// Helper function to process the shortest path calculation and response
func (c *Controller) processShortestPath(ctx *gin.Context, pipelineCtx context.Context, closestFrom db.ClosestNodeResultData, closestToChan chan db.ClosestNodeResult) {
	// Retrieve the "To" node result
	closestNodeToResult := <-closestToChan
	if closestNodeToResult.Err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": closestNodeToResult.Err.Error()})
		return
	}

	var fromNodeId int64
	switch node := closestFrom.GetNode().(type) {
	case t.GetClosestPointToQueryLocationRow:
		fromNodeId = node.ID
	case t.GetClosestPointToQueryLocationByLatLngGeomRow:
		fromNodeId = node.ID
	}

	// Create a channel for Dijkstra result
	dijkstraResultChan := make(chan db.DijkstraResult, 1)
	go c.calculateShortestPathWorker(pipelineCtx, fromNodeId, closestNodeToResult.Node.ID, dijkstraResultChan)

	// Get the Dijkstra result
	dijkstraResult := <-dijkstraResultChan
	if dijkstraResult.Err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": dijkstraResult.Err.Error()})
		return
	}

	// Retrieve the nodes in the path
	nodesChan := make(chan db.Nodes, 1)
	go c.getNodesByIdsWorker(pipelineCtx, dijkstraResult.Paths, nodesChan)

	// Send the response
	nodesResult := <-nodesChan
	if nodesResult.Err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": nodesResult.Err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"distance": dijkstraResult.Distance, "paths": nodesResult.Nodes})
}
