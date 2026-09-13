# Arquitetura

## Aplicação por fluxos

O ConciCred usa Node-RED como servidor HTTP e orquestrador. Cada página combina nós HTTP In, Function, Template e HTTP Response. Os Templates contêm HTML, CSS, JavaScript do navegador e marcações Mustache. Não é necessário instalar o pacote Node-RED Dashboard para essas telas.

O export público possui sete abas e 42 nós, incluindo a configuração global. O código executável fica em [`flows/concicred.json`](../flows/concicred.json).

## Rotas

| Método | Caminho | Responsabilidade |
| --- | --- | --- |
| GET | `/login` | Formulário de acesso |
| POST | `/login-submit` | Validação das contas demonstrativas |
| GET | `/menu` | Navegação principal |
| GET / POST | `/dashboard` | Indicadores e filtros |
| GET / POST | `/vendas` | Consulta, filtros e importação multipart |
| GET / POST | `/recebimentos` | Lotes, filtros, status e encargos |
| GET | `/contato` | Contatos ilustrativos |
| GET | `/api/consultoria` | Pergunta no parâmetro `pergunta` e resposta JSON |

Essas rotas descrevem o protótipo; elas não formam uma API pública autenticada. Um GET de consultoria sem pergunta pode executar o diagnóstico padrão quando há dados e chave, inclusive no carregamento da interface.

## Funções centrais

| Nome no editor | Responsabilidade |
| --- | --- |
| Validar Usuario | Consulta a lista fixa de contas e salva `usuarioLogado` |
| Motor ETL | Lê o buffer CSV e substitui `vendasTotais` |
| Processador de vendas | Aplica filtros/ordenação e prepara totais da tabela |
| Cerebro do dashboard | Calcula indicadores e séries para os gráficos |
| Motor de Auditoria | Gera lotes e processa validação, reversão e encargos |
| function 1 | Agrega dados e monta requisição ao consultor IA |
| function 2 | Converte a resposta da API no formato esperado pelo chat |

## Estado em memória

| Chave global | Uso |
| --- | --- |
| `usuarioLogado` | Última conta que passou pelo login |
| `vendasTotais` | Base de vendas importada |
| `filtroVendas` | Filtros compartilhados da tela de vendas; também lidos pela IA |
| `filtroRecebimentos` | Filtros compartilhados de lotes |
| `lotesRecebimentoV3` | Lotes de demonstração e alterações |
| `historicoChatConciCred` | Respostas acumuladas do consultor |

Na configuração fornecida, esse estado desaparece ao encerrar o processo. O Node-RED permite outros armazenamentos de contexto, mas nenhum banco ou contexto persistente veio junto dos exports. Referência: [contexto no Node-RED](https://nodered.org/docs/user-guide/context).

O navegador usa `sessionStorage` para o estado visual e o HTML do chat. Isso não fornece isolamento entre usuários no servidor nem histórico durável. Os filtros do dashboard vêm do POST da própria página; a IA lê `filtroVendas`, podendo usar um recorte diferente.

## Contexto planejado e implementação

O [diagrama C4 acadêmico](diagramas/contexto-c4.pdf) inclui TEF, adquirentes, bandeiras e notificações. Esses elementos representam o sistema desejado. Na versão exportada, a entrada é CSV e a integração externa funcional identificada é a requisição à Groq. O [diagrama de classes](diagramas/classes.pdf) registra entidades do domínio, sem implementação equivalente de classes ou tabelas relacionais no JSON.
