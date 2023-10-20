from bookgenres.models import Genre
from bookgenres.serializers import GenreSerializer
from rest_framework.generics import ListAPIView
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework import status


class GenreListView(ListAPIView):
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer

    def get_queryset(self):
        if self.request.GET.get("user"):
            id = self.request.GET.get("user")
            return User.objects.get(pk=id).user_genres
        return super().get_queryset()


class AddUserGenreView(APIView):
    permission_classes = [IsAuthenticated]

    def operation(self, user, pk):
        user.user_genres.add(Genre.objects.get(pk=pk))

    def post(self, request, format=None):
        user = request.user
        try:
            data = request.data
            for pk in data:
                self.operation(user, pk)
            user.save()
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        return Response(status=status.HTTP_200_OK)


class RemoveUserGenreView(AddUserGenreView):
    permission_classes = [IsAuthenticated]

    def operation(self, user, pk):
        user.user_genres.remove(pk)

