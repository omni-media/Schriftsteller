import random

from book.scripts.make_book import make_book
from celery import shared_task
from django.core.files.storage import default_storage
from book.models import *
import json
import time
from django.core.files.base import ContentFile


@shared_task()
def generate_daily_books():
    book = make_book()
    book_id = book['title'] + str(time.time()).split(".")[0]
    book_id = book_id.replace(" ", "_")
    file = ContentFile(json.dumps(book, indent=2))
    book_model = Book.objects.create()
    book_model.bookfile.save(book_id+".json", file)
    book_model.save()

