from django.db import models
from django.contrib.auth.models import User


class Topping(models.Model):
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.name
    

class Sizes(models.Model):
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)


class Icing(models.Model):
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)


class Cake(models.Model):

    COLOR_CHOICES = [
        ('red', 'red'),
        ('yellow', 'yellow'),
        ('blue', 'blue'),
        ('green', 'green'),
        ('pink', 'pink'),
        ('purple', 'purple')
        ('orange', 'orange')
        ('white', 'white')
        ('black', 'black')
        ('vanilla', 'vanilla')
    ]

    name = models.CharField(max_length=100)
    size = models.ForeignKey(Sizes, on_delete=models.CASCADE)
    color = models.CharField(max_length=100, choices=COLOR_CHOICES)
    icing = models.ForeignKey(Icing, on_delete=models.CASCADE)
    toppings = models.ManyToManyField(Topping, blank=True)
    description = models.TextField(blank=True)
    inscription = models.TextField(blank=True)

    @property
    def price(self):
        topping_price = [topping.price for topping in self.toppings.all()]
        return topping_price + self.size.price + self.icing.price


    def __str__(self):
        return self.name
    

class Products(models.Model):

    TYPE_CHOICES = [
        ('cookies', 'cookies'),
        ('fingerfood', 'fingerfood'),
        ('cupcakes', 'cupcakes'),
        ('pasteries', 'pasteries')
    ]

    TYPE_PIECES = [
        ('6', '6'),
        ('10', '10'),
        ('30', '30'),
        ('50', '50'),
        ('100', '100')
    ]

    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    unit_price = price = models.DecimalField(max_digits=10, decimal_places=2)
    type = models.CharField(max_length=500, choices=TYPE_CHOICES)
    pieces = models.CharField(max_length=500, choices=TYPE_PIECES)

    @property
    def price(self):
        return self.price * int(self.pieces)

    def __str__(self):
        return self.name
