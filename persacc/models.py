from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
import uuid


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')

    phone = models.CharField(max_length=20, blank=True)
    avatar = models.ImageField(upload_to='avatars/', blank=True, null=True)
    date_of_birth = models.DateField(blank=True, null=True)
    gender = models.CharField(
        max_length=10,
        choices=[
   ('male', 'Мужской'),
              ('female', 'Женский'),
              ('none', 'Не указывать')
        ],
        default='none'
    )

    profile_visibility = models.CharField(
            max_length=20,
            choices=[
                ('public', 'Все'),
                ('friends', 'Только друзья'),
                ('private', 'Никто'),
            ],
            default='public',
            verbose_name="Кто видит профиль"
        )

    show_events = models.BooleanField(
            default=True,
            verbose_name="Показывать участие в мероприятиях"
        )

    show_reviews = models.BooleanField(
            default=True,
            verbose_name="Показывать отзывы"
        )

    reviews_visibility = models.CharField(
            max_length=20,
            choices=[
                ('public', 'Все'),
                ('friends', 'Только друзья'),
                ('private', 'Никто'),
            ],
            default='public',
            verbose_name="Видимость отзывов"
        )


    def __str__(self):
        return self.user.username
