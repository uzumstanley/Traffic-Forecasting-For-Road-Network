package config

import (
	"routing/db"
)

/*
	Graph

Edges is a map of all possible next nodes

	e.g. {'X': ['A', 'B', 'C', 'E'], ...}
	Weights has all the Weights between two nodes,
	with the two nodes as a tuple as the key
	e.g. {[ 'X', 'A' ]: 7, [ 'X', 'B' ]: 2, ...}
*/

type Node struct {
	label string
	x, y  float64
}

// Graph implementation
type Graph struct {
	Edges   map[int64]db.Neighbours
	Weights map[db.Edge]float64
}

func NewGraph() *Graph {
	return &Graph{}
}

func (g *Graph) AddEdge(fromNode, toNode int64, weight float64) error {
	g.initializeMaps()
	g.Edges[fromNode] = append(g.Edges[fromNode], toNode)
	g.Edges[toNode] = append(g.Edges[toNode], fromNode)
	g.Weights[db.Edge{FromNodeID: fromNode, ToNodeID: toNode}] = weight
	return nil
}

func (g *Graph) initializeMaps() {
	if g.Edges == nil {
		g.Edges = make(map[int64]db.Neighbours)
	}
	if g.Weights == nil {
		g.Weights = make(map[db.Edge]float64)
	}
}

func (g *Graph) GetEdges() map[int64]db.Neighbours {
	return g.Edges
}

func (g *Graph) GetWeights() map[db.Edge]float64 {
	return g.Weights
}
