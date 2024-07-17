import geopandas as gpd
import psycopg2
from psycopg2.extras import execute_batch
from sqlalchemy import text, create_engine
from sqlalchemy.exc import SQLAlchemyError

from utils.utils import extract_node_id

QUERIES = {
    'node': """
        INSERT INTO node (name, geom)
        VALUES (%s, ST_GeomFromText(%s))
        """,

    'edge': """
        INSERT INTO edge (from_node_id, to_node_id, weight)
        VALUES (%s, %s, %s)
        """
}


class Database:
    def __init__(self, dbname, user, host, password, sslmode='disable'):
        self.dbname = dbname
        self.user = user
        self.host = host
        self.password = password
        self.sslmode = sslmode

    def connect(self):
        try:
            connection = psycopg2.connect(
                dbname=self.dbname,
                user=self.user,
                password=self.password,
                host=self.host,
                sslmode=self.sslmode
            )
            return connection
        except psycopg2.Error as e:
            print(f"❌ Error connecting to the database: {e}")
            return None

    def execute_query(self, connection, query, params=None, fetch=False):
        try:
            cursor = connection.cursor()
            cursor.execute(query, params)
            if fetch:
                result = cursor.fetchall()
                cursor.close()
                return result
            else:
                connection.commit()
                cursor.close()
        except psycopg2.Error as e:
            print(f"❌ Error executing query: {e}")
            connection.rollback()

    def insert_nodes(self, graph):
        connection = self.connect()
        if not connection:
            return

        print("Inserting nodes...")
        node_data = [(graph.nodes[node].label,
                      f'POINT({graph.nodes[node].x} {graph.nodes[node].y})')
                     for node in graph.nodes
                     ]

        try:
            cursor = connection.cursor()
            execute_batch(cursor, QUERIES['node'], node_data)
            connection.commit()
            cursor.close()
            print(f"✅ Inserted {len(node_data)} nodes successfully")
        except psycopg2.Error as e:
            print(f"❌ Unexpected Error occurred when inserting nodes: {e}, exiting...")
            connection.rollback()
            cursor.close()
        finally:
            connection.close()
        print("✅ Node insertion completed successfully without any errors..")

    def insert_edges(self, graph):
        connection = self.connect()
        if not connection:
            return

        print("Inserting edges...")
        edge_data = [(extract_node_id(edge[0]), extract_node_id(edge[1]), graph.weights[edge]) for edge in
                     graph.weights]

        try:
            cursor = connection.cursor()
            execute_batch(cursor, QUERIES['edge'], edge_data)
            connection.commit()
            cursor.close()
            print(f"✅ Inserted {len(edge_data)} edges successfully")
        except psycopg2.Error as e:
            print(f"❌ Unexpected Error occurred when inserting edges: {e}, exiting...")
            connection.rollback()
            cursor.close()
        finally:
            connection.close()
        print("✅ Edge insertion completed successfully without any errors..")

    def insert_nodes_edges(self, graph):
        # Insert nodes first
        self.insert_nodes(graph)
        # Insert edges after nodes
        self.insert_edges(graph)

        print("✅ Insertion completed successfully without any errors..")

    def insert_shapefile_to_postgis(self, shapefile_path, table_name):
        connection = self.connect()
        if not connection:
            print("✅ Database connection is not established.")
            return

        # Read the shapefile
        try:
            gdf = gpd.read_file(shapefile_path)
            print("✅ Shapefile read successfully.")
        except Exception as e:
            print(f"❌ Error reading shapefile: {e}")
            return

        # Create SQLAlchemy engine
        try:
            engine = create_engine(
                f'postgresql+psycopg2://{self.user}:{self.password}@{self.host}/{self.dbname}?sslmode={self.sslmode}')
            print("✅ SQLAlchemy engine created.")
        except SQLAlchemyError as e:
            print(f"❌ Error creating SQLAlchemy engine: {e}")
            return

        # Check the connection using SQLAlchemy
        try:
            with engine.connect() as connection:
                connection.execute(text("SELECT 1"))
            print("✅ SQLAlchemy engine connection established.")
        except SQLAlchemyError as e:
            print(f"❌ Error connecting with SQLAlchemy engine: {e}")
            return

        # Prepare data for insertion
        gdf = gdf[['name', 'geometry']]
        gdf = gdf.rename(columns={'geometry': 'geom'})
        gdf = gdf.set_geometry('geom')

        # Insert data into PostGIS
        try:
            gdf.to_postgis(table_name, engine, if_exists='append', index=False)
            print(f"✅ Data inserted into table '{table_name}' successfully.")
        except Exception as e:
            print(f"❌ Error inserting data into PostGIS: {e}")
            return
