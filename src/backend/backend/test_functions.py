from django.contrib.auth.models import User
from django.urls import reverse


def create_user():
    user = User.objects.create_user("login", "login@email.com", "password")
    user.save()
    return user

def create_superuser():
    user = User.objects.create_superuser("login", "login@email.com", "password")
    user.save()
    return user


def get_tokens(client, user):
    url = reverse('token_obtain_pair')
    response = client.post(url, {'username': user.username, 'password': 'password'}, format='json')
    return response.data


def setup_jwt_auth(client,superuser=False):
    if superuser:
        user = create_superuser()
    else:
         user = create_user()
    tokens = get_tokens(client, user)
    client.credentials(HTTP_AUTHORIZATION='Bearer ' + tokens['access'])
    return user
