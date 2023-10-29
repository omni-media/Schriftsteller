# django_celery/celery.py
from celery.schedules import crontab
import os
from celery import Celery
from django.conf import settings
from book.tasks import generate_daily_books

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
app = Celery("backend")
app.config_from_object("django.conf:settings", namespace="CELERY")
app.autodiscover_tasks()


# @pp.on_after_finalize.connect
# def setup_periodic_tasks(sender, **kwargs):
#     sender.add_periodic_atask(360, generate_daily_books, name='add every 360 seconds',expires=600)