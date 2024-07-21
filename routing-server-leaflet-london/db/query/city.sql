-- name: GetClosestPointToQueryLocationByLatLngGeom :one
SELECT id,
       name,
       ST_ASTEXT(geom) AS closest_geom
FROM node
ORDER BY geom <-> st_transform(ST_GEOMFROMTEXT($1, 4326), 3857) LIMIT 1;

-- name: SearchCity :many
SELECT id, name, ST_ASTEXT(ST_TRANSFORM(geom, 4326)) as geom
FROM city
WHERE name ILIKE '%' || @text::text || '%';

-- name: ListCities :many
SELECT name
     , ST_ASTEXT(geom)                     as geom
     , ST_ASTEXT(ST_TRANSFORM(geom, 4326)) as geom_geographic
from city
order by id;

-- name: GetCity :one
SELECT name,
       ST_ASTEXT(geom)                     as geom,
       ST_ASTEXT(ST_TRANSFORM(geom, 4326)) as geom_geographic
from city
where name = $1;

-- name: GetCityGeom :one
SELECT ST_ASTEXT(geom)                     as geom,
       ST_ASTEXT(ST_TRANSFORM(geom, 4326)) as geom_geographic
from city
where name = $1;