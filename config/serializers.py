from rest_framework import serializers
from django.contrib.auth.models import User
from .models import *



class CollectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Collection
        fields = '__all__'
        depth = 1



class ProductSerializer(serializers.ModelSerializer):
    collection = CollectionSerializer

    class Meta:
        model = Products
        fields = '__all__'
        depth = 1

    def get_collection(self, obj):
        return obj.collection


class ProductVariationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductVariation
        fields = '__all__'


class CartItemSerializer(serializers.ModelSerializer):
    item = ProductSerializer(many=False)

    class Meta:
        model = Cartitem
        fields = ('id', 'cart', 'item', 'quantity', 'price')


class ShippingSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingAddress
        fields =  '__all__'


class EmailSerializer(serializers.ModelSerializer):
   
    class Meta:
        model = CustomerEmail
        fields = '__all__'
        depth = 1


class ProductTypeSerializer(serializers.ModelSerializer):
   
    class Meta:
        model = ProductType
        fields = '__all__'


class StateSerialzer(serializers.ModelSerializer):
   
    class Meta:
        model = States
        fields = '__all__'