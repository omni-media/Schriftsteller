from django.shortcuts import render
from book.scripts.make_book import make_book
# Create your views here.
from rest_framework.views import APIView

from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework import status


class GetGenerateBook(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]

    def get(self, request, format=None):
        book = None
        try:
            arguments = request.query_params
            book = make_book(**arguments)
        except Exception as e:
            print(e)
            return Response(status=status.HTTP_400_BAD_REQUEST)
        return Response(data=book, status=status.HTTP_200_OK)
