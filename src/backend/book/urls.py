from django.urls import path, include
from book.views import GetGenerateBook, BookList

urlpatterns = [
    path('generate/', GetGenerateBook.as_view(), name="generate-book"),
    path('', BookList.as_view(), name="book-list")

]
