# Limitações e evolução

Esta análise descreve a versão empacotada. O projeto é adequado para estudo e demonstração local com dados fictícios, mas requer evolução antes de exposição pública como aplicação.

| Área | Limitação observada | Evolução necessária |
| --- | --- | --- |
| Acesso | Senhas demonstrativas em texto e usuário em variável global | Autenticação, sessões individuais e autorização por rota |
| Logout | Link de retorno ao login sem invalidação de sessão real | Implementar encerramento de sessão |
| Armazenamento | Dados/filtros/histórico globais e compartilhados | Banco de dados, isolamento e auditoria |
| Importação | Substitui base inteira; formato posicional e parsing simplificado | Validação por linha, deduplicação e parser CSV robusto |
| Datas | Ordenação de previsão usa composição textual inadequada; séries não separam anos | Datas normalizadas e testes de virada de ano/mês |
| Dashboard | Série 2025 é simulada; meses janeiro a maio fixos | Comparação baseada em históricos reais importados |
| Recebimentos | 300 lotes aleatórios independentes do CSV | Derivar lotes de transações e conciliar com fonte bancária |
| IA | Totais e período fixos coexistem com cálculos dinâmicos | Remover referências fixas e conferir contexto/resultado |
| Chat | GET sem pergunta também pode chamar IA; histórico global não é conversa completa | Separar leitura de histórico de geração, limitar e isolar contexto |
| Interface | Uso de `innerHTML` com conteúdo dinâmico | Escapar/sanitizar entradas e respostas antes de renderizar |
| Infraestrutura | Sem configuração de produção, backup ou limitação de requisições | Segurança de acesso, limites, monitoramento e recuperação |
| Bibliotecas | Chart.js carregado por URL sem versão fixa | Fixar e validar versão da dependência |
| Funcionalidades planejadas | Cadastro, permissões e integrações externas sem implementação correspondente | Implementar por etapas com critérios de aceitação |

## Prioridade de evolução

1. Tornar entrada de dados e telas seguras, com autenticação e sessões individuais.
2. Substituir referências de demonstração por cálculos consistentes sobre a mesma base.
3. Adicionar persistência, validação de CSV e testes de regras financeiras.
4. Melhorar tratamento de erro, histórico e contexto da IA.
5. Implementar integrações com provedores apenas após definir contratos de dados e testes.

A preparação deste pacote não implementou esse roteiro. As adaptações limitadas para publicação estão no [CHANGELOG](../CHANGELOG.md).
