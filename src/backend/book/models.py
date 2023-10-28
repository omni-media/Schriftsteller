from django.db import models


# Create your models here.
class BookModel(models.Model):
    filePath = models.FileField(max_length=300,default='/book')

    def __str__(self):
        return "Book(" + str(self.pk) + ")"
