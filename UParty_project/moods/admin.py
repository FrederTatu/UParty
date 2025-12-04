from django.contrib import admin

# Register your models here.

from .models import MoodTag  # Импортируем нашу модель

@admin.register(MoodTag)
class MoodTagAdmin(admin.ModelAdmin):
    """
    Настройки отображения модели MoodTag в админ-панели Django.
    
    Админ-панель — это встроенный в Django интерфейс для управления данными.
    Здесь мы настраиваем, как модель будет отображаться в этом интерфейсе.
    """
    
    # Поля, которые отображаются в списке объектов
    list_display = [
        'emoji',        # Эмодзи (первая колонка для наглядности)
        'name',         # Название тега
        'code',         # Код тега
        'color',        # Цвет (покажем как текст)
        'is_active',    # Статус активности
        'sort_order',   # Порядок сортировки
        'created_at',   # Дата создания
    ]
    
    # Поля, по которым можно фильтровать список
    list_filter = [
        'is_active',    # Фильтр по активности
        'created_at',   # Фильтр по дате создания
    ]
    
    # Поля, по которым можно искать
    search_fields = [
        'name',         # Поиск по названию
        'code',         # Поиск по коду
        'description',  # Поиск по описанию
    ]
    
    # Поля, которые можно редактировать прямо из списка (без перехода в форму)
    list_editable = [
        'is_active',    # Менять активность прямо в списке
        'sort_order',   # Менять порядок сортировки
    ]
    
    # Порядок сортировки по умолчанию в админке
    ordering = ['sort_order', 'name']
    
    # Настройки формы редактирования/создания
    fieldsets = (
        # Первая группа полей: Основная информация
        ('Основная информация', {
            'fields': ('name', 'code', 'description', 'emoji'),
            'description': 'Основные данные о теге настроения'
        }),
        
        # Вторая группа полей: Внешний вид
        ('Внешний вид', {
            'fields': ('color',),
            'description': 'Настройки отображения тега на сайте'
        }),
        
        # Третья группа полей: Порядок и активность
        ('Порядок и активность', {
            'fields': ('sort_order', 'is_active'),
            'description': 'Управление порядком отображения и активностью тега'
        }),
        
        # Четвертая группа полей: Системная информация (только для чтения)
        ('Системная информация', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',),  # Свернуть блок по умолчанию
            'description': 'Эти поля заполняются автоматически'
        }),
    )
    
    # Поля только для чтения (нельзя редактировать)
    readonly_fields = ('created_at', 'updated_at')
    
    # Действия, доступные в админке
    actions = ['activate_tags', 'deactivate_tags']
    
    # Кастомные действия для админки
    def activate_tags(self, request, queryset):
        """
        Массовая активация выбранных тегов.
        """
        updated = queryset.update(is_active=True)
        self.message_user(request, f"Активировано {updated} тегов.")
    
    activate_tags.short_description = "Активировать выбранные теги"
    
    def deactivate_tags(self, request, queryset):
        """
        Массовая деактивация выбранных тегов.
        """
        updated = queryset.update(is_active=False)
        self.message_user(request, f"Деактивировано {updated} тегов.")
    
    deactivate_tags.short_description = "Деактивировать выбранные теги"