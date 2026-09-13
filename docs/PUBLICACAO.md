# Publicar no GitHub

## O que enviar

Use o conteúdo da pasta `concicred` deste pacote. O arquivo `README.md` deve ficar na raiz do repositório, ao lado das pastas `flows`, `docs`, `examples` e `tests`.

Nome sugerido: `concicred-node-red`.

Descrição sugerida: `Protótipo acadêmico de controladoria financeira com Node-RED, ETL de vendas em CSV e consultor IA via Groq.`

Tópicos sugeridos: `node-red`, `javascript`, `etl`, `csv`, `groq`, `prototyping`.

## Publicação pelo navegador

1. No GitHub, crie um repositório em sua conta com o nome escolhido.
2. Para a primeira revisão, mantenha o repositório privado. Não gere outro README se for enviar o fornecido neste pacote. A licença MIT pode ser criada pelo GitHub.
3. Use a opção de upload de arquivos e arraste o conteúdo da pasta `concicred`, preservando suas subpastas. Confira se `README.md` aparece na raiz, e não dentro de uma pasta extra.
4. Verifique que não selecionou `.runtime`, arquivos `.env`, exports antigos ou o ZIP acadêmico original. O upload pelo navegador não depende do `.gitignore` para filtrar sua seleção.
5. Registre a inclusão com a mensagem `Documenta protótipo ConciCred e adiciona fluxo para demonstração`.
6. Abra o README no repositório e confira links, imagens, diagramas e arquivos disponíveis.
7. Depois da revisão do conteúdo, ajuste a visibilidade para pública se desejar apresentar o projeto abertamente.

O envio não foi realizado automaticamente. Também não foi inicializado um repositório Git dentro da pasta da faculdade.

## Evidência de branch e merge

Uma atividade posterior legítima é melhorar a documentação em uma branch, por exemplo `docs/demonstracao`, adicionar capturas feitas com o CSV fictício e abrir um pull request para revisar essa mudança. Isso cria evidência real de uso de branches e revisão. Não invente commits antigos para representar o semestre anterior: a evolução passada já está descrita em `docs/ORIGEM.md`.

## Revisão antes de tornar público

- Revogar/substituir a chave identificada no export original da Groq.
- Publicar apenas o fluxo preparado; a chave continua nos arquivos acadêmicos originais.
- Conferir ausência de documentos pessoais, capturas de clientes, CSVs reais e históricos do chat.
- Registrar as versões do Node-RED e Node.js usadas na sua demonstração.
- Confirmar que o arquivo `LICENSE` criado no GitHub contém a licença MIT escolhida para o projeto.

Este repositório armazena o código e sua documentação. O GitHub Pages não executa um servidor Node-RED; publicar arquivos não disponibiliza automaticamente o sistema em um endereço web.

## Relação com a atividade de Design Profissional

O projeto pode demonstrar repositório próprio, README, commits, branch e merge/pull request. A trilha completa GitHub Foundations, seus comprovantes e a apresentação dos demais perfis profissionais continuam sendo entregas independentes do projeto.
