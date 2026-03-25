import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "core.settings")
django.setup()

from users.models import User

email = os.getenv("DJANGO_SUPERUSER_EMAIL")
password = os.getenv("DJANGO_SUPERUSER_PASSWORD")
name = os.getenv("DJANGO_SUPERUSER_NAME", "Admin")

if email and password:
    if not User.objects.filter(email=email).exists():
        print("Criando superusuário...")
        User.objects.create_superuser(
            email=email,
            name=name,
            password=password
        )
        print("Superusuário criado com sucesso!")
    else:
        print("Superusuário já existe.")
else:
    print("Variáveis de ambiente não definidas.")