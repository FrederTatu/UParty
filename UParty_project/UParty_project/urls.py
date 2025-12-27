from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from moods.views import category_theatre
from moods.views import events
from moods.views import home
from moods.views import index
from moods.views import profile
# Здесь мы импортируем функцию определения рендера страницы по переходу пользователя по ссылке из файла views.py, чтобы применить ее здесь

urlpatterns = [
    path('admin/', admin.site.urls),
    # Здесь мы соответственно указываем путь, по которому будет направлен пользователь. '' - стандартное определение главной (основной) страницы. Файл index.html указан в этой функции в файле views.py
    # path('', include('persacc.urls')),
    # path('events/',include('events.urls')),
    path('category/', category_theatre, name='category'),
    path('events/', events, name='events'),
    path('home/', home, name='home'),
    path('', index, name='index'),
    path('profile/', profile, name='profile')
]

if settings.DEBUG:
    # urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT),
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)