from django.db import models
from cloudinary.models import CloudinaryField
from django.contrib.auth.models import User
from phonenumber_field.modelfields import PhoneNumberField


class Topping(models.Model):
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=0)

    def __str__(self):
        return self.name
    

class Layer(models.Model):
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=0)

    def __str__(self):
        return self.name


class Filling(models.Model):
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=0)

    def __str__(self):
        return self.name


class Sizes(models.Model):
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=0)

    def __str__(self):
        return self.name
    

class Icing(models.Model):
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=0)

    def __str__(self):
        return self.name
    
class ProductType(models.Model):
    name = models.CharField(max_length=100, null=True, blank=True)
    bannerText = models.TextField(null=True, blank=True)
    # bannerImage = CloudinaryField('bannerImage', null=True, blank=True)
    # lazyImage = CloudinaryField('lazyImage', null=True, blank=True)
    # image = CloudinaryField('image', null=True, blank=True)
    bannerImage = models.ImageField('bannerImage', null=True, blank=True)
    lazyImage = models.ImageField('lazyImage', null=True, blank=True)
    image = models.ImageField('images', null=True, blank=True)
    parameter = models.CharField(max_length=100, null=True, blank=True)

    def __str__(self):
        return self.name


class Products(models.Model):
    name = models.CharField(max_length=100)
    # image = CloudinaryField('image', null=True)
    # lazyImage= CloudinaryField('image', null=True)
    image = models.ImageField('images', null=True)
    lazyImage= models.ImageField('images', null=True)
    description = models.TextField(blank=True)  
    unit_price = models.DecimalField(max_digits=10, decimal_places=0, null=True)
    product_type = models.ForeignKey(ProductType, on_delete=models.CASCADE, blank=True)


    def __str__(self):
        return self.name
    

class User(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self):
        return str(self.id)

    
class Cart(models.Model):
    session_id = models.CharField(max_length=100, blank=True, null=True)
    ordered = models.BooleanField(default=False, null=True, blank=True)
    date_ordered = models.DateField(null=True, blank=True)

    def __str__(self): 
        return str(self.session_id)
  

class Cartitem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, blank=True, null=True)
    item =  models.ForeignKey(Products, on_delete=models.CASCADE, blank=True, null=True)
    quantity = models.IntegerField(null=True)

    @property
    def price(self):
        return str(self.item.unit_price * self.quantity)

    def __str__(self):
        return f' {self.item}: {self.quantity}'
  
    
class States(models.Model):
    state = models.CharField(max_length=100)
    lga = models.JSONField(null=True)

    def __str__(self):
        return self.state
    
 
class ShippingAddress(models.Model):
    session_id = models.CharField(max_length=100, blank=True, null=True)
    address = models.CharField(max_length=200, blank=True, null=True)
    firstName = models.CharField(max_length=100, blank=True, null=True)
    lastName = models.CharField(max_length=100, blank=True, null=True)
    phone = PhoneNumberField(null=True)
    price = models.DecimalField(max_digits=10, decimal_places=0, null=True)
    state = models.CharField(max_length=100, blank=True, null=True)
    lga = models.CharField(max_length=100, blank=True, null=True)
    email = models.EmailField(max_length=100, blank=True, null=True)
    deliveryDate = models.DateField(blank=True, null=True)
    routeProtection = models.BooleanField(default=False, null=True, blank=True)

    def __str__(self):
        return f'{self.session_id}: {self.address}'

