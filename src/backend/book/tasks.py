import random

from book.scripts.make_book import make_book
from book.scripts.make_image import make_image
from celery import shared_task
from django.core.files.storage import default_storage
from book.models import *
import json
import time
from django.core.files.base import ContentFile
from django.core.files.images import ImageFile
import io


def generate_book(*args, **kwargs):
    book = make_book()
    book_id = book['title'] + str(time.time()).split(".")[0]
    book_id = book_id.replace(" ", "_")
    generate_images_for_book(book)
    file = ContentFile(json.dumps(book, indent=2))
    book_model = Book.objects.create()
    book_model.bookfile.save(book_id + ".json", file)
    book_model.save()


def save_image(image_obj, name):
    imageFile = ImageFile(io.BytesIO(image_obj.tobytes()), name=name)
    return "media/" + default_storage.save('images/' + name + ".webp", imageFile)


def generate_images_for_book(book_obj):
    title_img = make_image(book_obj['title'])
    book_obj['book_cover_img'] = save_image(title_img, "cover_image")

    for chapter in book_obj['chapters']:
        chapter_img = make_image(chapter['content'][0:20])
        chapter['chapter_img'] = save_image(chapter_img, 'chapter_image')


@shared_task()
def generate_daily_books(*args, **kwargs):
    for i in range(3):
        generate_book()
