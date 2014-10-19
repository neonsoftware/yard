# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('yard', '0005_auto_20141019_1540'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Document',
            new_name='Cover',
        ),
    ]
