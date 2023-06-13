# from django.shortcuts import render
from .serializers import *
from rest_framework import viewsets
from .models import *
# Create your views here.

class ItemView(viewsets.ModelViewSet):
   serializer_class = ItemsSerializer

   def get_queryset(self):
      queryset = Item.objects.all()
      print(queryset[0].type)
      type = self.request.query_params.get('type')
      if type is not None:
         queryset = queryset.filter(type=type)
      return queryset
   

class IcingsView(viewsets.ModelViewSet):
   serializer_class = IcingsSerializer
   queryset = Icing.objects.all()


class ToppingsView(viewsets.ModelViewSet):
   serializer_class = ToppingsSerializer
   queryset = Topping.objects.all()


class GlazeView(viewsets.ModelViewSet):
   serializer_class = GlazeSerializer
   queryset = Glaze.objects.all()

class FillingsView(viewsets.ModelViewSet):
   serializer_class = FillingsSerializer
   queryset = Topping.objects.all()