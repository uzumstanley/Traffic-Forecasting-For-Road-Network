package config

import (
	"container/heap"
	"fmt"
	"math"
	"routing/db"
	"sync"
	"time"
)

type PreviousNodeAndWeight struct {
	prevNode int64
	weight   float64
}

func BidirectionalDijkstra(graph *Graph, initial, end int64) ([]int64, float64, error) {
	startTime := time.Now()

	var shortestPathsMu sync.Mutex
	forwardPaths := make(map[int64]PreviousNodeAndWeight)
	backwardPaths := make(map[int64]PreviousNodeAndWeight)
	forwardPaths[initial] = PreviousNodeAndWeight{prevNode: -1, weight: 0}
	backwardPaths[end] = PreviousNodeAndWeight{prevNode: -1, weight: 0}
	visitedForward := make(map[int64]bool)
	visitedBackward := make(map[int64]bool)
	forwardQueue := &PriorityQueue{}
	backwardQueue := &PriorityQueue{}
	heap.Init(forwardQueue)
	heap.Init(backwardQueue)
	heap.Push(forwardQueue, &Item{value: initial, priority: 0})
	heap.Push(backwardQueue, &Item{value: end, priority: 0})
	bestPath := int64(-1)
	bestWeight := math.Inf(1)

	visitNode := func(queue *PriorityQueue, paths, otherPaths map[int64]PreviousNodeAndWeight, visited map[int64]bool) {
		if queue.Len() == 0 {
			return
		}

		item := heap.Pop(queue).(*Item)
		currentNode := item.value
		currentWeight := item.priority

		if visited[currentNode] {
			return
		}
		visited[currentNode] = true

		if otherPath, exists := otherPaths[currentNode]; exists {
			pathWeight := currentWeight + otherPath.weight
			if pathWeight < bestWeight {
				bestWeight = pathWeight
				bestPath = currentNode
			}
		}

		destinations := graph.GetEdges()[currentNode]
		for _, nextNode := range destinations {
			weight := graph.GetWeights()[db.Edge{FromNodeID: currentNode, ToNodeID: nextNode}] + currentWeight
			shortestPathsMu.Lock()
			if nextWeight, ok := paths[nextNode]; !ok || weight < nextWeight.weight {
				paths[nextNode] = PreviousNodeAndWeight{prevNode: currentNode, weight: weight}
				heap.Push(queue, &Item{value: nextNode, priority: weight})
			}
			shortestPathsMu.Unlock()
		}
	}

	for forwardQueue.Len() > 0 && backwardQueue.Len() > 0 {
		visitNode(forwardQueue, forwardPaths, backwardPaths, visitedForward)
		visitNode(backwardQueue, backwardPaths, forwardPaths, visitedBackward)
		if bestPath != -1 {
			break
		}
	}

	if bestPath == -1 {
		return nil, 0, fmt.Errorf("route not possible")
	}

	// Reconstruct the path
	var path []int64
	for curr := bestPath; curr != -1; curr = forwardPaths[curr].prevNode {
		path = append([]int64{curr}, path...)
	}
	for curr := backwardPaths[bestPath].prevNode; curr != -1; curr = backwardPaths[curr].prevNode {
		path = append(path, curr)
	}

	timeElapsed := time.Since(startTime)
	fmt.Printf("Bidirectional Dijkstra took %s\n", timeElapsed)

	return path, bestWeight, nil
}

// Dijkstra finds the shortest path from initial to end node and returns the path as node IDs.
func Dijkstra(graph *Graph, initial, end int64) ([]int64, float64, error) {
	startTime := time.Now()
	shortestPaths := make(map[int64]PreviousNodeAndWeight)
	shortestPaths[initial] = PreviousNodeAndWeight{prevNode: -1, weight: 0} // Use -1 to indicate no previous node
	visited := make(map[int64]bool)
	currentNode := initial

	for currentNode != -1 {
		if currentNode == end {
			break
		}
		visited[currentNode] = true
		destinations := graph.GetEdges()[currentNode]
		weightToCurrentNode := shortestPaths[currentNode].weight

		for _, nextNode := range destinations {
			weight := graph.GetWeights()[db.Edge{FromNodeID: currentNode, ToNodeID: nextNode}] + weightToCurrentNode
			if nextWeight, ok := shortestPaths[nextNode]; !ok || weight < nextWeight.weight {
				shortestPaths[nextNode] = PreviousNodeAndWeight{prevNode: currentNode, weight: weight}
			}
		}

		currentNode = -1
		minWeight := math.Inf(1)
		for node, pw := range shortestPaths {
			if !visited[node] && pw.weight < minWeight {
				minWeight = pw.weight
				currentNode = node
			}
		}
	}

	if shortestPaths[end].prevNode == -1 {
		return nil, 0, fmt.Errorf("route not possible")
	}

	// Reconstruct path
	var path []int64
	for curr := end; curr != -1; curr = shortestPaths[curr].prevNode {
		path = append([]int64{curr}, path...)
	}

	timeElapsed := time.Since(startTime)
	fmt.Printf("DijkstraSeq took %s\n", timeElapsed)
	return path, shortestPaths[end].weight, nil
}

func DijkstraConcurrent(graph *Graph, initial, end int64) ([]int64, float64, error) {
	startTime := time.Now()

	var shortestPathsMu sync.Mutex
	shortestPaths := make(map[int64]PreviousNodeAndWeight)
	shortestPaths[initial] = PreviousNodeAndWeight{prevNode: -1, weight: 0}
	visited := make(map[int64]bool)
	currentNode := initial

	for currentNode != -1 {
		if currentNode == end {
			break
		}
		visited[currentNode] = true
		destinations := graph.GetEdges()[currentNode]
		weightToCurrentNode := shortestPaths[currentNode].weight

		var wg sync.WaitGroup
		wg.Add(len(destinations))
		for _, nextNode := range destinations {
			go func(nextNode int64) {
				defer wg.Done()
				weight := graph.GetWeights()[db.Edge{FromNodeID: currentNode, ToNodeID: nextNode}] + weightToCurrentNode
				shortestPathsMu.Lock()
				if nextWeight, ok := shortestPaths[nextNode]; !ok || weight < nextWeight.weight {
					shortestPaths[nextNode] = PreviousNodeAndWeight{prevNode: currentNode, weight: weight}
				}
				shortestPathsMu.Unlock()
			}(nextNode)
		}
		wg.Wait()

		currentNode = -1
		minWeight := math.Inf(1)
		for node, pw := range shortestPaths {
			if !visited[node] && pw.weight < minWeight {
				minWeight = pw.weight
				currentNode = node
			}
		}
	}

	if shortestPaths[end].prevNode == -1 {
		return nil, 0, fmt.Errorf("route not possible")
	}

	// Reconstruct path
	var path []int64
	for curr := end; curr != -1; curr = shortestPaths[curr].prevNode {
		path = append([]int64{curr}, path...)
	}

	timeElapsed := time.Since(startTime)
	fmt.Printf("DijkstraConc took %s\n", timeElapsed)

	return path, shortestPaths[end].weight, nil
}
