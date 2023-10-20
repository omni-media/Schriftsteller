from rest_framework.routers import DefaultRouter
from django.urls import path, include
from bookgenres.views import GenreListView, AddUserGenreView, RemoveUserGenreView

urlpatterns = [
    path('', GenreListView.as_view(), name="genre-list"),
    path('add/', AddUserGenreView.as_view(), name="add-user-genre"),
    path('remove/', RemoveUserGenreView.as_view(), name="remove-user-genre")
]
