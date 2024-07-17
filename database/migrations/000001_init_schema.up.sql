CREATE
EXTENSION IF NOT EXISTS postgis;

-- Create the 'node' table
CREATE TABLE "node"
(
    "id"   BIGSERIAL PRIMARY KEY,
    "name" VARCHAR NOT NULL UNIQUE,
    "geom" GEOMETRY(POINT, 3857) NOT NULL UNIQUE
);

-- Create the 'edge' table
CREATE TABLE "edge"
(
    "id"           BIGSERIAL PRIMARY KEY,
    "from_node_id" BIGINT           NOT NULL,
    "to_node_id"   BIGINT           NOT NULL,
    "weight"       DOUBLE PRECISION NOT NULL,
    CONSTRAINT "fk_from_node_id" FOREIGN KEY ("from_node_id") REFERENCES "node" ("id"),
    CONSTRAINT "fk_to_node_id" FOREIGN KEY ("to_node_id") REFERENCES "node" ("id"),
    CONSTRAINT "edge_unique_constraint" UNIQUE ("from_node_id", "to_node_id")
);

-- Create the 'place' table
CREATE TABLE city
(
    "id"   BIGSERIAL PRIMARY KEY,
    "name" VARCHAR NOT NULL,
    "geom" GEOMETRY(POINT, 3857) NOT NULL UNIQUE
);


-- Create indexes for the 'node' table
CREATE INDEX "idx_node_geom" ON "node" ("geom");

-- Create indexes for the 'edge' table
CREATE INDEX "idx_edge_from_to" ON "edge" ("from_node_id", "to_node_id");
CREATE INDEX "idx_edge_weight" ON "edge" ("weight");

-- Create indexes for the 'city' table
CREATE INDEX "idx_city_name" ON city ("name");
CREATE INDEX "idx_city_geom" ON city ("geom");
