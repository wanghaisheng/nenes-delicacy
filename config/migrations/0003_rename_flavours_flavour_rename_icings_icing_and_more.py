# Generated by Django 4.2.1 on 2023-05-27 08:38

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('config', '0002_items_flavours_items_icing_items_quantity_and_more'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Flavours',
            new_name='Flavour',
        ),
        migrations.RenameModel(
            old_name='Icings',
            new_name='Icing',
        ),
        migrations.RenameModel(
            old_name='Items',
            new_name='Item',
        ),
        migrations.RenameModel(
            old_name='Toppings',
            new_name='Topping',
        ),
    ]
