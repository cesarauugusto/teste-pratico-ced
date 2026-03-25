from django.contrib import admin
from .models import Resposta


@admin.register(Resposta)
class RespostaAdmin(admin.ModelAdmin):
    list_display = ('atividade', 'aluno', 'nota', 'created_at')
    search_fields = ('atividade__titulo', 'aluno__email', 'aluno__name')
    list_filter = ('atividade',)
