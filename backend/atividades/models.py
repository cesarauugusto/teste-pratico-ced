from django.db import models
from django.conf import settings
from turmas.models import Turma


class Atividade(models.Model):
    titulo = models.CharField(max_length=255)
    descricao = models.TextField()
    turma = models.ForeignKey(
        Turma, on_delete=models.CASCADE, related_name='atividades')
    data_entrega = models.DateField()
    professor = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='atividades_criadas'
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.titulo
