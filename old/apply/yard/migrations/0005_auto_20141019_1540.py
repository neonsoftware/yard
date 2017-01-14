# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('yard', '0004_auto_20141017_1835'),
    ]

    operations = [
        migrations.CreateModel(
            name='Document',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('name', models.CharField(max_length=4096)),
                ('content', models.TextField(default=b'')),
            ],
            options={
                'abstract': False,
            },
            bases=(models.Model,),
        ),
        migrations.RemoveField(
            model_name='applicationadvanced',
            name='company',
        ),
        migrations.RemoveField(
            model_name='applicationadvanced',
            name='portal',
        ),
        migrations.RemoveField(
            model_name='applicationadvanced',
            name='skills',
        ),
        migrations.DeleteModel(
            name='ApplicationAdvanced',
        ),
        migrations.RemoveField(
            model_name='portal',
            name='skills',
        ),
        migrations.DeleteModel(
            name='Portal',
        ),
    ]
