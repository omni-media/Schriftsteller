from django.db import models


# Create your models here.
class Book(models.Model):
    bookfile = models.FileField(blank=True, upload_to="books/")

    def __str__(self):
        return "Book(" + str(self.pk) + ")"
