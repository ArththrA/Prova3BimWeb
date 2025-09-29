# 📦 Análise e Correção da Prova Prática de Programação Web

Este documento contém a análise detalhada do projeto enviado e as correções aplicadas para que o sistema atenda plenamente aos requisitos da prova.

---

## ✅ Projeto Corrigido

O projeto corrigido pode ser baixado aqui:

[Download do projeto corrigido (zip)](Prova3BimWeb_fixed.zip)

---

## 📋 Resumo do que foi feito

- Analisei os arquivos enviados (`server.js`, `routes/auth.js`, `routes/users.js`, `middleware/auth.js`, `utils/db.js`, `db.json`, `package.json`, etc.).  
- Identifiquei problemas e inconsistências.  
- Criei uma versão corrigida com as seguintes melhorias:

### Alterações principais
- **server.js** configurado com `dotenv`, JSON body parser e roteamento organizado.
- **utils/db.js** com funções `readDB()` e `writeDB()` usando `fs/promises`.
- **middleware/auth.js** implementado corretamente (`verifyToken`) validando `Authorization: Bearer <token>`.
- **routes/auth.js**
  - `/auth/register` → valida campos, previne e-mails duplicados, gera hash de senha (`bcryptjs`), grava usuário com `id` incremental.
  - `/auth/login` → valida credenciais, compara senha com `bcrypt.compare`, gera JWT com 1h de expiração.
- **routes/users.js**
  - CRUD completo protegido por `verifyToken`.
  - Retorno de usuários sem expor senha.
- **db.json** inicializado como `[]`.
- **.env** corrigido com `CHAVE` e `PORT`.

---

## 🚨 Problemas detectados no código original

1. **`db.json` no formato errado**  
   - Estava como objeto único, deveria ser array `[]`.

2. **Middleware de autenticação incorreto**  
   - Assinatura inválida, uso errado de `req.headers`, `next()` ausente.

3. **Leitura do `db.json` estática**  
   - Arquivo era lido apenas uma vez.  
   - Corrigido com `readDB()`/`writeDB()` em cada operação.

4. **Mistura de ESM/CommonJS**  
   - Uso inconsistente de `require` e `import`.  
   - Corrigido para `import/export` (já que `type: "module"` está no `package.json`).

5. **JWT mal implementado**  
   - Geração/validação do token incompleta ou ausente.  
   - Corrigido para usar `jsonwebtoken` com `process.env.CHAVE` e expiração de 1h.

6. **Senhas armazenadas sem hash**  
   - Agora usa `bcrypt.hash` no registro e `bcrypt.compare` no login.

7. **Sem controle de `id`**  
   - Usuários agora recebem `id` incremental automaticamente.

8. **Rotas `/users` sem proteção**  
   - Todas agora usam `verifyToken`.

9. **`.env` mal formatado**  
   - Estava em JSON. Corrigido para formato `KEY=VALUE`.

10. **Erros de sintaxe e chamadas inválidas**  
    - Ex.: `req.headers("authorization")`. Corrigido para `req.headers.authorization`.

---

## 📂 Estrutura Corrigida

```plaintext
📦 Prova3BimWeb_fixed
 ├─ db.json
 ├─ .env
 ├─ server.js
 ├─ utils/
 │     └─ db.js
 ├─ middleware/
 │     └─ auth.js
 ├─ routes/
 │    ├─ auth.js
 │    └─ users.js
 └─ README.md
```

---

## 🔑 Rotas da API

### Registro de usuário
**POST /auth/register**  
Body JSON:
```json
{
  "nome": "Maria",
  "email": "maria@email.com",
  "senha": "senha123"
}
```

### Login
**POST /auth/login**  
Body JSON:
```json
{ "email": "maria@email.com", "senha": "senha123" }
```
Response:
```json
{ "token": "<JWT>", "expiresIn": 3600 }
```

### Listar usuários
**GET /users**  
Header:
```
Authorization: Bearer <JWT>
```

### Buscar usuário por id
**GET /users/:id**  
Header: `Authorization: Bearer <JWT>`

### Atualizar usuário
**PUT /users/:id**  
Body (exemplo):
```json
{ "nome": "Novo Nome" }
```

### Deletar usuário
**DELETE /users/:id**

---

## 🛡️ Boas práticas recomendadas

- Não versionar `.env` em produção.
- Usar banco de dados real (Mongo, Postgres) em vez de `db.json` em ambientes de produção.
- Adicionar validações robustas (`express-validator` ou `Joi`).
- Adicionar rate limiting para rota de login.
- Usar middlewares adicionais (`helmet`, `cors`, `morgan`).

---

## ✅ Conclusão

O projeto corrigido agora atende aos requisitos da prova prática:

- CRUD de usuários completo.  
- Autenticação com JWT válido por 1h.  
- Persistência em arquivo JSON.  
- Estrutura organizada em pastas.  
- Testável no **Thunder Client** ou Postman.  
