from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('users.urls')),
    path('', include('atividades.urls')),
    path('', include('respostas.urls')),
    path("", include("turmas.urls")),
]
