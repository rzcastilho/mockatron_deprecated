# -*- coding: utf-8 -*-
# Generated by Django 1.9.8 on 2016-07-20 21:14
from __future__ import unicode_literals

import datetime
from django.db import migrations, models
import django.db.models.deletion
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('mockatron_interceptor', '0004_auto_20160720_1616'),
    ]

    operations = [
        migrations.CreateModel(
            name='MockResponse',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('label', models.CharField(max_length=256)),
                ('http_code', models.IntegerField(default=200)),
            ],
        ),
        migrations.AlterField(
            model_name='agent',
            name='created',
            field=models.DateTimeField(default=datetime.datetime(2016, 7, 20, 21, 14, 28, 144492, tzinfo=utc)),
        ),
        migrations.AddField(
            model_name='mockresponse',
            name='agent',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='mockatron_interceptor.Agent'),
        ),
    ]