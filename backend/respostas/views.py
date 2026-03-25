from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from .models import Resposta
from .serializers import RespostaSerializer
from atividades.models import Atividade


class CriarRespostaView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user

        if user.role != 'ALUNO':
            return Response(
                {'detail': 'Apenas alunos podem enviar respostas.'},
                status=status.HTTP_403_FORBIDDEN
            )

        atividade_id = request.data.get('atividade')

        try:
            atividade = Atividade.objects.get(id=atividade_id)
        except Atividade.DoesNotExist:
            return Response(
                {'detail': 'Atividade não encontrada.'},
                status=status.HTTP_404_NOT_FOUND
            )

        if atividade.turma != user.turma:
            return Response(
                {'detail': 'Você não pode responder atividades de outra turma.'},
                status=status.HTTP_403_FORBIDDEN
            )

        if Resposta.objects.filter(atividade=atividade, aluno=user).exists():
            return Response(
                {'detail': 'Você já respondeu essa atividade.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer = RespostaSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(aluno=user)

        return Response(serializer.data, status=status.HTTP_201_CREATED)


class CorrigirRespostaView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, id):
        user = request.user

        if user.role != 'PROFESSOR':
            return Response(
                {'detail': 'Apenas professores podem corrigir.'},
                status=status.HTTP_403_FORBIDDEN
            )

        try:
            resposta = Resposta.objects.get(id=id)
        except Resposta.DoesNotExist:
            return Response(
                {'detail': 'Resposta não encontrada.'},
                status=status.HTTP_404_NOT_FOUND
            )

        if resposta.atividade.professor != user:
            return Response(
                {'detail': 'Você não pode corrigir essa atividade.'},
                status=status.HTTP_403_FORBIDDEN
            )

        nota = request.data.get('nota')
        feedback = request.data.get('feedback')

        if nota is None:
            return Response(
                {'detail': 'Nota é obrigatória.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            nota = float(nota)
        except (TypeError, ValueError):
            return Response(
                {'detail': 'Nota deve ser numérica.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        if not (0 <= nota <= 10):
            return Response(
                {'detail': 'Nota deve ser entre 0 e 10.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        resposta.nota = nota
        resposta.feedback = feedback
        resposta.save()

        return Response({
            'id': resposta.id,
            'nota': resposta.nota,
            'feedback': resposta.feedback
        }, status=status.HTTP_200_OK)
    
class MinhasRespostasView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        if user.role != 'ALUNO':
            return Response(
                {'detail': 'Apenas alunos podem ver suas respostas.'},
                status=403
            )

        respostas = Resposta.objects.filter(aluno=user)

        serializer = RespostaSerializer(respostas, many=True)
        return Response(serializer.data)