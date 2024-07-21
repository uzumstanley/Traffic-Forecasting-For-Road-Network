-- name: ListEdges :many
SELECT from_node_id, to_node_id, weight
FROM edge;

-- name: GetEdge :one
SELECT *
FROM edge
where from_node_id = $1
  and to_node_id = $2;

