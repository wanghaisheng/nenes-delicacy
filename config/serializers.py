from rest_framework import serializers
from .models import *


class ItemsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ['name', 'image', 'price']


class IcingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Icing
        fields = ('type', 'price')


class ToppingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topping
        fields = ('name', 'price', 'image')


class SizesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Size
        fields = ('type', 'price')


class FillingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Filling
        fields = ('type', 'price')


class GlazeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Glaze
        fields = ('type', 'price', 'image')
