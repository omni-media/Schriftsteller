from rest_framework.routers import DefaultRouter
from django.urls import path, include
from views import GenreListView

urlpatterns = [
    path('', GenreListView.as_view(), name="genreList"),
]
