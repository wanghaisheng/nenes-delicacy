# Generated by Django 4.2.1 on 2023-06-17 22:10

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('config', '0023_rename_product_type_products_type'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='products',
            name='type',
        ),
    ]