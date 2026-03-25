from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from .models import Atividade
from .serializers import AtividadeSerializer


class MinhasAtividadesView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        if user.role == 'PROFESSOR':
            atividades = Atividade.objects.filter(professor=user)
        elif user.role == 'ALUNO':
            atividades = Atividade.objects.filter(turma=user.turma)
        else:
            atividades = Atividade.objects.none()

        serializer = AtividadeSerializer(atividades, many=True)
        return Response(serializer.data)


class CriarAtividadeView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        if request.user.role != 'PROFESSOR':
            return Response(
                {'detail': 'Apenas professores podem criar atividades.'},
                status=status.HTTP_403_FORBIDDEN
            )

        serializer = AtividadeSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(professor=request.user)

        return Response(serializer.data, status=status.HTTP_201_CREATED)