from django.shortcuts import render
from models import Genre
from bookgenres.serializers import GenreSerializer
from rest_framework.generics import ListAPIView


class GenreListView(ListAPIView):
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer
