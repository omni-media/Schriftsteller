from django.conf import settings
import os

import book.models
from book.models import Book
from django.core.files.storage import default_storage

def get_cache_dir_path():
    return os.path.join(settings.BASE_DIR, 'hf_cache/')


def save_unaccounted_books():
    upload_to = Book._meta.get_field('bookfile').upload_to
    path = default_storage.path(upload_to)
    book_list = Book.objects.all()
    for file_name in os.listdir(path):
        try:
            book_list.get(bookfile=upload_to + file_name)
        except book.models.Book.DoesNotExist:
            Book.objects.create(bookfile=upload_to + file_name).save()
        except book.models.Book.MultipleObjectsReturned:
            pass