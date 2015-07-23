# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('yard', '0008_auto_20150517_1538'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='company',
            name='skills',
        ),
        migrations.RemoveField(
            model_name='company',
            name='user',
        ),
        migrations.DeleteModel(
            name='Company',
        ),
    ]
