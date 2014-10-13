# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('yard', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='application',
            name='company_link',
            field=models.CharField(default=b'', max_length=200, blank=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='application',
            name='portal_link',
            field=models.CharField(default=b'', max_length=200, blank=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='application',
            name='position_link',
            field=models.CharField(default=b'', max_length=300, blank=True),
            preserve_default=True,
        ),
    ]
