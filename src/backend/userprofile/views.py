from rest_framework.generics import CreateAPIView, RetrieveUpdateAPIView
from rest_framework.permissions import IsAuthenticated

from userprofile.serializers import UserRegisterSerializer


# Create your views here.


class UserRegisterView(CreateAPIView):
    serializer_class = UserRegisterSerializer


class UserDetailView(RetrieveUpdateAPIView):
    serializer_class = UserRegisterSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        user = self.request.user
        return user
