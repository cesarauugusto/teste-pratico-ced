from django.db import models
from django.conf import settings
from atividades.models import Atividade


class Resposta(models.Model):
    atividade = models.ForeignKey(
        Atividade,
        on_delete=models.CASCADE,
        related_name='respostas'
    )
    aluno = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='respostas'
    )
    texto_resposta = models.TextField()
    nota = models.DecimalField(
        max_digits=4, decimal_places=2, null=True, blank=True)
    feedback = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('atividade', 'aluno')

    def __str__(self):
        return f"{self.aluno.name} - {self.atividade.titulo}"
