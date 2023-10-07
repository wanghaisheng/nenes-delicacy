import geopy
from geopy.geocoders import Nominatim
from geopy.distance import geodesic
import folium

# Geocode shop address
geolocator = Nominatim(user_agent="nene", timeout=10)
shop_location = geolocator.geocode("Jos North, Plateau state")
shop_lat = shop_location.latitude
shop_lon = shop_location.longitude

# Geocode client address
client_location = geolocator.geocode("Lere, Kaduna")
client_lat = client_location.latitude
client_lon = client_location.longitude

# Calculate distance
distance = geodesic((shop_lat, shop_lon), (client_lat, client_lon)).miles

# Print distance
print("Distance between shop and client is {} miles".format(distance))
