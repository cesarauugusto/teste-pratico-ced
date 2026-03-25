from django.urls import path
from .views import ListarTurmasView

urlpatterns = [
    path("turmas", ListarTurmasView.as_view()),
]