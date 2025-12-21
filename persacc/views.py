from django.shortcuts import render, redirect
from django.contrib.auth import login, logout, authenticate, update_session_auth_hash
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.contrib import messages
from django.core.mail import send_mail
from django.conf import settings
from django.utils import timezone
import random
import string
from .models import Profile
from django.db.models.signals import post_save
from django.dispatch import receiver

@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)


def generate_verification_code():
    return ''.join(random.choices(string.digits, k=6))


def send_verification_email(email, code):
    subject = 'Код подтверждения для UParty'
    message = f'Ваш код подтверждения: {code}\n\nКод действителен в течение 10 минут.'
    from_email = settings.EMAIL_HOST_USER
    recipient_list = [email]

    try:
        send_mail(subject, message, from_email, recipient_list)
        return True
    except Exception as e:
        print(f"Ошибка отправки email: {e}")
        return False


def send_email_change_confirmation(old_email, new_email, code):
    subject = 'Подтверждение смены email на UParty'
    message = f'Вы запросили смену email с {old_email} на {new_email}.\n\nКод подтверждения: {code}\n\nЕсли это были не вы, проигнорируйте это письмо.'
    from_email = settings.EMAIL_HOST_USER
    recipient_list = [old_email]

    try:
        send_mail(subject, message, from_email, recipient_list)
        return True
    except Exception as e:
        print(f"Ошибка отправки email: {e}")
        return False


