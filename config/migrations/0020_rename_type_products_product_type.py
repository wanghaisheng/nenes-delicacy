# Generated by Django 4.2.1 on 2023-06-17 21:56

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('config', '0019_type_alter_products_type'),
    ]

    operations = [
        migrations.RenameField(
            model_name='products',
            old_name='type',
            new_name='product_type',
        ),
    ]