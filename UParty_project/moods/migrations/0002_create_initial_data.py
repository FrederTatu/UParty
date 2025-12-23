from django.db import migrations
from django.utils import timezone
from django.contrib.auth.hashers import make_password
import datetime


def create_initial_data(apps, schema_editor):
    """
    Создаёт начальные данные для проекта UParty.
    Используем РЕАЛЬНЫЕ имена полей из модели MoodTag!
    """
    
    print("\n" + "="*70)
    print("СОЗДАНИЕ НАЧАЛЬНЫХ ДАННЫХ ДЛЯ UPARTY")
    print("="*70)
    
    # ============== 1. СОЗДАЁМ 8 ТЕГОВ НАСТРОЕНИЯ ==============
    print("\n🔖 СОЗДАНИЕ 8 ТЕГОВ НАСТРОЕНИЯ:")
    print("Используем РЕАЛЬНЫЕ имена полей из модели!")
    print("-" * 40)
    
    MoodTag = apps.get_model('moods', 'MoodTag')
    now = timezone.now()
    
    # 8 тегов настроения из ТЗ
    # Используем РЕАЛЬНОЕ имя поля 'name', а не 'moodtag_name'!
    tags = [
        "Активный отдых",
        "Спокойный вечер", 
        "Романтика",
        "С друзьями",
        "Творчество",
        "Развлечения",
        "Гастрономия",
        "Музыка"
    ]
    
    for i, tag_name in enumerate(tags, 1):
        # Используем 'name' вместо 'moodtag_name'!
        if not MoodTag.objects.filter(name=tag_name).exists():
            # Создаём тег с реальными именами полей
            tag = MoodTag.objects.create(
                name=tag_name,          # ← РЕАЛЬНОЕ имя поля!
                created_at=now,         # ← РЕАЛЬНОЕ имя поля!
                updated_at=now,         # ← РЕАЛЬНОЕ имя поля!
                # Если есть другие поля, добавь их здесь
            )
            print(f"✅ Тег {i}/8: {tag.name} (ID: {tag.id})")
            print(f"   • created_at: {tag.created_at}")
            print(f"   • updated_at: {tag.updated_at}")
        else:
            tag = MoodTag.objects.get(name=tag_name)
            print(f"ℹ️ Тег уже существует: {tag.name} (ID: {tag.id})")
    
    # ============== 2. СОЗДАЁМ 4 МЕРОПРИЯТИЯ ==============
    print("\n🎉 СОЗДАНИЕ 4 НАЧАЛЬНЫХ МЕРОПРИЯТИЙ:")
    print("-" * 40)
    
    Event = apps.get_model('events', 'Event')
    User = apps.get_model('auth', 'User')
    
    # Создаём организатора
    organizer, created = User.objects.get_or_create(
        username='uparty-organizer',
        defaults={
            'email': 'organizer@uparty.ru',
            'password': make_password('organizer123'),
            'is_staff': False,
            'is_superuser': False,
        }
    )
    
    # 4 мероприятия с полным заполнением всех полей
    events_data = [
        {
            'event_name': 'Шоппинг в ТЦ "Кольцо"',
            'event_text': 'Большой торговый центр "Кольцо" в Казани. Шоппинг, кино, рестораны.',
            'event_time_begin': timezone.make_aware(datetime.datetime(2025, 12, 25, 10, 0, 0)),
            'event_time_end': timezone.make_aware(datetime.datetime(2025, 12, 25, 22, 0, 0)),
            'event_price': 0.00,
            'event_available': True,
            'event_url': 'https://yandex.ru/maps/org/tk_koltso/1782233387/',
            'event_max_participants': '1000',
            'event_status': 'active',
            'event_remaining_seats': 850,
            'event_creator_id': organizer.id,
        },
        {
            'event_name': 'Концерт группы BEAR',
            'event_text': 'Группа BEAR в Казани! Живое выступление в клубе "Звезда".',
            'event_time_begin': timezone.make_aware(datetime.datetime(2025, 12, 26, 19, 0, 0)),
            'event_time_end': timezone.make_aware(datetime.datetime(2025, 12, 26, 23, 0, 0)),
            'event_price': 1500.00,
            'event_available': True,
            'event_url': 'https://yandex.ru/maps/org/club_zvezda/1096058226/',
            'event_max_participants': '500',
            'event_status': 'active',
            'event_remaining_seats': 127,
            'event_creator_id': organizer.id,
        },
        {
            'event_name': 'Футбол: "Рубин" vs "Зенит"',
            'event_text': 'Футбольный матч чемпионата России на "Ак Барс Арене".',
            'event_time_begin': timezone.make_aware(datetime.datetime(2025, 12, 27, 17, 0, 0)),
            'event_time_end': timezone.make_aware(datetime.datetime(2025, 12, 27, 19, 0, 0)),
            'event_price': 800.00,
            'event_available': True,
            'event_url': 'https://yandex.ru/maps/org/ak_bars_arena/1062461789/',
            'event_max_participants': '15000',
            'event_status': 'active',
            'event_remaining_seats': 4231,
            'event_creator_id': organizer.id,
        },
        {
            'event_name': 'Барбекю-вечеринка на набережной',
            'event_text': 'Барбекю-вечеринка на набережной Казанки с живой музыкой.',
            'event_time_begin': timezone.make_aware(datetime.datetime(2025, 12, 28, 15, 0, 0)),
            'event_time_end': timezone.make_aware(datetime.datetime(2025, 12, 28, 22, 0, 0)),
            'event_price': 2500.00,
            'event_available': True,
            'event_url': 'https://yandex.ru/maps/197/kazan/geo/naberezhnaya_reki_kazanki/1078584195/',
            'event_max_participants': '120',
            'event_status': 'active',
            'event_remaining_seats': 45,
            'event_creator_id': organizer.id,
        }
    ]
    
    for i, event_info in enumerate(events_data, 1):
        event = Event.objects.create(**event_info)
        print(f"\n{i}. МЕРОПРИЯТИЕ: {event.event_name}")
        print(f"   • Цена: {event.event_price} руб.")
        print(f"   • Мест: {event.event_remaining_seats}/{event.event_max_participants}")
    
    # ============== 3. ИТОГИ ==============
    print("\n" + "="*70)
    print("🎊 НАЧАЛЬНЫЕ ДАННЫЕ УСПЕШНО СОЗДАНЫ!")
    print("="*70)
    print(f"📊 СТАТИСТИКА:")
    print(f"   • Тегов создано: {MoodTag.objects.count()}/8")
    print(f"   • Мероприятий создано: {Event.objects.count()}/4")
    print("="*70 + "\n")


