from collections import defaultdict
import math
import csv
from typing import List


class Node:
    def __init__(self, label: str, x: float, y: float):
        self.label = label
        self.x = x  # Longitude
        self.y = y  # Latitude


class Graph:
    def __init__(self):
        """
        self.edges is a dictionary of all possible next nodes.
        Example: {'A': ['B', 'C'], 'B': ['A', 'D'], ...}

        self.weights stores the distances between nodes.
        Example: {('A', 'B'): 10.5, ('B', 'A'): 10.5, ...}
        """
        self.edges = defaultdict(list)
        self.nodes = {}
        self.weights = {}

    def add_edge(self, from_node: Node, to_node: Node):
        # Calculate Euclidean distance as the weight
        weight = self.get_weight(from_node, to_node)

        # Add nodes and edges to the graph
        self.nodes[from_node.label] = from_node
        self.nodes[to_node.label] = to_node
        self.edges[from_node.label].append(to_node.label)
        self.edges[to_node.label].append(from_node.label)
        self.weights[(from_node.label, to_node.label)] = weight
        self.weights[(to_node.label, from_node.label)] = weight

    @staticmethod
    def get_weight(from_node: Node, to_node: Node) -> float:
        """Calculate the Euclidean distance between two nodes."""
        delta_x = to_node.x - from_node.x
        delta_y = to_node.y - from_node.y
        return math.sqrt(delta_x**2 + delta_y**2)

    def export_graph(self, file_name="graph_edges.csv"):
        """Export edges and weights to a CSV file."""
        with open(file_name, 'w', newline='') as file:
            writer = csv.writer(file)
            writer.writerow(["From", "To", "Weight"])
            for (from_node, to_node), weight in self.weights.items():
                writer.writerow([from_node, to_node, weight])
        print(f"Graph edges exported to {file_name}")


def load_nodes_from_csv(csv_file: str) -> List[Node]:
    """Load nodes from a CSV file."""
    nodes = []
    with open(csv_file, 'r') as file:
        reader = csv.reader(file)
        next(reader)  # Skip header
        for row in reader:
            x, y, label = float(row[0]), float(row[1]), row[2]
            nodes.append(Node(label, x, y))
    return nodes


if __name__ == "__main__":
    # Define the CSV file path
    csv_path = "/Users/mac/Desktop/NEW SYSTEM/Traffic-Forecasting-For-Road-Network/london_nodes_sparse.csv"

    # Load nodes and construct the graph
    graph = Graph()
    nodes = load_nodes_from_csv(csv_path)

    # Create edges between consecutive nodes
    for i in range(len(nodes) - 1):
        graph.add_edge(nodes[i], nodes[i + 1])

    # Export graph data
    graph.export_graph("london_graph_edges.csv")
