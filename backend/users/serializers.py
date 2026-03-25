from rest_framework import serializers
from django.contrib.auth import authenticate


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')

        if not email or not password:
            raise serializers.ValidationError(
                'Email e senha são obrigatórios.')

        user = authenticate(username=email, password=password)

        if not user:
            raise serializers.ValidationError('Credenciais inválidas.')

        if not user.is_active:
            raise serializers.ValidationError('Usuário inativo.')

        attrs['user'] = user
        return attrs
