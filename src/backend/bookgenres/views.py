from django.shortcuts import render
from bookgenres.models import Genre
from bookgenres.serializers import GenreSerializer
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated


class GenreListView(ListAPIView):
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer
