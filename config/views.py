from rest_framework import viewsets
from django.http import HttpResponse
from django.utils.decorators import method_decorator
from rest_framework.decorators import action
from django.views.decorators.cache import cache_page
from .models import *
from .serializers import *


CACHE_TTL = 60 * 60

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
    
    def dispatch(self, *args, **kwargs):
        return super(CartView, self).dispatch(*args, **kwargs)
    
    
    @action(detail=False, methods=['get'])
    def get_queryset(self):
        sessionid = self.request.query_params['sessionid']
        cart = Cart.objects.get(session_id=sessionid)
        queryset = Cartitem.objects.filter(cart=cart)
        return queryset
    

    @action(detail=False, methods=['get'])
    def createCart(self, request):
            
        sessionid = request.query_params.get('sessionid')
        [cart, completed] = Cart.objects.get_or_create(session_id=sessionid)

        if completed:
            cart.save()
        
        return HttpResponse('cart created')

    @action(detail=False, methods=['post'])
    def addCart(self, request):

        cart = Cart.objects.get(session_id=request.data['sessionid'])
        item = Products.objects.get(id=request.data['item'])
        
        cartitem = Cartitem.objects.create(
            quantity=request.data['quantity'], 
            cart=cart,
            item=item
        )

        cartitem.save()
        return HttpResponse('cart created')


    
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
