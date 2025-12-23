from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
# Здесь мы импортируем функцию определения рендера страницы по переходу пользователя по ссылке из файла views.py, чтобы применить ее здесь

urlpatterns = [
    path('admin/', admin.site.urls),
    # Здесь мы соответственно указываем путь, по которому будет направлен пользователь. '' - стандартное определение главной (основной) страницы. Файл index.html указан в этой функции в файле views.py
    path('', include('persacc.urls')),
    path('events/',include('events.urls'))
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)