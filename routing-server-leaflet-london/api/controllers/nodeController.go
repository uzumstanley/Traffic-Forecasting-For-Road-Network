package controller

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"routing/api/utils"
	"routing/db"
)

func (c *Controller) GetNodes(ctx *gin.Context) {
	nodes, err := c.store.ListNodes(ctx)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, utils.ErrorResponse(err))
		return
	}
	ctx.JSON(http.StatusOK, nodes)
}

func (c *Controller) GetNodePointGeoms(ctx *gin.Context) {
	nodePointGeoms, err := c.store.ListNodePointGeoms(ctx)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, utils.ErrorResponse(err))
		return
	}
	ctx.JSON(http.StatusOK, nodePointGeoms)
}

func (c *Controller) GetNodePointGeomByID(ctx *gin.Context) {
	var req db.ReqID

	if err := ctx.ShouldBindUri(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, utils.ErrorResponse(err))
		return
	}

	pointGeom, err := c.store.GetNodePointGeom(ctx, req.ID)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, utils.ErrorResponse(err))
		return
	}
	ctx.JSON(http.StatusOK, pointGeom)
}

func (c *Controller) GetNodeByID(ctx *gin.Context) {
	var req db.ReqID

	if err := ctx.ShouldBindUri(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, utils.ErrorResponse(err))
		return
	}

	nodeID, err := c.store.GetNodeByID(ctx, req.ID)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, utils.ErrorResponse(err))
		return
	}
	ctx.JSON(http.StatusOK, nodeID)
}

func (c *Controller) GetShortestRouteByNodes(ctx *gin.Context) {
	var req db.RouteRequestByID
	if err := ctx.ShouldBind(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, utils.ErrorResponse(err))
		return
	}

	dijkstraResultChan := make(chan db.DijkstraResult, 1)
	nodesChan := make(chan db.Nodes, 1)

	// -->
	go c.calculateShortestPathWorker(ctx, req.FromNodeID, req.ToNodeID, dijkstraResultChan)

	dijkstraResult := <-dijkstraResultChan
	if dijkstraResult.Err != nil {
		ctx.JSON(http.StatusInternalServerError, utils.ErrorResponse(dijkstraResult.Err))
		return
	}

	// -->
	go c.getNodesByIdsWorker(ctx, dijkstraResult.Paths, nodesChan)
	nodesResult := <-nodesChan
	if nodesResult.Err != nil {
		ctx.JSON(http.StatusInternalServerError, utils.ErrorResponse(nodesResult.Err))
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"distance": dijkstraResult.Distance, "paths": nodesResult.Nodes})
}
