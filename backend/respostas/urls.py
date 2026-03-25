from django.urls import path
from .views import (
    CriarRespostaView,
    CorrigirRespostaView,
    MinhasRespostasView,
    RespostasPorAtividadeView,
)

urlpatterns = [
    path("respostas", CriarRespostaView.as_view()),
    path("respostas/<int:id>", CorrigirRespostaView.as_view()),
    path("me/respostas", MinhasRespostasView.as_view()),
    path("atividades/<int:id>/respostas/", RespostasPorAtividadeView.as_view()),
]
