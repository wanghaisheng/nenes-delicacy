from rest_framework import viewsets
from django.contrib.auth.models import User
from .models import Cake, Topping, Order, CustomerProfile
from .serializers import (
    ToppingSerializer,
    CakeSerializer,
    UserSerializer,
    OrderSerializer,
    CustomerProfileSerializer,
)



class CakeViewSet(viewsets.ModelViewSet):
    queryset = Cake.objects.all()
    serializer_class = CakeSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer


class CustomerProfileViewSet(viewsets.ModelViewSet):
    queryset = CustomerProfile.objects.all()
    serializer_class = CustomerProfileSerializer