from collections import defaultdict
import math
import csv
from typing import Tuple


class Node(object):

    def __init__(self, label=None, x=None, y=None):
        self.label = label
        self.x = x
        self.y = y


class Graph(object):

    def __init__(self):
        """
               self.edges is a dict of all possible next nodes
               e.g. {'X': [  'A', 'B', 'C', 'E'  ], ...}
               self.weights has all the weights between two nodes,
               with the two nodes as a tuple as the key
               e.g. {(X, A): 7, (A, X): 2, ...}
               """
        self.edges = defaultdict(list)
        self.nodes = {}
        self.weights = {}

    def add_node(self, from_node: Node, to_node: Node, weight):
        # Note: assumes edges are bi-directional

        self.nodes[from_node.label] = from_node
        self.nodes[to_node.label] = to_node
        self.edges[from_node.label].append(to_node.label)
        self.edges[to_node.label].append(from_node.label)
        self.weights[(from_node.label, to_node.label)] = weight
        self.weights[(to_node.label, from_node.label)] = weight

    def nodes_to_csv(self, file_name=None, paths=None):
        all_nodes = [(self.nodes[node].x, self.nodes[node].y, self.nodes[node].label) for node in self.nodes]
        if paths is not None:
            if file_name is None:
                file_name = "shortest_path.csv"
            all_nodes = [(self.nodes[node].x, self.nodes[node].y, self.nodes[node].label) for node in paths]
        if file_name is None:
            file_name = "nodes.csv"

        headers = ['X', 'Y', 'L']
        try:
            with open(file_name, 'w', newline='') as file:
                writer = csv.writer(file)
                writer.writerow(headers)
                writer.writerows(all_nodes)
        except FileExistsError:
            print("Could not export")
        else:
            print(f"exported nodes successfully to {file_name}")



    @staticmethod
    def get_weight(from_node: Node, to_node: Node) -> float:
        # Euclidean distance
        delta_y = to_node.y - from_node.y
        delta_x = to_node.x - from_node.x
        return math.sqrt((delta_y ** 2 + delta_x ** 2))
