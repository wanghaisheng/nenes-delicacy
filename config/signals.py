from django.db.models.signals import post_save
from django.dispatch import receiver
import cloudinary.uploader
from PIL import Image, ImageFilter
from io import BytesIO
from .models import Products
import requests
import os

@receiver(post_save, sender=Products)
def create_placeholder(sender, instance, **kwargs):

    response = requests.get(instance.image.url)
    file_path = f'{instance.name}_placeholder.jpg'
    if os.path.exists(file_path):
        return
     
    if response.status_code == 200:
        image = Image.open(BytesIO(response.content)).convert('RGB')

        image = image.resize((200, 200), Image.ANTIALIAS).filter(ImageFilter.BLUR)

        # Save placeholder image
        image.save(file_path)
        placeholder = cloudinary.uploader.upload(file_path)
        print(placeholder)

        # Update model instance
        instance.lazyImage = f"v{placeholder['version']}/{placeholder['public_id']}.jpg"
        instance.save()