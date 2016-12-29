# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('yard', '0006_auto_20141019_1550'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='tutorial',
            field=models.IntegerField(default=0),
            preserve_default=False,
        ),
    ]
