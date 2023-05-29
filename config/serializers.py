from rest_framework import serializers
from .models import *


class ItemsSerializer(serializers.Modelserializer):
    class Meta:
        model = Item
        fields = ('name', 'image', 'price',)


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


class GlazeSerializer(serializers.Modelserialzer):
    class Meta:
        model = Glaze
        fields = ('type', 'price', 'image')
