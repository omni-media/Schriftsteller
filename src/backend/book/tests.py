from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from django.contrib.auth.models import User
from backend.test_functions import *


class BookTest(APITestCase):
    def setUp(self):
        self.user = setup_jwt_auth(self.client)

    def test_auth_decline(self):
        url = reverse('generate-book')

        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)







