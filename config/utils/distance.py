from geopy.geocoders import Nominatim
from geopy.distance import geodesic
import math

def get_distance(state, lga):   

    geolocator = Nominatim(user_agent="nene", timeout=5)

    try:
        shop_location = geolocator.geocode("Jos North, Plateau")
    except:
        return None
    shop_lat, shop_lon = shop_location.latitude, shop_location.longitude

    # Geocode client address
    client_location = geolocator.geocode(f"{lga}, {state}")
    client_lat, client_lon= client_location.latitude,  client_location.longitude
   
    # Calculate distance
    distance = geodesic((shop_lat, shop_lon), (client_lat, client_lon)).km
    return math.ceil(distance * 15)