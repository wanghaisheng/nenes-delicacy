from django.db.models.signals import pre_save
from django.dispatch import receiver
from PIL import Image
from .models import Products

@receiver(pre_save, sender=Products)
def create_placeholder(sender, instance, **kwargs):
    print('called')
    if instance.image:  
        original_image = Image.open(instance.image)

        if original_image.mode != 'RGB':
            original_image = original_image.convert('RGB')

        # Save placeholder image
        original_image.save(f'media/{instance.name}_placeholder', 'JPEG', quality=5)

        # Update model instance if necessary
        instance.lazyImage = f'media/{instance.name}_placeholder.jpg'
        instance.save()