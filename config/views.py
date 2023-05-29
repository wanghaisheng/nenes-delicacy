# from django.shortcuts import render
from .serializers import *
from rest_framework import viewsets
from .models import *
# Create your views here.

class CakeView(viewsets.Modelviewset):
   serializer_class = ItemsSerializer
   queryset = Item.objects.filter(cake=True)


class PasteryView(viewsets.Modelviewset):
   serializer_class = ItemsSerializer
   queryset = Item.objects.filter(pastery=True)


class SavouryView(viewsets.Modelviewset):
   serializer_class = ItemsSerializer
   queryset = Item.objects.filter(savoury=True)
   

class IcingsView(viewsets.Modelviewset):
   serializer_class = IcingsSerializer
   queryset = Icing.objects.all()


class ToppingsView(viewsets.Modelviewset):
   serializer_class = ToppingsSerializer
   queryset = Topping.objects.all()


class GlazeView(viewsets.Modelviewset):
   serializer_class = GlazeSerializer
   queryset = Glaze.objects.all()

class FillingsView(viewsets.Modelviewset):
   serializer_class = FillingsSerializer
   queryset = Topping.objects.all()