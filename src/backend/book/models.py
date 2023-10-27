from django.db import models


# Create your models here.
class BookModel(models.Model):
    filePath = models.FilePathField(max_length=300)

    def __str__(self):
        return "Book(" + str(self.pk) + ")"
