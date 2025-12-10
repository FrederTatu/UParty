from django.db import models
from django.utils.translation import gettext_lazy as _

class MoodTag(models.Model):
    """
    Модель тега настроения.
    Таблица moods_modtag существует, но ПУСТАЯ.
    """
    
    name = models.CharField(
        max_length=50,
        verbose_name=_("Название тега"),
        help_text=_("Человеко-читаемое название тега настроения"),
        db_column='moodtag_name'  # Используем имя столбца из БД
    )
    
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name=_("Дата создания"),
        editable=False,
        db_column='moodtag_created'
    )
    
    # Дата и время последнего обновления записи
    # auto_now=True - автоматически обновляется при каждом сохранении
    # editable=False - нельзя редактировать вручную
    updated_at = models.DateTimeField(
        auto_now=True,
        verbose_name=_("Дата обновления"),
        editable=False,
        db_column='moodtag_updated'
    )
    
    # Метаданные модели (настройки для Django)
    class Meta:
        """
        НЕТ managed = False! Потому что:
        1. Таблица пустая - нечего терять
        2. Хотим, чтобы Django управлял структурой
        3. Удобно для будущих изменений
        """
        db_table = 'moods_moodtag'  # Указываем имя существующей таблицы
        verbose_name = _("Тег настроения")
        
        # Человеко-читаемое имя модели во множественном числе
        verbose_name_plural = _("Теги настроения")
        ordering = ["name"]
    
    def __str__(self):
        """
        Возвращает строковое представление объекта.
        Используется в админке Django, shell, отладочных сообщениях.
        """
        return self.name