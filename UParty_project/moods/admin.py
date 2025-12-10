from django.contrib import admin
from .models import MoodTag  # Импортируем нашу модель

@admin.register(MoodTag)
class MoodTagAdmin(admin.ModelAdmin):
    """
    Настройки отображения модели MoodTag в админ-панели Django.
    
    Теперь отображаем только 4 поля, которые есть в БД.
    """
    
    # Поля, которые отображаются в списке объектов
    list_display = [
        'id',           # ID тега (moodtag_id)
        'name',         # Название тега (moodtag_name)
        'created_at',   # Дата создания (moodtag_created)
        'updated_at',   # Дата обновления (moodtag_updated)
    ]
    
    # Поля, по которым можно фильтровать список
    list_filter = [
        'created_at',   # Фильтр по дате создания
    ]
    
    # Поля, по которым можно искать
    search_fields = [
        'name',         # Поиск только по названию
    ]
    
    # Порядок сортировки по умолчанию в админке
    ordering = ['name']  # Сортировка по названию
    
    # Настройки формы редактирования/создания
    fieldsets = (
        # Единственная группа полей: Основная информация
        ('Основная информация', {
            'fields': ('name',),  # Только поле name можно редактировать
            'description': 'Название тега настроения'
        }),
        
        # Группа полей: Системная информация (только для чтения)
        ('Системная информация', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',),  # Свернуть блок по умолчанию
            'description': 'Эти поля заполняются автоматически и не редактируются'
        }),
    )
    
    # Поля только для чтения (нельзя редактировать)
    readonly_fields = ('created_at', 'updated_at', 'id')
    
    # УДАЛЕНЫ кастомные действия activate_tags и deactivate_tags
    # так как нет поля is_active для массового управления