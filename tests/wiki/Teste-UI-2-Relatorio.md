# Relatório de Execução — Teste de Interface 2

## Interface Testada

Tela de Registro de Dose — `http://localhost:3000/registrar-dose`

## Ambiente de Testes

| Item | Valor |
|------|-------|
| Ferramenta | Robot Framework + SeleniumLibrary |
| Navegador | Google Chrome |
| Ambiente | Localhost |
| URL | http://localhost:3000/registrar-dose |
| Data de execução | 28/05/2026 |

## Script de execução

```bash
robot tests/ui/teste2_registrar_dose.robot
```

---

## Casos de Teste e Resultados

| Caso de Teste | Resultado Esperado | Resultado Obtido | Status |
|---------------|-------------------|-----------------|--------|
| CT01 — Registro válido | Dose registrada com sucesso! | Dose registrada com sucesso! | ✅ Aprovado |
| CT02 — Administrador vazio | Mensagem contendo "obrigatório" | Nome de quem administrou é obrigatório | ✅ Aprovado |
| CT03 — Sem medicamento selecionado | Mensagem contendo "obrigatório" | ID do medicamento é obrigatório | ✅ Aprovado |

---

## Resumo dos Resultados

| Total de testes | Aprovados | Reprovados |
|-----------------|-----------|------------|
| 3 | 3 | 0 |

---

## Arquivos de Evidência

| Arquivo | Descrição | Link |
|---------|-----------|------|
| report.html | Resumo executivo da execução | [report.html](../blob/main/tests/ui/results/teste2/report.html) |
| log.html | Log detalhado da execução | [log.html](../blob/main/tests/ui/results/teste2/log.html) |
| output.xml | Resultado bruto da execução | [output.xml](../blob/main/tests/ui/results/teste2/output.xml) |

---

## Conclusão

Os testes automatizados da tela de registro de dose validaram corretamente as partições de equivalência dos campos da interface. O sistema identificou e tratou adequadamente todos os cenários inválidos testados.
