from book.models import Book
from rest_framework import serializers


class BookSerializer(serializers.ModelSerializer):
    bookfile = serializers.FileField(use_url=True, required=False)

    class Meta:
        model = Book
        fields = ['pk', 'bookfile']
