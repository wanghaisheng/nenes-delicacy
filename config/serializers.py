from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Cake, Topping, Order, CustomerProfile


class ToppingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topping
        fields = '__all__'


class CakeSerializer(serializers.ModelSerializer):
    toppings = ToppingSerializer(many=True)

    class Meta:
        model = Cake
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']


class OrderSerializer(serializers.ModelSerializer):
    cake = CakeSerializer()
    customer = UserSerializer()

    class Meta:
        model = Order
        fields = '__all__'


class CustomerProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = CustomerProfile
        fields = '__all__'