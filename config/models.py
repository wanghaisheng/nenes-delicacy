from django.db import models

# Create your models here.

class Size(models.Model):
    type = models.CharField(max_length=100)
    image = models.ImageField(upload_to='images/')
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


class Quantity(models.Model):
    quantity = models.CharField(max_length=200, null=True)
    image = models.ImageField(upload_to="images/")
    price  = models.DecimalField(max_digits=20, decimal_places=2)

    def __str__(self) -> str:
        return self.quantity
    

class Flavour(models.Model):
    type = models.CharField(max_length=100)
    image = models.ImageField(upload_to='images/')
    size = models.ForeignKey(Size, null=True, on_delete=models.CASCADE)
    price  = models.DecimalField(max_digits=20, decimal_places=2)

    def __str__(self) -> str:
        return self.type


class Filling(models.Model):
    type = models.CharField(max_length=100)
    price  = models.DecimalField(max_digits=20, decimal_places=2)


class DougnutTopping(models.Models):
    type = models.CharField(max_length=100)
    image = models.ImageField(upload_to='images/')
    price  = models.DecimalField(max_digits=20, decimal_places=2)


class Item(models.Model):
    name = models.CharField(max_length=100)
    flavours = models.ManyToManyField(Flavour, blank=True)
    filling = models.ForeignKey(Filling, null=True, on_delete=models.CASCADE)
    dTopping = models.ForeignKey(DougnutTopping, null=True, on_delete=models.CASCADE)
    quantity = models.ForeignKey(Quantity, null=True, on_delete=models.CASCADE)
    toppings = models.ManyToManyField(Topping, blank=True)
    icing = models.ForeignKey(Icing, null=True, on_delete=models.CASCADE)
    isCake = models.BooleanField()
    isChops = models.BooleanField()
    isSnakes =  models.BooleanField()

    def __str__(self) -> str:
        return self.name