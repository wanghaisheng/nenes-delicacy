from django.db import models

# Create your models here.

class Size(models.Model):
    type = models.CharField(max_length=100)
    price  = models.DecimalField(max_digits=20, decimal_places=2)

    def __str__(self) -> str:
        return self.type


class Icing(models.Model):
    type = models.CharField(max_length=100)
    price  = models.DecimalField(max_digits=20, decimal_places=2)

    def __str__(self) -> str:
        return self.type


class Topping(models.Model):
    name = models.CharField(max_length=100)
    price  = models.DecimalField(max_digits=20, decimal_places=2)

    def __str__(self) -> str:
        return self.name

class Filling(models.Model):
    type = models.CharField(max_length=100)
    price  = models.DecimalField(max_digits=20, decimal_places=2, null=True)

    def __str__(self) -> str:
        return self.type


class Glaze(models.Model):
    type = models.CharField(max_length=100)

    def __str__(self) -> str:
        return self.type


class Item(models.Model):

    TYPES_IN_CHOICES = [
        ('cake', 'cake'),
        ('finger-food', 'finger food'),
        ('pasteries', 'pasteries'),
        ('cookies', 'cookies'),
        ('cupcakes', 'cupcakes')
    ]
    name = models.CharField(max_length=100)
    image = models.ImageField(upload_to='images/', blank=True)
    price  = models.DecimalField(max_digits=20, decimal_places=2, null=True)
    type = models.CharField(max_length=12, choices=TYPES_IN_CHOICES, null=True)

    def __str__(self) -> str:
        return self.name