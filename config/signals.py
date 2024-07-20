from django.db.models.signals import post_save
from django.dispatch import receiver
import cloudinary.uploader
from PIL import Image, ImageFilter
from io import BytesIO
from .models import Products, ProductType
import requests
import os

@receiver(post_save, sender=ProductType)
@receiver(post_save, sender=Products)
def create_placeholder(sender, instance, **kwargs):

    # file_path = f'{instance.name}_placeholder.jpg'

    # if os.path.exists(file_path):
    #     return
    
    # image = Image.open(instance.image).convert('RGB')
    # image.thumbnail((150, 150))

    # # Save placeholder image and add blur filter
    # image.filter(ImageFilter.BLUR).save(file_path)

    # # Update model instance
    # instance.lazyImage = file_path
    # instance.save()

    file_path = f'{instance.name}_placeholder.jpg'
    if os.path.exists(file_path):
        return
     
    image = Image.open(instance.image).convert('RGB')

    image.thumbnail((150, 150))

    # Save placeholder image and add blur filter
    image.filter(ImageFilter.BLUR).save(file_path)
    placeholder = cloudinary.uploader.upload(file_path)

    # Update model instance
    instance.lazyImage = f"v{placeholder['version']}/{placeholder['public_id']}.jpg"
    instance.save()