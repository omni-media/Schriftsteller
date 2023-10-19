from rest_framework.routers import DefaultRouter
from django.urls import path, include
from bookgenres.views import GenreListView

urlpatterns = [
    path('', GenreListView.as_view(), name="genre-list"),
]
