# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0009_auto_20160304_1126'),
    ]

    operations = [
        migrations.DeleteModel(
            name='FloorPlan',
        ),
    ]
