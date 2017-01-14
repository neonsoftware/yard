# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings
import uuidfield.fields


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Application',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('portal', models.CharField(max_length=200, blank=True)),
                ('company', models.CharField(max_length=200, blank=True)),
                ('position', models.CharField(max_length=300, blank=True)),
                ('salary', models.CharField(max_length=100, blank=True)),
                ('contract', models.CharField(max_length=300, blank=True)),
                ('latitude', models.CharField(max_length=20, blank=True)),
                ('longitude', models.CharField(max_length=20, blank=True)),
                ('skills', models.CharField(max_length=200, blank=True)),
                ('written', models.BooleanField(default=False)),
                ('called', models.BooleanField(default=False)),
                ('interviewed', models.BooleanField(default=False)),
                ('followup', models.BooleanField(default=False)),
                ('notes', models.TextField(blank=True)),
                ('next', models.TextField(blank=True)),
                ('cover', models.TextField(blank=True)),
                ('address1', models.CharField(max_length=100, blank=True)),
                ('address2', models.CharField(max_length=100, blank=True)),
                ('c1name', models.CharField(max_length=40, blank=True)),
                ('c1mail', models.CharField(max_length=40, blank=True)),
                ('c1phone', models.CharField(max_length=20, blank=True)),
                ('c2name', models.CharField(max_length=40, blank=True)),
                ('c2mail', models.CharField(max_length=40, blank=True)),
                ('c2phone', models.CharField(max_length=20, blank=True)),
                ('c3name', models.CharField(max_length=40, blank=True)),
                ('c3mail', models.CharField(max_length=40, blank=True)),
                ('c3phone', models.CharField(max_length=20, blank=True)),
                ('c4name', models.CharField(max_length=40, blank=True)),
                ('c4mail', models.CharField(max_length=40, blank=True)),
                ('c4phone', models.CharField(max_length=20, blank=True)),
                ('user', models.ForeignKey(to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='ApplicationAdvanced',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('responded', models.BooleanField(default=False)),
                ('interviewed', models.BooleanField(default=False)),
                ('to_call', models.BooleanField(default=False)),
                ('to_send_other', models.BooleanField(default=False)),
                ('note', models.CharField(max_length=4096)),
                ('pieces_list', models.CharField(max_length=4094)),
            ],
            options={
                'abstract': False,
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Company',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('name', models.CharField(max_length=4096)),
                ('website', models.CharField(max_length=4096)),
                ('description', models.CharField(max_length=4096)),
                ('note', models.CharField(max_length=4096)),
            ],
            options={
                'abstract': False,
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Piece',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('content', models.TextField()),
                ('language', models.CharField(max_length=7, choices=[(b'af', b'Afrikaans'), (b'ar', b'Arabic'), (b'ast', b'Asturian'), (b'az', b'Azerbaijani'), (b'bg', b'Bulgarian'), (b'be', b'Belarusian'), (b'bn', b'Bengali'), (b'br', b'Breton'), (b'bs', b'Bosnian'), (b'ca', b'Catalan'), (b'cs', b'Czech'), (b'cy', b'Welsh'), (b'da', b'Danish'), (b'de', b'German'), (b'el', b'Greek'), (b'en', b'English'), (b'en-au', b'Australian English'), (b'en-gb', b'British English'), (b'eo', b'Esperanto'), (b'es', b'Spanish'), (b'es-ar', b'Argentinian Spanish'), (b'es-mx', b'Mexican Spanish'), (b'es-ni', b'Nicaraguan Spanish'), (b'es-ve', b'Venezuelan Spanish'), (b'et', b'Estonian'), (b'eu', b'Basque'), (b'fa', b'Persian'), (b'fi', b'Finnish'), (b'fr', b'French'), (b'fy', b'Frisian'), (b'ga', b'Irish'), (b'gl', b'Galician'), (b'he', b'Hebrew'), (b'hi', b'Hindi'), (b'hr', b'Croatian'), (b'hu', b'Hungarian'), (b'ia', b'Interlingua'), (b'id', b'Indonesian'), (b'io', b'Ido'), (b'is', b'Icelandic'), (b'it', b'Italian'), (b'ja', b'Japanese'), (b'ka', b'Georgian'), (b'kk', b'Kazakh'), (b'km', b'Khmer'), (b'kn', b'Kannada'), (b'ko', b'Korean'), (b'lb', b'Luxembourgish'), (b'lt', b'Lithuanian'), (b'lv', b'Latvian'), (b'mk', b'Macedonian'), (b'ml', b'Malayalam'), (b'mn', b'Mongolian'), (b'mr', b'Marathi'), (b'my', b'Burmese'), (b'nb', b'Norwegian Bokmal'), (b'ne', b'Nepali'), (b'nl', b'Dutch'), (b'nn', b'Norwegian Nynorsk'), (b'os', b'Ossetic'), (b'pa', b'Punjabi'), (b'pl', b'Polish'), (b'pt', b'Portuguese'), (b'pt-br', b'Brazilian Portuguese'), (b'ro', b'Romanian'), (b'ru', b'Russian'), (b'sk', b'Slovak'), (b'sl', b'Slovenian'), (b'sq', b'Albanian'), (b'sr', b'Serbian'), (b'sr-latn', b'Serbian Latin'), (b'sv', b'Swedish'), (b'sw', b'Swahili'), (b'ta', b'Tamil'), (b'te', b'Telugu'), (b'th', b'Thai'), (b'tr', b'Turkish'), (b'tt', b'Tatar'), (b'udm', b'Udmurt'), (b'uk', b'Ukrainian'), (b'ur', b'Urdu'), (b'vi', b'Vietnamese'), (b'zh-cn', b'Simplified Chinese'), (b'zh-hans', b'Simplified Chinese'), (b'zh-hant', b'Traditional Chinese'), (b'zh-tw', b'Traditional Chinese')])),
                ('schema', models.CharField(max_length=4094)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='PieceCategory',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=40)),
                ('description', models.CharField(max_length=100)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Portal',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('name', models.CharField(max_length=4096)),
                ('website', models.CharField(max_length=4096)),
                ('description', models.CharField(max_length=4096)),
            ],
            options={
                'abstract': False,
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('uuid', uuidfield.fields.UUIDField(unique=True, max_length=32, editable=False, blank=True)),
                ('bio', models.TextField()),
                ('website', models.URLField(null=True)),
                ('has_avatar', models.BooleanField(default=False)),
                ('avatar', models.CharField(max_length=4096)),
                ('user', models.OneToOneField(to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Skill',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=4096)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.AddField(
            model_name='portal',
            name='skills',
            field=models.ManyToManyField(related_name=b'yard_portal_related', to='yard.Skill'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='piece',
            name='category',
            field=models.ForeignKey(to='yard.PieceCategory'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='piece',
            name='skills',
            field=models.ManyToManyField(related_name=b'yard_piece_related', to='yard.Skill'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='company',
            name='skills',
            field=models.ManyToManyField(related_name=b'yard_company_related', to='yard.Skill'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='applicationadvanced',
            name='company',
            field=models.ForeignKey(to='yard.Company'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='applicationadvanced',
            name='portal',
            field=models.ForeignKey(to='yard.Portal'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='applicationadvanced',
            name='skills',
            field=models.ManyToManyField(related_name=b'yard_applicationadvanced_related', to='yard.Skill'),
            preserve_default=True,
        ),
    ]
