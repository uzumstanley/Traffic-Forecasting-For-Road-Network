// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.26.0
// source: edge.sql

package db

import (
	"context"
)

const getEdge = `-- name: GetEdge :one
SELECT id, from_node_id, to_node_id, weight
FROM edge
where from_node_id = $1
  and to_node_id = $2
`

type GetEdgeParams struct {
	FromNodeID int64 `json:"from_node_id"`
	ToNodeID   int64 `json:"to_node_id"`
}

func (q *Queries) GetEdge(ctx context.Context, arg GetEdgeParams) (Edge, error) {
	row := q.db.QueryRow(ctx, getEdge, arg.FromNodeID, arg.ToNodeID)
	var i Edge
	err := row.Scan(
		&i.ID,
		&i.FromNodeID,
		&i.ToNodeID,
		&i.Weight,
	)
	return i, err
}

const listEdges = `-- name: ListEdges :many
SELECT from_node_id, to_node_id, weight
FROM edge
`

type ListEdgesRow struct {
	FromNodeID int64   `json:"from_node_id"`
	ToNodeID   int64   `json:"to_node_id"`
	Weight     float64 `json:"weight"`
}

func (q *Queries) ListEdges(ctx context.Context) ([]ListEdgesRow, error) {
	rows, err := q.db.Query(ctx, listEdges)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	items := []ListEdgesRow{}
	for rows.Next() {
		var i ListEdgesRow
		if err := rows.Scan(&i.FromNodeID, &i.ToNodeID, &i.Weight); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}