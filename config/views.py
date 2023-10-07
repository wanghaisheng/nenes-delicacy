import json
from geopy.geocoders import Nominatim
from geopy.distance import geodesic
from rest_framework import viewsets
from django.http import HttpResponse
from django.utils.decorators import method_decorator
from rest_framework.decorators import action
from rest_framework.decorators import api_view
from django.views.decorators.cache import cache_page
from .models import *
from .serializers import *  


CACHE_TTL = 60 * 60

@api_view(['POST'])
def get_distance(request):

    state, lga = request.data['state'], request.data['lga']

    geolocator = Nominatim(user_agent="nene", timeout=10)
    shop_location = geolocator.geocode("Jos North, Plateau")
    shop_lat, shop_lon = shop_location.latitude, shop_location.longitude

    # Geocode client address
    client_location = geolocator.geocode(f'{lga}, {state}') 
    client_lat, client_lon= client_location.latitude,  client_location.longitude
   
    # Calculate distance
    distance = geodesic((shop_lat, shop_lon), (client_lat, client_lon)).km
    print(dir(geodesic))
    return HttpResponse(distance * 10)


class ProductView(viewsets.ModelViewSet):
    serializer_class = ProductSerializer
    queryset = Products.objects.all()


    @method_decorator(cache_page(CACHE_TTL)) 
    def dispatch(self, *args, **kwargs):
        return super(ProductView, self).dispatch(*args, **kwargs)
    

class ProductTypeView(viewsets.ModelViewSet):
    serializer_class = ProductTypeSerializer
    queryset = ProductType.objects.all()

    @method_decorator(cache_page(CACHE_TTL))
    def dispatch(self, *args, **kwargs):
        return super(ProductTypeView, self).dispatch(*args, **kwargs)
    

class CartView(viewsets.ModelViewSet):

    serializer_class = CartItemSerializer

    def get_queryset(self):
        sessionid = self.request.query_params['sessionid']
        cart = Cart.objects.get(session_id=sessionid)
        queryset = Cartitem.objects.filter(cart=cart)
        return queryset
    
    def dispatch(self, *args, **kwargs):
        return super(CartView, self).dispatch(*args, **kwargs)


    @action(detail=False, methods=['get'])
    def createCart(self, request):
            
        sessionid = request.query_params.get('sessionid')
        [cart, completed] = Cart.objects.get_or_create(session_id=sessionid)

        if completed:
            cart.save()
        return HttpResponse('cart created')
    

    @action(detail=False, methods=['post'])
    def addToCart(self, request):

        cart = Cart.objects.get(session_id=request.data['sessionid'])
        item = Products.objects.get(id=request.data['item'])
  
        try:
            cartitem = Cartitem.objects.get(item=item, cart=cart)
            cartitem.quantity += request.data['quantity']

        except Cartitem.DoesNotExist:
            
            cartitem = Cartitem.objects.create(
                quantity=request.data['quantity'], 
                cart=cart,
                item=item
            )

        cartitem.save()
        serializer = CartItemSerializer(cartitem).data
        return HttpResponse(json.dumps(serializer))
    
    
    @action(detail=False, methods=['delete'])
    def deleteCartItem(self, request):
            
        itemId = request.query_params.get('itemId')
        cartitem = Cartitem.objects.get(pk=itemId)

        cartitem.delete()

        return HttpResponse('cartitem deleted')

    
class ToppingView(viewsets.ModelViewSet):
    queryset = Topping.objects.all()
    serializer_class = ToppingSerializer


class SizeView(viewsets.ModelViewSet):
    queryset = Sizes.objects.all()
    serializer_class = ToppingSerializer

    @method_decorator(cache_page(CACHE_TTL))
    def dispatch(self, *args, **kwargs):
        return super(SizeView, self).dispatch(*args, **kwargs)


class IcingView(viewsets.ModelViewSet):
    queryset = Icing.objects.all()
    serializer_class = ToppingSerializer


class StatesView(viewsets.ModelViewSet):
    queryset = States.objects.all()
    serializer_class = ShipmentSerialzer

    @method_decorator(cache_page(CACHE_TTL))
    def dispatch(self, *args, **kwargs):
        return super(StatesView, self).dispatch(*args, **kwargs)
