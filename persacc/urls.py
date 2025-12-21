from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.register, name='register'),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('verify-2fa/', views.verify_2fa, name='verify_2fa'),
    path('resend-2fa-code/', views.resend_2fa_code, name='resend_2fa_code'),
    path('profile/', views.profile, name='profile'),
    path('profile/edit/', views.edit_profile, name='edit_profile'),
    path('profile/security/', views.account_security, name='account_security'),
    path('profile/verify-email-change/', views.verify_email_change, name='verify_email_change'),
    path('profile/resend-email-code/', views.resend_email_change_code, name='resend_email_change_code'),
    path('profile/privacy/', views.privacy_settings, name='privacy_settings'),
    path('user/<str:username>/', views.public_profile, name='public_profile'),
]
