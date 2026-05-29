# CareSenior

Projeto acadêmico da disciplina de Teste de Software sobre cuidado familiar compartilhado da saúde de idosos.

## Estrutura do Projeto

```
├── backend/          # API REST Node.js/Express
│   └── src/
│       ├── server.js
│       ├── db.js
│       └── routes/
│           ├── medicamentos.js
│           └── doses.js
├── frontend/         # Interface React
│   └── src/
│       ├── App.jsx
│       ├── api.js
│       └── pages/
│           ├── Medicamentos.jsx
│           ├── CadastrarMedicamento.jsx
│           ├── RegistrarDose.jsx
│           └── Historico.jsx
└── tests/
    ├── api/
    │   └── caresenior-api.postman_collection.json
    ├── ui/
    │   ├── teste1_cadastro_medicamento.robot
    │   └── teste2_registrar_dose.robot
    └── wiki/         # Conteúdo das páginas wiki (modelagem, docs, relatórios)
```

## Como Executar

### Backend

```bash
cd backend
npm install
npm run dev
# Rodando em http://localhost:3001
```

### Frontend

```bash
cd frontend
npm install
npm run dev
# Rodando em http://localhost:3000
```

### Testes de API (Postman)

1. Importe `tests/api/caresenior-api.postman_collection.json` no Postman
2. Com o backend rodando, execute a coleção

### Testes de UI (Robot Framework)

```bash
pip install robotframework robotframework-seleniumlibrary --break-system-packages
robot tests/ui/teste1_cadastro_medicamento.robot
robot tests/ui/teste2_registrar_dose.robot
```

## Endpoints da API

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | /status | Health check |
| GET | /medicamentos | Lista medicamentos |
| POST | /medicamentos | Cadastra medicamento |
| PUT | /medicamentos/:id | Atualiza medicamento |
| DELETE | /medicamentos/:id | Remove medicamento |
| GET | /doses | Lista doses administradas |
| GET | /doses/pendentes | Lista doses pendentes |
| POST | /doses | Registra administração de dose |

## Wiki

A documentação completa está na [Wiki do repositório](../../wiki).
