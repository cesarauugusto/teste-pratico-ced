from django.urls import path
from .views import CriarRespostaView, CorrigirRespostaView, MinhasRespostasView

urlpatterns = [
    path('respostas', CriarRespostaView.as_view()),
    path('respostas/<int:id>', CorrigirRespostaView.as_view()),
    path('me/respostas', MinhasRespostasView.as_view()),
]