import osmnx as ox
import pandas as pd

# Install the latest version of osmnx if needed
#!pip install --upgrade osmnx

# Use ox.geometries_from_place or ox.features_from_place depending on the osmnx version
try:
    # For osmnx versions >= 1.2.0
    london_places = ox.geometries_from_place("London, UK", tags={"place": True})
except AttributeError:
    # For older osmnx versions, use ox.features_from_place 
    london_places = ox.features_from_place("London, UK", tags={"place": True})
    # Convert to GeoDataFrame
    london_places = ox.gdf_from_place(london_places)

# Select the desired columns and handle potential missing columns
selected_columns = ['id', 'name', 'geometry']
available_cols = [col for col in selected_columns if col in london_places.columns]

if 'geometry' in london_places.columns:
  london_places['geom'] = london_places['geometry'].apply(lambda x: x.wkt)
  if 'id' not in london_places.columns:
    london_places['id'] = london_places.index # Create a default ID if not present
  
  # Ensure 'name' exists. If not present, create a default 'name' column.
  if 'name' not in london_places.columns:
      london_places['name'] = 'Unnamed Place'

  # Select only the columns specified and save the DataFrame
  london_places[['id', 'name', 'geom']].to_csv("City.csv", index=False)

else:
  print("Warning: 'geometry' column not found. Saving available columns.")
  if 'id' not in london_places.columns:
    london_places['id'] = london_places.index
  
  available_cols = [col for col in ['id', 'name'] if col in london_places.columns]
  london_places[available_cols].to_csv("City.csv", index=False)
