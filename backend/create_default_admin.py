import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "core.settings")
django.setup()

from users.models import User

DEFAULT_EMAIL = "adm@adm.com"
DEFAULT_PASSWORD = "12345678"
DEFAULT_NAME = "Administrador"

user, created = User.objects.get_or_create(
    email=DEFAULT_EMAIL,
    defaults={
        "name": DEFAULT_NAME,
        "role": "PROFESSOR",
        "is_staff": True,
        "is_superuser": True,
        "is_active": True,
    },
)

# Mesmo que já exista, força os dados e a senha
user.name = DEFAULT_NAME
user.role = "PROFESSOR"
user.is_staff = True
user.is_superuser = True
user.is_active = True
user.set_password(DEFAULT_PASSWORD)
user.save()

if created:
    print("Admin padrão criado com sucesso.")
else:
    print("Admin padrão atualizado com sucesso.")