# Generated by Django 4.2.1 on 2023-06-17 18:30

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('config', '0016_alter_glaze_sprinkles'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='glaze',
            name='sprinkles',
        ),
    ]
