from django.shortcuts import render

# Create your views here.

# Здесь расположены все функции для HTTP-обработок отправления пользователя на страницы сайта

def category_theatre(request):
    return render(request, 'category(theatre).html')

def events(request):
    return render(request, 'events.html')

def home(request):
    return render(request, 'home.html')

def index(request):
    return render(request, 'index.html')

def profile(request):
    return render(request, 'profile.html')