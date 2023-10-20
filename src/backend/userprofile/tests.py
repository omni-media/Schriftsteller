import json

from django.test import TestCase

# Create your tests here.
from rest_framework.test import APITestCase
from rest_framework import status
from bookgenres.models import Genre
from django.urls import reverse
from django.contrib.auth.models import User
from backend.test_functions import *


class UserTest(APITestCase):
    def test_registration(self):
        user_dict = {
            "username": "login",
            "password": "password"
        }
        url = reverse("register")
        response = self.client.post(url, data=user_dict, format='json')
        self.assertEqual(response.status_code,status.HTTP_400_BAD_REQUEST)

        user_dict['password'] = "GoOd_passWord_Asci12_#$A"
        response = self.client.post(url, data=user_dict, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(User.objects.all()),1)

