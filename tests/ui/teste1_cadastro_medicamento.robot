*** Settings ***
Library           SeleniumLibrary
Suite Setup       Abrir Navegador
Suite Teardown    Fechar Navegador

*** Variables ***
${URL}              http://localhost:3000/cadastrar
${BROWSER}          chrome
${INPUT_NOME}       id=nome
${INPUT_DOSAGEM}    id=dosagem
${INPUT_HORARIO}    id=horario
${BTN_CADASTRAR}    id=btn-cadastrar
${MENSAGEM}         id=mensagem

*** Test Cases ***

CT01 - Deve cadastrar medicamento com dados válidos
    [Documentation]    Tabela de Decisão — Regras R1, R2, R3 satisfeitas
    Dado que o usuario acessa a tela de cadastro
    E informa o nome         Losartana
    E informa a dosagem      50mg
    E informa o horario      08:00
    Quando solicita o cadastro
    Então a mensagem deve ser    Medicamento cadastrado com sucesso!

CT02 - Deve validar nome obrigatório
    [Documentation]    Tabela de Decisão — Regra R1 violada (nome vazio)
    Dado que o usuario acessa a tela de cadastro
    E informa o nome
    E informa a dosagem      50mg
    E informa o horario      08:00
    Quando solicita o cadastro
    Então a mensagem deve ser    Nome do medicamento é obrigatório

CT03 - Deve validar dosagem obrigatória
    [Documentation]    Tabela de Decisão — Regra R2 violada (dosagem vazia)
    Dado que o usuario acessa a tela de cadastro
    E informa o nome         Atenolol
    E informa a dosagem
    E informa o horario      08:00
    Quando solicita o cadastro
    Então a mensagem deve ser    Dosagem é obrigatória

CT04 - Deve validar horário inválido
    [Documentation]    Tabela de Decisão — Regra R3 violada (horário fora do formato)
    Dado que o usuario acessa a tela de cadastro
    E informa o nome         Rivotril
    E informa a dosagem      2mg
    E informa o horario      99:99
    Quando solicita o cadastro
    Então a mensagem deve ser    Horário inválido. Use o formato HH:MM

*** Keywords ***

Abrir Navegador
    Open Browser    ${URL}    ${BROWSER}
    Maximize Browser Window

Fechar Navegador
    Close Browser

Dado que o usuario acessa a tela de cadastro
    Go To    ${URL}
    Wait Until Element Is Visible    ${BTN_CADASTRAR}    timeout=10s

E informa o nome
    [Arguments]    ${nome}=${EMPTY}
    Clear Element Text    ${INPUT_NOME}
    Run Keyword If    '${nome}' != '${EMPTY}'    Input Text    ${INPUT_NOME}    ${nome}

E informa a dosagem
    [Arguments]    ${dosagem}=${EMPTY}
    Clear Element Text    ${INPUT_DOSAGEM}
    Run Keyword If    '${dosagem}' != '${EMPTY}'    Input Text    ${INPUT_DOSAGEM}    ${dosagem}

E informa o horario
    [Arguments]    ${horario}=${EMPTY}
    Clear Element Text    ${INPUT_HORARIO}
    Run Keyword If    '${horario}' != '${EMPTY}'    Input Text    ${INPUT_HORARIO}    ${horario}

Quando solicita o cadastro
    Click Button    ${BTN_CADASTRAR}
    Sleep    1s

Então a mensagem deve ser
    [Arguments]    ${mensagem_esperada}
    Wait Until Element Is Visible    ${MENSAGEM}    timeout=5s
    Element Should Contain    ${MENSAGEM}    ${mensagem_esperada}
