# Uso seguro da demonstração

Use o projeto localmente e com dados fictícios. O login é ilustrativo, as rotas não possuem autorização completa e o contexto global é compartilhado. Publicar o código no GitHub não significa hospedar a aplicação com segurança.

Uma chave de API literal foi identificada no export acadêmico e removida da cópia pública. A chave original deve ser revogada/substituída na conta do provedor, especialmente se o export ou ZIP tiver sido compartilhado. Os arquivos originais não foram alterados por esta preparação.

Não publique arquivos de credenciais do Node-RED, `.env`, bases reais, logs de chat ou capturas com informações de clientes. O `.gitignore` auxilia o uso do Git local; ele não é um filtro automático para arquivos arrastados no site do GitHub, nem remove conteúdo já incluído em commits.

Sem `GROQ_API_KEY`, o motor continua disponível e a IA responde com um aviso de configuração. Com chave, perguntas e métricas são enviadas ao provedor. Nunca insira a chave no JSON para facilitar uma apresentação.

O pacote não inclui um canal privado de reporte de vulnerabilidades. Não publique credenciais ou dados sensíveis em issues. Antes de receber contribuições externas, o mantenedor deve definir um canal de contato apropriado.
