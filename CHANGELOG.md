# Registro de preparação para publicação

## Pacote documental — 13 de setembro de 2026

Base: `concicred3.json`, localizado no arquivo `Relato de projeto NODE-RED.zip` do trabalho acadêmico.

- Criados README, guias técnicos, histórico de prototipagem, exemplo fictício e testes.
- Revisado o CSV de 750 vendas acrescentado pelo autor e confirmado como fictício; incluídas a exportação original, uma cópia normalizada e a conversão reproduzível. Divergências financeiras foram preservadas e documentadas.
- Registrada no README a licença MIT escolhida pelo autor durante a criação do repositório no GitHub.
- Substituída chave literal Groq por `env.get("GROQ_API_KEY")` e adicionado aviso quando ausente.
- Corrigida a configuração do nó `function 1`: duas saídas, com a segunda conectada ao formatador de resposta. O código original já retornava `[null, msg]` em avisos, mas possuía apenas uma saída configurada.
- Removido o nó `groq-config` sem referências e a declaração de seu módulo. A chamada HTTP nativa foi mantida.
- Desativado o nó de debug de recebimentos na cópia pública.
- Removida a URL da fotografia de terceiros usada como fundo de login/menu, sem substituição por outra imagem.
- Substituídos telefone, e-mail e portal de suporte por indicações demonstrativas.
- Adicionado arquivo de configuração para execução isolada em `127.0.0.1`.

Foram mantidos os nomes/IDs dos demais nós, as regras do ETL, a geração de lotes, os gráficos e o prompt financeiro original. Não foram corrigidos os problemas funcionais listados em `docs/LIMITACOES.md`.

O arquivo público possui 42 nós; o original possuía 43. Nenhum arquivo das pastas acadêmicas foi sobrescrito. Essa entrada não representa uma versão histórica lançada pelo autor: registra as adaptações feitas para a publicação atual.
