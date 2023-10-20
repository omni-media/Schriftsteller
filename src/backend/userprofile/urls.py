from django.urls import path, include
from userprofile.views import UserRegisterView, UserDetailView

urlpatterns = [
    path('', UserDetailView.as_view(), name="user-detail"),
    path('register/', UserRegisterView.as_view(), name="register"),
]
