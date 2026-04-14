# API para Frontend

Este documento consolida as rotas para o frontend consumir a API, com base no contrato em docs/api-rest.md. Ele separa o que ja existe no backend e o que ainda e apenas contrato.

## Base URL (prioridade)

1) Nginx HTTPS (principal): https://localhost
2) Nginx HTTP (fallback): http://localhost:433
3) Backend direto (fallback de emergencia): http://localhost:3000

Observacao:
- O frontend deve tentar o item 1 e, se falhar, cair para o item 2. O item 3 so deve ser usado em ambiente local sem Nginx.

## Headers

- Para rotas protegidas, usar: Authorization: Bearer <token>
- Content-Type: application/json

## Auth (implementado)

- POST /auth/register
- POST /auth/login

## Students (implementado)

- GET /students
- GET /students/:id
- GET /students/user/:userId
- POST /students
- PUT /students/:id
- DELETE /students/:id

## Posts (implementado)

- GET /posts
- GET /posts/:id
- GET /posts/author/:authorId
- POST /posts
- PUT /posts/:id
- DELETE /posts/:id

## Companies (parcialmente implementado)

- POST /companies
- GET /companies/me
- POST /companies/jobs
- GET /companies/jobs

## Auth (contrato, ainda nao implementado)

- POST /auth/refresh
- POST /auth/logout
- POST /auth/forgot-password
- POST /auth/reset-password

## Companies (contrato, ainda nao implementado)

- PUT /companies/:id
- DELETE /companies/:id
- GET /companies/:id/public

## Universities (contrato, ainda nao implementado)

- POST /universities
- GET /universities/:id/public
- PUT /universities/:id
- DELETE /universities/:id
- GET /universities/:id

## Jobs (contrato, ainda nao implementado)

- GET /jobs
- GET /jobs/:id
- POST /jobs
- PUT /jobs/:id
- DELETE /jobs/:id
- POST /jobs/:id/applications
- GET /jobs/applications/me
- GET /jobs/:id/applications
- PATCH /jobs/applications/:applicationId/accept
- PATCH /jobs/applications/:applicationId/reject

## Reviews (contrato, ainda nao implementado)

- POST /reviews/students
- GET /reviews/received/me
- GET /reviews/given/me
- GET /reviews/student/:studentId

## Profiles (contrato, ainda nao implementado)

- GET /profiles/student/:studentId
- GET /profiles/company/:companyId
- GET /profiles/university/:universityId

## Feed (contrato, ainda nao implementado)

- GET /feed/me
- GET /feed/global
- POST /feed/posts
- DELETE /feed/posts/:id
- POST /feed/posts/:id/like
- POST /feed/posts/:id/comments
- GET /feed/posts/:id/comments

## Connections e Follows (contrato, ainda nao implementado)

- POST /connections
- POST /connections/:id/accept
- POST /connections/:id/reject
- GET /connections/me
- DELETE /connections/:id
- POST /follows
- DELETE /follows/:id
- GET /follows/me

## Exemplo de uso de base URL no frontend

- Base principal: https://localhost
- Exemplo: GET https://localhost/students

Se nao responder, usar:
- GET http://localhost:433/students
- (fallback final) GET http://localhost:3000/students
