from django.shortcuts import render

# Create your views here.

# Базовая функция для обработки клика по ссылке и перехода на главную страницу (отсюда request летит в urls.py, где указывается ссылка, по которой направляется пользователь в файл index.html)
def main_page(request):
    return render(request, 'index.html')