📄 README PRONTO (só copiar e colar)
# **Plataforma de Atividades Escolares**

## **Como rodar o projeto (Docker)**

### **1. Clonar o repositório**
```bash
git clone https://github.com/cesarauugusto/teste-pratico-ced.git
cd teste-pratico-ced
2. Rodar o projeto
docker compose up --build
Acessos
Frontend
http://localhost:5173
Backend
http://localhost:8000
Admin Django
http://localhost:8000/admin
Credenciais de teste
Professor
Email: professor@demo.com
Senha: 12345678
Aluno
Email: aluno@demo.com
Senha: 12345678
Funcionalidades
Professor
Criar atividades
Selecionar turma
Visualizar atividades criadas
Visualizar respostas dos alunos
Corrigir com nota e feedback
Aluno
Visualizar atividades da sua turma
Enviar resposta
Visualizar atividades corrigidas
Ver nota e feedback
Tecnologias utilizadas
Backend
Django
Django REST Framework
JWT (SimpleJWT)
Frontend
React
Vite
Axios
Infraestrutura
Docker
Docker Compose
PostgreSQL
Decisões técnicas
Separação entre backend e frontend para melhor organização
Uso de JWT para autenticação entre frontend e API
Uso de Docker para facilitar execução com um único comando
PostgreSQL para persistência de dados no ambiente containerizado
Estrutura baseada em perfis (Professor e Aluno)
Observações
O sistema já sobe com dados de demonstração automaticamente
Cada aluno pode enviar apenas uma resposta por atividade
Professor só pode corrigir atividades que criou
Nota obrigatória (0 a 10) e feedback opcional