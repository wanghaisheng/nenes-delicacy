from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register(Icing)
admin.site.register(Products)
admin.site.register(ProductType)
admin.site.register(Topping)
admin.site.register(Sizes)
admin.site.register(Glaze)
admin.site.register(Filling)
admin.site.register(Cartitem)
admin.site.register(Cart)
admin.site.register(User)

