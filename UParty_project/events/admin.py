from django.contrib import admin
from .models import Event

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    # Поля в списке
    list_display = ['id', 'event_name', 'event_status', 'event_time_begin', 'event_price', 'event_creator']
    
    # Фильтры справа
    list_filter = ['event_status', 'event_available', 'mood_tags']
    
    # Поиск
    search_fields = ['event_name', 'event_text']
    
    # Удобный выбор тегов (ОЧЕНЬ ВАЖНО ДЛЯ ТЕСТИРОВАНИЯ!)
    filter_horizontal = ['mood_tags']
    
    # Группировка полей в форме
    fieldsets = (
        ('Основное', {
            'fields': ('event_name', 'event_text', 'mood_tags')
        }),
        ('Время и цена', {
            'fields': ('event_time_begin', 'event_time_end', 'event_price')
        }),
        ('Детали', {
            'fields': ('event_max_participants', 'event_remaining_seats', 'event_url')
        }),
        ('Статус', {
            'fields': ('event_status', 'event_available')
        }),
    )