import geopy
from geopy.geocoders import Nominatim
from geopy.distance import geodesic
import folium

# Geocode shop address
geolocator = Nominatim(user_agent="nene", timeout=10)
shop_location = geolocator.geocode("No")
shop_lat = shop_location.latitude
shop_lon = shop_location.longitude

# Geocode client address
client_location = geolocator.geocode("alausa, ikeja") 
client_lat = client_location.latitude
client_lon = client_location.longitude

# Calculate distance
distance = geodesic((shop_lat, shop_lon), (client_lat, client_lon)).miles

# Print distance
print("Distance between shop and client is {} miles".format(distance))

# Create folium map
my_map = folium.Map(location=[shop_lat, shop_lon], zoom_start=11) 

# Add markers to map
folium.Marker([shop_lat, shop_lon], popup="My Shop").add_to(my_map)
folium.Marker([client_lat, client_lon], popup="Client").add_to(my_map)

# Save map 
my_map.save("map.html")