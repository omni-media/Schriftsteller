from rest_framework.routers import DefaultRouter
from django.urls import path, include
from bookgenres.views import GenreListView, AddUserGenreView

urlpatterns = [
    path('', GenreListView.as_view(), name="genre-list"),
    path('add/', AddUserGenreView.as_view(), name="add-user-genre"),
]
