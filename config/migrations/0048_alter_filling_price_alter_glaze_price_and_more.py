# Generated by Django 4.2.1 on 2024-04-04 13:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('config', '0047_alter_shippingaddress_deliverydate'),
    ]

    operations = [
        migrations.AlterField(
            model_name='filling',
            name='price',
            field=models.DecimalField(decimal_places=0, max_digits=10),
        ),
        migrations.AlterField(
            model_name='glaze',
            name='price',
            field=models.DecimalField(decimal_places=0, max_digits=10),
        ),
        migrations.AlterField(
            model_name='icing',
            name='price',
            field=models.DecimalField(decimal_places=0, max_digits=10),
        ),
        migrations.AlterField(
            model_name='products',
            name='unit_price',
            field=models.DecimalField(decimal_places=0, max_digits=10, null=True),
        ),
        migrations.AlterField(
            model_name='shippingaddress',
            name='price',
            field=models.DecimalField(decimal_places=0, max_digits=10, null=True),
        ),
        migrations.AlterField(
            model_name='sizes',
            name='price',
            field=models.DecimalField(decimal_places=0, max_digits=10),
        ),
        migrations.AlterField(
            model_name='topping',
            name='price',
            field=models.DecimalField(decimal_places=0, max_digits=10),
        ),
    ]
