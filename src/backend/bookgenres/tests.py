import json

from rest_framework.test import APITestCase
from rest_framework import status
from bookgenres.models import Genre
from django.urls import reverse
from django.contrib.auth.models import User


def create_user():
    user = User.objects.create_user("login", "login@email.com", "password")
    user.save()
    return user


def get_tokens(client, user):
    url = reverse('token_obtain_pair')
    response = client.post(url, {'username': user.username, 'password': 'password'}, format='json')
    return response.data


def setup_jwt_auth(client):
    user = create_user()
    tokens = get_tokens(client, user)
    client.credentials(HTTP_AUTHORIZATION='Bearer ' + tokens['access'])
    return user

# Create your tests here.
class GenreTest(APITestCase):
    def setUp(self):
        self.user = setup_jwt_auth(self.client)
        self.names = ['scifi', 'fantasy', 'punk']
        for name in self.names:
            genre_obj = Genre.objects.create()
            genre_obj.name = name
            genre_obj.save()

    def test_get_genre_list(self):

        url = reverse('genre-list')

        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(3, len(response.data))
        for name, genre in zip(self.names, response.data):
            self.assertEqual(name, genre['name'])

    def test_add_user_genre(self):
        genres = Genre.objects.all()
        genres_pk = [genre.pk for genre in genres]

        url = reverse('add-user-genre')
        response = self.client.post(url, data=genres_pk, format='json')
        self.assertEqual(response.status_code,status.HTTP_201_CREATED)
        self.assertEqual(len(self.user.user_genres.filter()),3)
