from rest_framework import serializers
from .models import *


class CakesSerializer(serializers.Modelserializer):
    class Meta:
        model = Item
        fields = ('name', 'flavors', 'toppings',
                  'icing', 'quantity')


class PasterySerializer(serializers.Modelserialzer):
    class Meta:
        model = Item
        fields = ('name', 'quantity')


class FlavoursSerializer(serializers.Modelserialzer):
    class Meta:
        model = Flavour
        fields = ('type', 'price', 'image', 'size')
        

class IcingsSerializer(serializers.Modelserialzer):
    class Meta:
        model = Icing
        fields = ('type', 'price')


class ToppingsSerializer(serializers.Modelserialzer):
    class Meta:
        model = Topping
        fields = ('name', 'price', 'image')


class SizesSerializer(serializers.Modelserialzer):
    class Meta:
        model = Size
        fields = ('type', 'price')


class FillingsSerializer(serializers.Modelserialzer):
    class Meta:
        model = Filling
        fields = ('type', 'price')


class DougnutSerializer(serializers.Modelserialzer):
    class Meta:
        model = DougnutTopping
        fields = ('type', 'price', 'image')
