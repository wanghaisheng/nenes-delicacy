from django.db.models.signals import pre_save
from django.dispatch import receiver
import cloudinary.uploader
from PIL import Image, ImageFilter
from io import BytesIO
from .models import Products, ProductType, Collection
import requests
import os


@receiver(pre_save, sender=Collection)
@receiver(pre_save, sender=ProductType)
@receiver(pre_save, sender=Products)
def create_placeholder(sender, instance, **kwargs):
    
    try:
        response = requests.get(instance.image.url)
        if response.status_code == 200:
            image = Image.open(BytesIO(response.content)).convert('RGB')
    except:
        image = Image.open(instance.image).convert('RGB')
         
    file_path = f'static/images/{instance.name}_placeholder.jpg'
    if os.path.exists(file_path):
        return
     
    image.thumbnail((150, 150))

    # Save placeholder image and add blur filter
    image.filter(ImageFilter.BLUR).save(file_path)
    placeholder = cloudinary.uploader.upload(file_path)

    # Update model instance
    instance.lazyImage = f"v{placeholder['version']}/{placeholder['public_id']}.jpg"
    instance.save()