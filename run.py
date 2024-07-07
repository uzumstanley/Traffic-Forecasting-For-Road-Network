import os

from dotenv import load_dotenv

from database.db import Database
from utils.utils import read_to_graph


def config_env():
    env_mode = os.getenv('ENV', 'production')  # Default to 'production' if ENV mode is not set

    if env_mode == 'development':
        dotenv_file = '.env.development'
    else:
        dotenv_file = '.env.prod'

    load_dotenv(dotenv_file)


def init_db(graph):
    db = Database(
        dbname=os.environ.get("PGDATABASE"),
        user=os.environ.get("PGUSER"),
        host=os.environ.get("PGHOST"),
        password=os.environ.get("PGPASSWORD"),
        sslmode='require'
    )
    db.connect()
    db.insert_nodes_edges(graph=graph)
    db.insert_shapefile_to_postgis(shapefile_path='data/cities/london_cities.shp', table_name='city')


def run():
    config_env()
    if os.path.exists(path="tlrn.geojson"):
        graph = read_to_graph(file_name="tlrn.geojson", should_densify_segments=True, distance=2)
        # init_db(graph=graph)
        # print(graph.edges)
        graph.nodes_to_csv('data/london_nodes.csv')

    else:
        print("❌ File not found!\nExiting...")