def reverse_initial_data(apps, schema_editor):
    """
    Удаляет начальные данные при откате миграции.
    """
    MoodTag = apps.get_model('moods', 'MoodTag')
    Event = apps.get_model('events', 'Event')
    User = apps.get_model('auth', 'User')
    
    print("\n🗑️ УДАЛЕНИЕ НАЧАЛЬНЫХ ДАННЫХ...")
    
    # Удаляем мероприятия
    deleted_events = Event.objects.filter(
        event_name__in=[
            'Шоппинг в ТЦ "Кольцо"',
            'Концерт группы BEAR',
            'Футбол: "Рубин" vs "Зенит"',
            'Барбекю-вечеринка на набережной'
        ]
    ).delete()
    print(f"   ✅ Удалено мероприятий: {deleted_events[0]}")
    
    # Удаляем теги по РЕАЛЬНОМУ имени поля 'name'
    deleted_tags = MoodTag.objects.filter(
        name__in=[  # ← Используем 'name' вместо 'moodtag_name'!
            'Активный отдых',
            'Спокойный вечер', 
            'Романтика',
            'С друзьями',
            'Творчество',
            'Развлечения',
            'Гастрономия',
            'Музыка'
        ]
    ).delete()
    print(f"   ✅ Удалено тегов: {deleted_tags[0]}")
    
    # Удаляем организатора
    User.objects.filter(username='uparty-organizer').delete()
    print(f"   ✅ Удалён организатор")


class Migration(migrations.Migration):
    dependencies = [
        ('moods', '0001_initial'),
        ('events', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(create_initial_data, reverse_initial_data),
    ]