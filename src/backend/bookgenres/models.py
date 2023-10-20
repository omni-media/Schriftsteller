from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class Genre(models.Model):
    name = models.CharField(max_length=30)
    users = models.ManyToManyField(User, blank=True, related_name="user_genres")
    image = models.URLField(max_length=300,default="https://en.wikipedia.org/wiki/Genre#/media/File"
                                                   ":Books_and_Scroll_Ornament_with_Open_Book.png")

    def __str__(self):
        return "Genre(" + str(self.id) + "): " + self.name
