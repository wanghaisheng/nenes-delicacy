# Generated by Django 4.2.1 on 2023-05-27 08:36

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('config', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='items',
            name='flavours',
            field=models.ManyToManyField(blank=True, to='config.flavours'),
        ),
        migrations.AddField(
            model_name='items',
            name='icing',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='config.icings'),
        ),
        migrations.AddField(
            model_name='items',
            name='quantity',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='config.quantity'),
        ),
        migrations.AddField(
            model_name='items',
            name='toppings',
            field=models.ManyToManyField(blank=True, to='config.toppings'),
        ),
    ]
