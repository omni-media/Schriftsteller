from bookgenres.models import Genre
from rest_framework import serializers
from django.contrib.auth.models import User


class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ['pk', 'name', 'image']
