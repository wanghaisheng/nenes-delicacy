# Generated by Django 4.2.1 on 2023-05-29 21:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('config', '0009_remove_size_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='item',
            name='price',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=20, null=True),
        ),
    ]
