"""
URL configuration for UParty_project project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
# Здесь мы импортируем функцию определения рендера страницы по переходу пользователя по ссылке из файла views.py, чтобы применить ее здесь
from main_app.views import main_page

urlpatterns = [
    path('admin/', admin.site.urls),
    # Здесь мы соответственно указываем путь, по которому будет направлен пользователь. '' - стандартное определение главной (основной) страницы. Файл index.html указан в этой функции в файле views.py
    path('', main_page)
]
