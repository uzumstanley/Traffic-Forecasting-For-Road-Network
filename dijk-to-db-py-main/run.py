import os
from database.db import Database

from dotenv import load_dotenv
from utils.utils import read_to_graph


def config_env():
    env_mode = os.getenv('ENV', 'production')  # Default to 'production' if ENV mode is not set

    if env_mode == 'development':
        dotenv_file = '.env.development'
    else:
        dotenv_file = '.env'

    load_dotenv(dotenv_file)


def init_db(graph):
    db = Database(
        dbname=os.environ.get("PGDATABASE"),
        user=os.environ.get("PGUSER"),
        host=os.environ.get("PGHOST"),
        password=os.environ.get("PGPASSWORD")
    )
    db.connect()
    db.insert_nodes_edges(graph=graph)
    db.insert_shapefile_to_postgis(shapefile_path='data/place/places.shp', table_name='place')
    db.insert_shapefile_to_postgis(shapefile_path='data/building/building.shp', table_name='building')


def run():
    config_env()
    if os.path.exists(path="paths.geojson"):
        graph = read_to_graph(file_name="paths.geojson", should_densify_segments=True, distance=2)
        init_db(graph=graph)
    else:
        print("❌ File not found!\nExiting...")
