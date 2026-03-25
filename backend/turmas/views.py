from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .models import Turma
from .serializers import TurmaSerializer


class ListarTurmasView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        turmas = Turma.objects.all().order_by("nome")
        serializer = TurmaSerializer(turmas, many=True)
        return Response(serializer.data)