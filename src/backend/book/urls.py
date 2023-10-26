
from django.urls import path, include
from book.views import GetGenerateBook



urlpatterns = [
    path('', GetGenerateBook.as_view(), name="generate-book"),

]
