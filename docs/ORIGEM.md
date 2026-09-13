# Origem dos arquivos e critérios de documentação

## Material estudado

| Material acadêmico | Tratamento neste pacote |
| --- | --- |
| `concicredi.json` | Export inicial com sete abas e consultor ainda incompleto; estudado, não duplicado no pacote |
| `concicredi.txt` | Conteúdo idêntico, byte a byte, ao `concicredi.json`; não duplicado |
| `concicred2.json` | Export intermediário com configuração Groq, ainda sem caminho completo do chat; estudado |
| `Relato de projeto NODE-RED.zip` | Aberto para examinar o JSON e o relato internos; ZIP original não incluído |
| `concicred3.json` dentro do ZIP | Base selecionada por reunir upload habilitado, rota do consultor, chamada API e chat |
| `Relato de desenvolvimento de IA - nodered.docx` dentro do ZIP | Usado para contexto e confrontado com o código; texto e capturas originais não republicados integralmente |
| `Teste_importacao.csv - Página1.csv` | Fornecido posteriormente e confirmado pelo autor como fictício; preservado em `examples/vendas-750-origem.csv` e convertido em `examples/vendas-750.csv` |
| `PROJETO_Modelagem_Arquitetura_Software.docx` | Base para atores, casos de uso, classes e contexto do problema |
| `Protótipo telas sistema ConciCred.docx` | Base para telas e navegação inicial; cinco imagens extraídas sem alteração |
| `PROJETO_Protótipo_Alta_Fidelidade_e_BPMN_TO-BE.docx` | Base para evolução visual, processo proposto e aprendizados |
| `BPMN_TO-BE.pdf` | Relatório final de nove páginas, e não apenas um diagrama; conteúdo e imagens examinados |
| `diagrama bpmn.png` | Processo anterior preservado como `bpmn-as-is.png` |
| `Diagrama BPMN TO-BE (projeto).drawio.png` | Imagem original com metadados de edição preservada |
| `Diagrama de Caso de Uso - Projeto.pdf` | Preservado como `casos-de-uso.pdf` |
| `Diagrama de Classe UML - projeto.pdf` | Preservado como `classes.pdf` |
| `Diagrama modelo C1 - projeto.pdf` | Preservado como `contexto-c4.pdf` |
| `Diagrama modelo C1.pdf` | Exemplo sobre passagens aéreas; não pertence ao ConciCred e foi excluído da publicação |
| `Diagrama de Classe UML - exercício.pdf` | Exercício de empréstimos/biblioteca; excluído da publicação |

Os nomes de versões indicam uma sequência plausível, e o conteúdo sustenta a seleção da terceira versão como a mais completa entre as fornecidas. Não foram encontrados histórico Git, registro do ambiente de execução original ou arquivo de dependências que permitam reconstituir exatamente cada etapa. Um CSV fictício foi acrescentado pelo autor durante a preparação deste pacote.

## Rastreabilidade do código

SHA-256 do `concicred3.json` extraído do ZIP antes das adaptações:

```text
f8a0a8a481c536f52a0ba9b286b201af2a9dc696cd48743ed9ba85fd0c3919dd
```

O arquivo publicado foi formatado e adaptado conforme o [CHANGELOG](../CHANGELOG.md). A presença do hash identifica a origem; não recomenda publicar o original, que contém a chave literal.

## Imagens e documentos

Os PDFs de modelagem e as imagens dos protótipos iniciais foram preservados. Capturas de execução com outras bases financeiras e documentos acadêmicos completos ficaram fora do pacote público. A imagem de fundo externa do login/menu foi retirada do fluxo preparado, pois os materiais não fornecem uma licença de redistribuição desse recurso.

Os diagramas representam modelagem acadêmica, não garantias de funcionalidades ou conformidade de notação. Afirmações como “sem alucinar”, “conciliação 100% automática” e economia de horas foram tratadas como intenções/relatos, sem apresentá-las como resultados medidos.
