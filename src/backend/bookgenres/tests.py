from rest_framework.test import APITestCase
from rest_framework import status
from bookgenres.models import Genre
from django.urls import reverse


# Create your tests here.
class GenreListTest(APITestCase):
    def test_get_genre_list(self):
        names = ['scifi', 'fantasy', 'punk']
        for name in names:
            genre_obj = Genre.objects.create()
            genre_obj.name = name
            genre_obj.save()
        url = reverse('genre-list')

        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(3, len(response.data))
        for name, genre in zip(names, response.data):
            self.assertEqual(name, genre['name'])
