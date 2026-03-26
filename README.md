# 📚 Plataforma de Atividades Escolares

---

## 📌 Sobre o projeto
Sistema web para gerenciamento de atividades escolares com dois perfis: **Professor** e **Aluno**, permitindo criação, envio e correção de atividades.

---

## ⚙️ Como rodar o projeto (Docker)

### **1. Clonar o repositório**
```bash
git clone https://github.com/cesarauugusto/teste-pratico-ced.git
cd teste-pratico-ced
```

---

### **2. Subir o projeto com Docker**
```bash
docker compose up --build
```

> Esse comando irá:
> - Construir os containers  
> - Subir backend, frontend e banco de dados 

---

## 🌐 Acessos

- **Frontend:** http://localhost:5173  
- **Backend:** http://localhost:8000  
- **Admin Django:** http://localhost:8000/admin  

---

## 🔐 Credenciais de teste

### **Professor**
- Email: professor@demo.com  
- Senha: 12345678  

### **Aluno**
- Email: aluno@demo.com  
- Senha: 12345678  

---

## 🧪 Observações

- O sistema já inicia com **dados de demonstração**  
- Permite testar todo o fluxo:
- Professor (criação e correção)  
- Aluno (resposta e visualização)  

  ---

## 🧩 Funcionalidades
---

## 🛠️ Tecnologias utilizadas

### Backend
- Django  
- Django REST Framework  
- JWT (SimpleJWT)  

### Frontend
- React  
- Vite  
- Axios  

### Infraestrutura
- Docker  
- Docker Compose  
- PostgreSQL  

---

## 📖 Decisões técnicas

### **Separação entre backend e frontend**
O projeto foi dividido em **backend** e **frontend** para melhorar a organização do código e separar responsabilidades.  
Com isso, o backend fica responsável pelas regras de negócio, autenticação e acesso ao banco, enquanto o frontend cuida da interface e da experiência do usuário.

---

### **Uso de JWT para autenticação**
Foi utilizado **JWT (JSON Web Token)** para autenticação entre frontend e backend porque a aplicação foi construída como uma **API REST** separada da interface React.  
Nesse modelo, o frontend faz login, recebe um token e envia esse token nas próximas requisições protegidas.

Existem outras formas de autenticação, como **sessão com cookies**, mas nesse projeto o JWT foi escolhido por se encaixar melhor na comunicação entre **React + API Django**.

---

### **Uso do Django REST Framework**
O **Django REST Framework** foi utilizado para facilitar a construção da API.  
Com ele foi possível trabalhar de forma organizada com:
- serializers
- views de API
- autenticação com JWT
- respostas em JSON
- controle de permissões

Seria possível fazer a API apenas com Django puro, mas daria mais trabalho e o código ficaria menos organizado para esse tipo de aplicação.  
Por isso, o DRF foi escolhido para tornar o desenvolvimento da API mais adequado ao projeto.

---

### **Uso do React com Vite**
No frontend foi utilizado **React** para construir a interface da aplicação de forma componentizada, separando telas e elementos reutilizáveis.

O **Vite** foi escolhido porque:
- cria o projeto de forma rápida
- inicia o ambiente de desenvolvimento com mais velocidade
- facilita o uso de React em projetos modernos

Seria possível usar outra ferramenta, como Create React App, mas o Vite foi adotado por ser mais leve e rápido no desenvolvimento.

---

### **Uso do Axios**
O **Axios** foi utilizado para fazer as requisições HTTP entre o frontend e o backend.  
Ele facilita o envio de dados, o tratamento de respostas e a inclusão automática do token JWT nas requisições protegidas.

Seria possível usar `fetch`, que já existe no JavaScript, mas o Axios foi escolhido porque deixa o código mais organizado e facilita a comunicação com a API.

---

### **Estrutura baseada em perfis**
O sistema foi organizado em dois perfis principais:
- **Professor**
- **Aluno**

Essa separação foi importante para aplicar corretamente as regras de negócio, garantindo que cada usuário enxergue apenas as funcionalidades do seu papel dentro da plataforma.