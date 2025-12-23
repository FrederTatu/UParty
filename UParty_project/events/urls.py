from django.urls import path
from . import views

app_name = 'app'

urlpatterns = [
    path('adddb/', views.adddb, name='adddb'),
    path('', views.main, name='main'),
    path('eventscatalog/', views.eventscatalog, name="eventscatalog")
]