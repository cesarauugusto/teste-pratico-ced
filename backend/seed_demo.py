from respostas.models import Resposta
from atividades.models import Atividade
from turmas.models import Turma
from users.models import User
import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "core.settings")
django.setup()


turma1, _ = Turma.objects.get_or_create(nome="8º Ano A")
turma2, _ = Turma.objects.get_or_create(nome="9º Ano A")

professor, _ = User.objects.get_or_create(
    email="professor@demo.com",
    defaults={
        "name": "Professor Demo",
        "role": "PROFESSOR",
        "is_staff": True,
        "is_superuser": False,
        "is_active": True,
    },
)
professor.name = "Professor Demo"
professor.role = "PROFESSOR"
professor.is_staff = True
professor.is_active = True
professor.set_password("12345678")
professor.save()

aluno, _ = User.objects.get_or_create(
    email="aluno@demo.com",
    defaults={
        "name": "Aluno Demo",
        "role": "ALUNO",
        "turma": turma1,
        "is_active": True,
    },
)
aluno.name = "Aluno Demo"
aluno.role = "ALUNO"
aluno.turma = turma1
aluno.is_active = True
aluno.set_password("12345678")
aluno.save()

atividade1, _ = Atividade.objects.get_or_create(
    titulo="Atividade de Matemática",
    defaults={
        "descricao": "Resolver os exercícios 1 a 5.",
        "turma": turma1,
        "data_entrega": "2026-04-10",
        "professor": professor,
    },
)

atividade2, _ = Atividade.objects.get_or_create(
    titulo="Produção de Texto",
    defaults={
        "descricao": "Escreva um texto sobre meio ambiente.",
        "turma": turma1,
        "data_entrega": "2026-04-15",
        "professor": professor,
    },
)

Resposta.objects.get_or_create(
    atividade=atividade1,
    aluno=aluno,
    defaults={
        "texto_resposta": "Resolvi os exercícios e obtive os resultados pedidos.",
        "nota": 8.5,
        "feedback": "Boa resposta. Revise apenas a questão 4.",
    },
)

Resposta.objects.get_or_create(
    atividade=atividade2,
    aluno=aluno,
    defaults={
        "texto_resposta": "Texto sobre preservação ambiental e reciclagem.",
        "nota": None,
        "feedback": None,
    },
)

print("Dados demo criados com sucesso.")
