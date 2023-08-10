from django.db import models
from django.contrib.auth.models import User

class Topping(models.Model):
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.name


class Glaze(models.Model):
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.name
    

class Filling(models.Model):
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.name


class Sizes(models.Model):
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.name
    

class Icing(models.Model):
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.name
    
class ProductType(models.Model):
    product_name = models.CharField(max_length=100)
    banner_text = models.TextField()
    banner_image = models.ImageField(upload_to='images')
    image = models.ImageField(upload_to='images', blank=True)
    parameter = models.CharField(max_length=100)

    def __str__(self):
        return self.product_name


class Products(models.Model):

    name = models.CharField(max_length=100)
    image = models.ImageField(upload_to='images', blank=True)
    description = models.TextField(blank=True)
    unit_price = models.DecimalField(max_digits=10, decimal_places=2, null=True)
    product_type = models.ForeignKey(ProductType, on_delete=models.CASCADE, blank=True)


    def __str__(self):
        return self.name
    

class User(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self):
        return str(self.id)
    
class Cart(models.Model):
    session_id = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return str(self.session_id)


class Cartitem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, blank=True, null=True)
    item =  models.ForeignKey(Products, on_delete=models.CASCADE, blank=True, null=True)
    quantity = models.IntegerField(null=True)

    def __str__(self):
        return f' {self.item}: {self.quantity}' 

