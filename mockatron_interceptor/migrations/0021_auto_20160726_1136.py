# -*- coding: utf-8 -*-
# Generated by Django 1.9.8 on 2016-07-26 14:36
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('mockatron_interceptor', '0020_auto_20160725_1622'),
    ]

    operations = [
        migrations.CreateModel(
            name='Condition',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('field_type', models.CharField(choices=[('CONTENT', 'Content'), ('HEADER', 'HTTP Header'), ('LABEL', 'Label'), ('HTTP_CODE', 'HTTP Code')], max_length=32)),
                ('operator', models.CharField(choices=[('EQUALS', 'Equals'), ('CONTAINS', 'Contains'), ('STARTS_WITH', 'Starts With'), ('ENDS_WITH', 'Ends With')], max_length=16)),
                ('value', models.CharField(max_length=256)),
            ],
        ),
        migrations.CreateModel(
            name='Filter',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('label', models.CharField(max_length=256)),
                ('header', models.CharField(blank=True, max_length=64, null=True)),
            ],
        ),
        migrations.RenameModel(
            old_name='MockResponse',
            new_name='Response',
        ),
        migrations.RemoveField(
            model_name='mockfilter',
            name='agent',
        ),
        migrations.AlterField(
            model_name='agent',
            name='content_type',
            field=models.CharField(blank=True, max_length=64, null=True),
        ),
        migrations.AlterField(
            model_name='agent',
            name='headers',
            field=models.CharField(blank=True, max_length=2048, null=True),
        ),
        migrations.DeleteModel(
            name='MockFilter',
        ),
        migrations.AddField(
            model_name='filter',
            name='agent',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='mockatron_interceptor.Agent'),
        ),
        migrations.AddField(
            model_name='filter',
            name='request_filter',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='request_filter', to='mockatron_interceptor.Condition'),
        ),
        migrations.AddField(
            model_name='filter',
            name='response_filters',
            field=models.ManyToManyField(related_name='response_filters', to='mockatron_interceptor.Condition'),
        ),
    ]
