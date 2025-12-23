"""
Конфигурация приложения persacc (персональный аккаунт).
Этот файл настраивает приложение и создаёт стандартного суперпользователя
при первом запуске миграций.
"""

from django.apps import AppConfig
from django.db.models.signals import post_migrate
from django.contrib.auth import get_user_model
import sys


def create_default_superuser(sender, **kwargs):
    """
    Функция-обработчик сигнала post_migrate.
    Создаёт стандартного суперпользователя для всех разработчиков проекта.
    
    Аргументы:
    - sender: Приложение, которое инициировало сигнал
    - kwargs: Дополнительные аргументы сигнала
    
    Логика:
    1. Получаем модель User (стандартную или кастомную)
    2. Проверяем, не существует ли уже пользователь 'django-admin'
    3. Если нет - создаём с предопределёнными данными
    4. Логируем результат в консоль
    """
    
    # Получаем модель User - Django сам определит, стандартная она или кастомная
    # Это важно, потому что в проекте может быть переопределённая модель User
    User = get_user_model()
    
    # Имя пользователя, которое будет использоваться для всех разработчиков
    DEFAULT_USERNAME = 'Admin'
    DEFAULT_EMAIL = 'Admin@gmail.com'
    DEFAULT_PASSWORD = '12345678'
    
    # Проверяем существование пользователя
    # Используем exists() для эффективности - не загружаем весь объект
    if not User.objects.filter(username=DEFAULT_USERNAME).exists():
        try:
            # Создаём суперпользователя с помощью встроенного метода Django
            # create_superuser автоматически устанавливает:
            # - is_staff=True (доступ к админке)
            # - is_superuser=True (все права)
            # - is_active=True (активный аккаунт)
            # - хеширует пароль
            user = User.objects.create_superuser(
                username=DEFAULT_USERNAME,
                email=DEFAULT_EMAIL,
                password=DEFAULT_PASSWORD
            )
            
            # Дополнительные поля, если нужно (для кастомной модели)
            # user.first_name = "Django"
            # user.last_name = "Admin"
            # user.save()
            
            # Логируем только при выполнении команды migrate
            # Это предотвращает лишние сообщения при других командах
            if 'migrate' in sys.argv:
                print("\n" + "="*60)
                print("✅ СУПЕРПОЛЬЗОВАТЕЛЬ СОЗДАН ДЛЯ ВСЕХ РАЗРАБОТЧИКОВ")
                print("="*60)
                print(f"👤 Логин: {DEFAULT_USERNAME}")
                print(f"📧 Email: {DEFAULT_EMAIL}")
                print(f"🔑 Пароль: {DEFAULT_PASSWORD}")
                print(f"🆔 ID пользователя: {user.id}")
                print("="*60)
                print("💡 Доступ к админке: http://localhost:8000/admin/")
                print("="*60 + "\n")
                
        except Exception as e:
            # Ловим возможные ошибки (например, проблемы с БД)
            # и логируем их, но не падаем
            if 'migrate' in sys.argv:
                print(f"⚠️ Ошибка при создании суперпользователя: {e}")
    else:
        # Если пользователь уже существует - тихий выход
        # Можно добавить логирование при необходимости:
        # if 'migrate' in sys.argv:
        #     print(f"ℹ️ Суперпользователь '{DEFAULT_USERNAME}' уже существует")
        pass


class PersaccConfig(AppConfig):
    """
    Конфигурационный класс приложения persacc.
    Наследуется от AppConfig Django.
    """
    
    # Тип поля для автоматического создания первичных ключей
    # BigAutoField = большое автоинкрементное число (64-bit)
    default_auto_field = 'django.db.models.BigAutoField'
    
    # Имя приложения - должно совпадать с именем в INSTALLED_APPS
    name = 'persacc'
    
    # Человекочитаемое имя приложения (отображается в админке)
    verbose_name = "Управление пользователями"
    
    def ready(self):
        """
        Метод ready() вызывается Django при полной загрузке приложения.
        Здесь регистрируем сигналы и выполняем инициализацию.
        
        Важно: код в ready() выполняется при КАЖДОМ перезапуске сервера,
        но сигнал post_migrate сработает только при миграциях.
        """
        
        # Импортируем здесь, чтобы избежать циклических импортов
        # и проблем с загрузкой приложения
        
        # Подключаем нашу функцию к сигналу post_migrate
        # post_migrate срабатывает после УСПЕШНОГО завершения ВСЕХ миграций
        # sender=self означает, что сигнал привязан к этому конкретному приложению
        
        post_migrate.connect(create_default_superuser, sender=self)
        
        # Примечание: можно подключить несколько функций к одному сигналу
        # Например, для создания разных типов начальных данных
        
        # Дополнительная инициализация приложения может быть здесь
        # Например, регистрация кастомных тегов шаблонов, сигналов и т.д.