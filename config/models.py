from django.db import models
from django.contrib.auth.models import User

class Topping(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Cake(models.Model):
    FLAVOR_CHOICES = [
        ('chocolate', 'Chocolate'),
        ('vanilla', 'Vanilla'),
        ('strawberry', 'Strawberry'),
        ('red velvet', 'Red Velvet'),
        
    ]

    SIZE_CHOICES = [
        ('small', 'Small'),
        ('medium', 'Medium'),
        ('large', 'Large'),
    ]



    name = models.CharField(max_length=100)
    flavor = models.CharField(max_length=20, choices=FLAVOR_CHOICES)
    size = models.CharField(max_length=20, choices=SIZE_CHOICES)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    toppings = models.ManyToManyField(Topping, blank=True)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name


class Order(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    ]

    cake = models.ForeignKey(Cake, on_delete=models.CASCADE)
    customer = models.ForeignKey(User, on_delete=models.CASCADE)
    customization = models.TextField(blank=True)
    delivery_date = models.DateField()
    delivery_time = models.TimeField()
    delivery_address = models.CharField(max_length=200)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    quantity = models.IntegerField(default=4)

    def __str__(self):
        return f"{self.cake.name} - {self.customer.username}"



class CustomerProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone_number = models.CharField(max_length=20)
    address = models.CharField(max_length=200)

    def __str__(self):
        return self.user.username
