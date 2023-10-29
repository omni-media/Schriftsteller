from django.db import models


# Create your models here.
class Book(models.Model):
    filepath = models.FileField(max_length=300, default='/book')

    def __str__(self):
        return "Book(" + str(self.pk) + ")"
