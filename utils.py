import re

import geopandas as gdp
from shapely import Point, LineString
from shapely.wkt import loads

from graph.graph import Node, Graph


class NodeKeyGenerator:

    def __init__(self):
        self.counter = 1
        self.key_map = {}

    def generate_node_key(self, data):
        if data in self.key_map:
            return self.key_map[data]

        key = f"n{self.counter}"
        self.counter += 1
        self.key_map[data] = key
        return key


def extract_node_id(node_label_string):
    match = re.search(r'\d+', node_label_string)
    return int(match.group()) if match else None


def read_to_graph(file_name, should_densify_segments=False, distance=2):
    new_graph = Graph()
    node_key_generator = NodeKeyGenerator()

    gdf = gdp.read_file(file_name)

    for index, current_row in gdf.iterrows():

        if should_densify_segments:
            current_segment = list(line_densify(polyline=current_row.geometry, step_dist=distance).coords)
        else:
            current_segment = list(current_row.geometry.coords)

        prev_coords_pair = None
        for (x, y, z) in current_segment:
            if prev_coords_pair is not None:
                x_from, y_from = prev_coords_pair
                from_node = Node(
                    x=x_from,
                    y=y_from,
                    label=node_key_generator.generate_node_key(
                        f"{x_from}-{y_from}"
                    )
                )

                to_node = Node(
                    x=x,
                    y=y,
                    label=node_key_generator.generate_node_key(
                        f"{x}-{y}"
                    )
                )

                new_graph.add_node(
                    from_node=from_node,
                    to_node=to_node,
                    weight=new_graph.get_weight(
                        from_node=from_node,
                        to_node=to_node
                    ))
            prev_coords_pair = x, y

    return new_graph


def line_densify(polyline, step_dist):
    coords = list(polyline.coords)
    segments = list(zip(coords[:-1], coords[1:]))
    dens_coords = []
    for i, segment in enumerate(segments):
        a, b = segment
        seg_coords = segment_densify(a, b, step_dist)
        dens_coords.extend(seg_coords if i == 0 else seg_coords[1:])
    return LineString(dens_coords)


def segment_densify(pt_a, pt_b, step_dist):
    pt_b_geom = Point(pt_b)
    geom = LineString([pt_a, pt_b])
    inter_dist = step_dist
    dense_coords = [pt_a]
    while inter_dist < geom.length:
        pt = geom.interpolate(inter_dist)
        gap = pt.distance(pt_b_geom)
        if gap > step_dist:
            dense_coords.append(pt)
        inter_dist += step_dist
    dense_coords.append(pt_b)
    return dense_coords


# Example for segment densify
if __name__ == '__main__':
    wkt = "LINESTRING ( 35 758, 1480 729 )"
    geom = line_densify(loads(wkt), 50)
    print(geom)
