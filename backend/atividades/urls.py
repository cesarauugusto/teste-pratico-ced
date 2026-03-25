from django.urls import path
from .views import MinhasAtividadesView, CriarAtividadeView

urlpatterns = [
    path('me/atividades', MinhasAtividadesView.as_view()),
    path('atividades', CriarAtividadeView.as_view()),
]