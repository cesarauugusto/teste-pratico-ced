from rest_framework import serializers
from .models import Resposta
from atividades.models import Atividade
from users.models import User


class AlunoResumoSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name']


class AtividadeResumoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Atividade
        fields = ['id', 'titulo']


class RespostaSerializer(serializers.ModelSerializer):
    atividade = AtividadeResumoSerializer(read_only=True)
    aluno = AlunoResumoSerializer(read_only=True)

    atividade_id = serializers.PrimaryKeyRelatedField(
        queryset=Atividade.objects.all(),
        source='atividade',
        write_only=True
    )

    class Meta:
        model = Resposta
        fields = '__all__'
        read_only_fields = ('aluno', 'nota', 'feedback')

    def to_representation(self, instance):
        data = super().to_representation(instance)

        if data.get('feedback') == "":
            data['feedback'] = None

        return data
