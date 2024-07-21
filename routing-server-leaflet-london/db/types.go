package db

import (
	db "routing/db/sqlc"
)

type ReqID struct {
	ID int64 `uri:"id" binding:"required"`
}

type SearchText struct {
	Text string `form:"text"`
}

type RouteRequestByID struct {
	FromNodeID int64 `form:"from_node_id" binding:"required,min=1"`
	ToNodeID   int64 `form:"to_node_id" binding:"required,min=1"`
}

type Nodes struct {
	Nodes []db.GetNodesByIdsRow
	Err   error
}

type Neighbours []int64

type Edge struct {
	FromNodeID int64
	ToNodeID   int64
	Weight     float64
}

type CityResult struct {
	Cities []db.ListCitiesRow
	Err    error
}

type DijkstraResult struct {
	Paths    []int64
	Distance float64
	Err      error
}

type RouteRequest struct {
	From         string `form:"from" binding:"required"`
	FromLocation string `form:"from_location"`
	To           string `form:"to" binding:"required"`
}

type LocationRequest struct {
	Name string `form:"name" binding:"required"`
}

type RouteRequestJSON struct {
	From         string `json:"from" binding:"required"`
	FromLocation string `json:"from_location"`
	To           string `json:"to" binding:"required"`
}

type RouteRequestData interface {
	GetFrom() string
	GetTo() string
	GetFromLocation() string
}

func (r *RouteRequest) GetFrom() string {
	return r.From
}

func (r *RouteRequest) GetFromLocation() string {
	return r.FromLocation
}

func (r *RouteRequest) GetTo() string {
	return r.To
}

func (r *RouteRequestJSON) GetFrom() string {
	return r.From
}

func (r *RouteRequestJSON) GetFromLocation() string {
	return r.FromLocation
}

func (r *RouteRequestJSON) GetTo() string {
	return r.To
}

type ClosestNodeResult struct {
	Node db.GetClosestPointToQueryLocationRow
	Err  error
}

type ClosestNodeToUserLocationResult struct {
	Node db.GetClosestPointToQueryLocationByLatLngGeomRow
	Err  error
}

type ClosestNodeResultData interface {
	GetNode() interface{}
	GetErr() error
}

func (c *ClosestNodeResult) GetNode() interface{} {
	return c.Node
}

func (c *ClosestNodeResult) GetErr() error {
	return c.Err
}

func (c *ClosestNodeToUserLocationResult) GetNode() interface{} {
	return c.Node
}

func (c *ClosestNodeToUserLocationResult) GetErr() error {
	return c.Err
}
