from django.contrib.auth.models import User
from rest_framework import serializers
from django.contrib.auth.hashers import make_password
import django.contrib.auth.password_validation as validators
from django.core import exceptions


class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True,
        required=True,
    )
    pk = serializers.IntegerField(read_only=True)

    class Meta:
        model = User
        fields = ['pk','username', 'password']

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data.get('password'))
        return super(UserRegisterSerializer, self).create(validated_data)

    def update(self, instance, validated_data):
        if 'password' in validated_data:
            validated_data['password'] = make_password(validated_data.get('password'))
        return super(UserRegisterSerializer, self).update(instance, validated_data)

    def validate(self, data):
        user = User(**data)
        password = data.get('password')
        try:
            validators.validate_password(password=password, user=user)
        except exceptions.ValidationError as e:
            raise serializers.ValidationError({'password': list(e.messages)[0]})
        return super(UserRegisterSerializer, self).validate(data)
