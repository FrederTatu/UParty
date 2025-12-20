from django.contrib import admin
from django.urls import path, include
# Здесь мы импортируем функцию определения рендера страницы по переходу пользователя по ссылке из файла views.py, чтобы применить ее здесь

urlpatterns = [
    path('admin/', admin.site.urls),
    # Здесь мы соответственно указываем путь, по которому будет направлен пользователь. '' - стандартное определение главной (основной) страницы. Файл index.html указан в этой функции в файле views.py
    path('events/',include('events.urls'))
]