def register(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        email = request.POST.get('email')
        password1 = request.POST.get('password1')
        password2 = request.POST.get('password2')

        errors = []

        if User.objects.filter(username=username).exists():
            errors.append('Это имя уже занято')

        if User.objects.filter(email=email).exists():
            errors.append('Этот email уже используется')

        if password1 != password2:
            errors.append('Пароли не совпадают')

        if errors:
            for error in errors:
                messages.error(request, error)
        else:
            user = User.objects.create_user(
                username=username,
                email=email,
                password=password1
            )

            login(request, user)
            messages.success(request, 'Добро пожаловать!')
            return redirect('profile')

    return render(request, 'register.html')


def login_view(request):
    if request.method == 'POST':
        username_or_email = request.POST.get('username')
        password = request.POST.get('password')

        # Проверяем, включена ли 2FA
        two_factor_enabled = request.POST.get('two_factor', 'off') == 'on'

        if '@' in username_or_email:
            try:
                user_obj = User.objects.get(email=username_or_email)
                username = user_obj.username
            except User.DoesNotExist:
                username = None
        else:
            username = username_or_email

        user = authenticate(request, username=username, password=password)

        if user is not None:
            # Если включена 2FA
            if two_factor_enabled:
                # Генерируем код
                code = generate_verification_code()

                # Сохраняем в сессии
                request.session['2fa_user_id'] = user.id
                request.session['2fa_code'] = code
                request.session['2fa_expiry'] = (timezone.now() + timezone.timedelta(minutes=10)).isoformat()

                if send_verification_email(user.email, code):
                    messages.info(request, 'На ваш email отправлен код подтверждения')
                    return redirect('verify_2fa')
                else:
                    messages.error(request, 'Ошибка отправки кода. Попробуйте снова.')
                    return redirect('login')
            else:
                login(request, user)
                return redirect('profile')
        else:
            messages.error(request, 'Неверный логин/email или пароль')

    return render(request, 'login.html')


def verify_2fa(request):
    if request.method == 'POST':
        code = request.POST.get('code', '').strip()

        user_id = request.session.get('2fa_user_id')
        stored_code = request.session.get('2fa_code')
        expiry_str = request.session.get('2fa_expiry')

        if not all([user_id, stored_code, expiry_str]):
            messages.error(request, 'Сессия истекла. Пожалуйста, войдите снова.')
            return redirect('login')

        expiry = timezone.datetime.fromisoformat(expiry_str)
        if timezone.now() > expiry:
            messages.error(request, 'Код истек. Пожалуйста, войдите снова.')
            return redirect('login')

        if code == stored_code:
            try:
                user = User.objects.get(id=user_id)
                login(request, user)

                del request.session['2fa_user_id']
                del request.session['2fa_code']
                del request.session['2fa_expiry']

                messages.success(request, 'Двухфакторная аутентификация пройдена успешно!')
                return redirect('profile')
            except User.DoesNotExist:
                messages.error(request, 'Пользователь не найден')
                return redirect('login')
        else:
            messages.error(request, 'Неверный код подтверждения')

    return render(request, 'verify_2fa.html')


def resend_2fa_code(request):
    """Повторная отправка кода 2FA"""
    user_id = request.session.get('2fa_user_id')

    if user_id:
        try:
            user = User.objects.get(id=user_id)
            code = generate_verification_code()

            request.session['2fa_code'] = code
            request.session['2fa_expiry'] = (timezone.now() + timezone.timedelta(minutes=10)).isoformat()

            if send_verification_email(user.email, code):
                messages.success(request, 'Новый код отправлен на ваш email')
            else:
                messages.error(request, 'Ошибка отправки кода')
        except User.DoesNotExist:
            messages.error(request, 'Пользователь не найден')

    return redirect('verify_2fa')


def logout_view(request):
    logout(request)
    return redirect('login')


@login_required
def profile(request):
    return render(request, 'profile.html')


@login_required
def edit_profile(request):
    if request.method == 'POST':
        user = request.user
        profile = user.profile

        user.first_name = request.POST.get('first_name', '')
        user.last_name = request.POST.get('last_name', '')
        user.save()

        profile.phone = request.POST.get('phone', '')

        date_str = request.POST.get('date_of_birth')
        if date_str:
            profile.date_of_birth = date_str

        profile.gender = request.POST.get('gender', 'none')

        if 'avatar' in request.FILES:
            profile.avatar = request.FILES['avatar']

        if 'profile_visibility' in request.POST:
            profile.profile_visibility = request.POST.get('profile_visibility', 'public')

        profile.save()

        messages.success(request, 'Профиль обновлен')
        return redirect('profile')

    return render(request, 'edit_profile.html')


@login_required
def account_security(request):
    if request.method == 'POST':
        user = request.user

        operation = request.POST.get('operation')

        if operation == 'change_password':
            old_password = request.POST.get('old_password', '')
            new_password1 = request.POST.get('new_password1', '')
            new_password2 = request.POST.get('new_password2', '')

            if not user.check_password(old_password):
                messages.error(request, 'Неверный текущий пароль')
                return redirect('account_security')

            if new_password1 != new_password2:
                messages.error(request, 'Новые пароли не совпадают')
                return redirect('account_security')

            if len(new_password1) < 6:
                messages.error(request, 'Пароль должен содержать минимум 6 символов')
                return redirect('account_security')

            user.set_password(new_password1)
            user.save()
            update_session_auth_hash(request, user)
            messages.success(request, 'Пароль успешно изменен')
            return redirect('account_security')

        elif operation == 'change_email':
            new_email = request.POST.get('new_email', '').strip()
            password = request.POST.get('password', '')

            if not user.check_password(password):
                messages.error(request, 'Неверный пароль')
                return redirect('account_security')

            if new_email == user.email:
                messages.warning(request, 'Новый email совпадает с текущим')
                return redirect('account_security')

            if User.objects.filter(email=new_email).exclude(id=user.id).exists():
                messages.error(request, 'Этот email уже используется другим пользователем')
                return redirect('account_security')

            verification_code = generate_verification_code()

            request.session['email_change_user_id'] = user.id
            request.session['email_change_new_email'] = new_email
            request.session['email_change_code'] = verification_code
            request.session['email_change_expiry'] = (timezone.now() + timezone.timedelta(minutes=10)).isoformat()

            if send_email_change_confirmation(user.email, new_email, verification_code):
                messages.info(request, f'Код подтверждения отправлен на {user.email}')
                return redirect('verify_email_change')
            else:
                messages.error(request, 'Ошибка отправки кода подтверждения')
                return redirect('account_security')

    return render(request, 'account_security.html')


@login_required
def verify_email_change(request):
    if request.method == 'POST':
        code = request.POST.get('code', '').strip()

        user_id = request.session.get('email_change_user_id')
        new_email = request.session.get('email_change_new_email')
        stored_code = request.session.get('email_change_code')
        expiry_str = request.session.get('email_change_expiry')

        if not all([user_id, new_email, stored_code, expiry_str]):
            messages.error(request, 'Сессия истекла. Пожалуйста, начните смену email заново.')
            return redirect('account_security')

        expiry = timezone.datetime.fromisoformat(expiry_str)
        if timezone.now() > expiry:
            messages.error(request, 'Код истек. Пожалуйста, начните смену email заново.')
            return redirect('account_security')

        if code == stored_code:
            try:
                user = User.objects.get(id=user_id)
                old_email = user.email
                user.email = new_email
                user.save()

                del request.session['email_change_user_id']
                del request.session['email_change_new_email']
                del request.session['email_change_code']
                del request.session['email_change_expiry']

                messages.success(request, f'Email успешно изменен с {old_email} на {new_email}')
                return redirect('profile')
            except User.DoesNotExist:
                messages.error(request, 'Пользователь не найден')
        else:
            messages.error(request, 'Неверный код подтверждения')

    return render(request, 'verify_email_change.html')


@login_required
def resend_email_change_code(request):
    user_id = request.session.get('email_change_user_id')
    new_email = request.session.get('email_change_new_email')

    if user_id and new_email:
        try:
            user = User.objects.get(id=user_id)
            verification_code = generate_verification_code()

            request.session['email_change_code'] = verification_code
            request.session['email_change_expiry'] = (timezone.now() + timezone.timedelta(minutes=10)).isoformat()

            if send_email_change_confirmation(user.email, new_email, verification_code):
                messages.success(request, 'Новый код подтверждения отправлен')
            else:
                messages.error(request, 'Ошибка отправки кода')
        except User.DoesNotExist:
            messages.error(request, 'Пользователь не найден')

    return redirect('verify_email_change')


@login_required
def privacy_settings(request):
    profile = request.user.profile

    if request.method == 'POST':
        profile.profile_visibility = request.POST.get('profile_visibility', 'public')
        profile.show_events = 'show_events' in request.POST
        profile.show_reviews = 'show_reviews' in request.POST
        profile.reviews_visibility = request.POST.get('reviews_visibility', 'public')

        profile.save()
        messages.success(request, 'Настройки приватности сохранены')
        return redirect('privacy_settings')

    return render(request, 'privacy_settings.html')


@login_required
def public_profile(request, username):
    try:
        user = User.objects.get(username=username)
        profile = user.profile

        if not can_view_profile(request.user, profile):
            return render(request, 'profile_private.html', {'username': username})

        show_events = profile.show_events and (profile.profile_visibility == 'public')

        show_reviews = profile.show_reviews

        if show_reviews:
            reviews_visible = (profile.reviews_visibility == 'public')
        else:
            reviews_visible = False

        context = {
            'view_user': user,
            'profile': profile,
            'show_events': show_events,
            'show_reviews': reviews_visible,
        }

        return render(request, 'public_profile.html', context)

    except User.DoesNotExist:
        messages.error(request, 'Пользователь не найден')
        return redirect('profile')


def can_view_profile(viewer, profile):
    if not viewer.is_authenticated:
        return profile.profile_visibility == 'public'

    if viewer == profile.user:
        return True

    if profile.profile_visibility == 'private':
        return False

    return True
