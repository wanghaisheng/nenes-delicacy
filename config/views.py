# from django.shortcuts import render
from .serializers import *
from rest_framework import viewsets
from .models import *
# Create your views here.

class CakeView(viewsets.Modelviewset):
   serializer_class = CakesSerializer
   queryset = Item.objects.filter(isCake=True)

class SnackView(viewsets.Modelviewset):
   serializer_class = PasterySerializer
   queryset = Item.objects.filter(isSnacks=True)

class ChopsView(viewsets.Modelviewset):
   serializer_class = PasterySerializer
   queryset = Item.objects.filter(isChops=True)

class FlavoursView(viewsets.Modelviewset):
   serializer_class = FlavoursSerializer
   queryset = Flavour.objects.all()
   
class IcingsView(viewsets.Modelviewset):
   serializer_class = IcingsSerializer
   queryset = Icing.objects.all()

class ToppingsView(viewsets.Modelviewset):
   serializer_class = ToppingsSerializer
   queryset = Topping.objects.all()