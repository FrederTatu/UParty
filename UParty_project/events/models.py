from django.db import models
from django.contrib.auth.models import User

class Event(models.Model):
    """
    Модель мероприятия (Event).
    Django создаст таблицу events при миграции.
    """
    
    # Основные поля мероприятия
    event_name = models.CharField(
        max_length=200,
        blank=True,
        null=True,
        verbose_name="Название мероприятия"
    )
    
    event_text = models.TextField(
        blank=True,
        verbose_name="Описание мероприятия"
    )
    
    event_time_begin = models.DateTimeField(
        verbose_name="Дата и время начала"
    )
    
    event_time_end = models.DateTimeField(
        verbose_name="Дата и время окончания"
    )
    
    event_price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        verbose_name="Цена билета"
    )
    
    event_available = models.BooleanField(
        default=True,
        verbose_name="Доступно для бронирования"
    )
    
    event_url = models.URLField(
        max_length=500,
        blank=True,
        null=True,
        verbose_name="Ссылка на карту/сайт"
    )
    
    event_max_participants = models.CharField(
        max_length=10,
        verbose_name="Максимальное количество участников"
    )
    
    event_creator = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        verbose_name="Создатель мероприятия"
    )
    
    # Выбор статуса мероприятия
    EVENT_STATUS_CHOICES = [
        ('active', 'Активно'),
        ('cancelled', 'Отменено'),
        ('completed', 'Завершено'),
    ]
    
    event_status = models.CharField(
        max_length=20,
        choices=EVENT_STATUS_CHOICES,
        default='active',
        verbose_name="Статус мероприятия"
    )
    
    event_remaining_seats = models.IntegerField(
        default=0,
        verbose_name="Оставшиеся места"
    )
    
    # СВЯЗЬ С ТЕГАМИ НАСТРОЕНИЯ
    mood_tags = models.ManyToManyField(
        'moods.MoodTag',
        related_name='events',
        blank=True,
        verbose_name="Теги настроения",
        help_text="Выберите один или несколько тегов настроения"
    )
    
    class Meta:
        db_table = 'events'
        managed = True  # Django создаст и будет управлять таблицей
        verbose_name = "Мероприятие"
        verbose_name_plural = "Мероприятия"
        ordering = ['-event_time_begin', 'event_name']
    
    def __str__(self):
        if self.event_name:
            return f"{self.event_name} ({self.event_time_begin})"
        return f"Мероприятие #{self.id}"
    
    def is_available(self):
        """Проверка доступности мероприятия для бронирования."""
        return (
            self.event_available and
            self.event_status == 'active' and
            self.event_remaining_seats > 0
        )