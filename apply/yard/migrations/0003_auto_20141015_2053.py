# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('yard', '0002_auto_20141013_1642'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='piece',
            name='category',
        ),
        migrations.RemoveField(
            model_name='piece',
            name='schema',
        ),
        migrations.RemoveField(
            model_name='piece',
            name='skills',
        ),
        migrations.AddField(
            model_name='piece',
            name='legend',
            field=models.CharField(default=b'', max_length=9064),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='piece',
            name='tags',
            field=models.CharField(default=b'', max_length=4096),
            preserve_default=True,
        ),
    ]
