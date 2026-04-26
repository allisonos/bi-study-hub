// ═══════════════════════════════════════════════════════════════
//  Pague Menos Academy — Quizzes
// ═══════════════════════════════════════════════════════════════

export const quizzes = [
  // ── Power BI ──
  {
    id: 'pbi-m1-quiz', moduleId: 'pbi-m1', title: 'Quiz: Introdução ao Power BI',
    questions: [
      { id: 'q1', question: 'Qual é a ferramenta gratuita do Power BI para desktop?', options: ['Power BI Service', 'Power BI Desktop', 'Power BI Mobile', 'Power BI Report Server'], correct: 1, explanation: 'Power BI Desktop é a ferramenta gratuita para criação de relatórios.' },
      { id: 'q2', question: 'Qual formato de arquivo o Power BI salva por padrão?', options: ['.xlsx', '.pbix', '.csv', '.pbi'], correct: 1, explanation: 'Arquivos Power BI usam a extensão .pbix.' },
      { id: 'q3', question: 'Para importar dados de um banco SQL, usa-se:', options: ['Obter Dados → SQL Server', 'Arquivo → Abrir', 'Inserir → Tabela', 'Exibir → SQL'], correct: 0, explanation: 'Obter Dados → SQL Server é o caminho correto.' },
      { id: 'q4', question: 'O que é o Power Query?', options: ['Um visual de gráfico', 'Um editor de transformação de dados', 'Um tipo de filtro', 'Uma linguagem DAX'], correct: 1, explanation: 'Power Query é o editor ETL do Power BI.' },
      { id: 'q5', question: 'Qual painel mostra os campos das tabelas importadas?', options: ['Filtros', 'Campos', 'Visualizações', 'Páginas'], correct: 1, explanation: 'O painel Campos lista todas as tabelas e colunas.' },
    ],
  },
  {
    id: 'pbi-m3-quiz', moduleId: 'pbi-m3', title: 'Quiz: DAX Essencial',
    questions: [
      { id: 'q1', question: 'Qual a diferença entre Medida e Coluna Calculada?', options: ['Medida é estática, coluna é dinâmica', 'Medida calcula em tempo de consulta, coluna em importação', 'São a mesma coisa', 'Coluna é para gráficos, medida para tabelas'], correct: 1, explanation: 'Medidas são avaliadas em tempo de consulta, colunas na importação.' },
      { id: 'q2', question: 'CALCULATE modifica:', options: ['O visual', 'O contexto de filtro', 'A tabela', 'O relacionamento'], correct: 1, explanation: 'CALCULATE altera o contexto de filtro da expressão.' },
      { id: 'q3', question: 'TOTALYTD calcula:', options: ['Total do mês', 'Total acumulado no ano', 'Total geral', 'Total do dia'], correct: 1, explanation: 'TOTALYTD calcula o acumulado desde o início do ano.' },
      { id: 'q4', question: 'Para criar uma medida, usa-se:', options: ['Coluna Calculada', 'Nova Medida', 'Nova Tabela', 'Power Query'], correct: 1, explanation: 'Nova Medida cria uma medida DAX.' },
      { id: 'q5', question: 'SAMEPERIODLASTYEAR retorna:', options: ['O próximo ano', 'O mesmo período do ano anterior', 'A soma dos anos', 'O primeiro dia do ano'], correct: 1, explanation: 'Retorna as datas correspondentes ao mesmo período do ano anterior.' },
    ],
  },

  // ── Python ──
  {
    id: 'py-m1-quiz', moduleId: 'py-m1', title: 'Quiz: Fundamentos Python',
    questions: [
      { id: 'q1', question: 'Como declarar uma variável em Python?', options: ['var x = 10', 'int x = 10', 'x = 10', 'let x = 10'], correct: 2, explanation: 'Python usa tipagem dinâmica: x = 10.' },
      { id: 'q2', question: 'Qual estrutura repete um bloco N vezes?', options: ['if', 'while', 'for', 'def'], correct: 2, explanation: 'for ... in range(N) repete N vezes.' },
      { id: 'q3', question: 'type(3.14) retorna:', options: ['int', 'str', 'float', 'number'], correct: 2, explanation: '3.14 é um número de ponto flutuante (float).' },
      { id: 'q4', question: 'def define:', options: ['Uma variável', 'Uma classe', 'Uma função', 'Um módulo'], correct: 2, explanation: 'def é a keyword para definir funções.' },
      { id: 'q5', question: 'print("Olá"[0]) retorna:', options: ['O', 'Olá', 'l', 'Erro'], correct: 0, explanation: 'Strings são indexadas: posição 0 = "O".' },
    ],
  },
  {
    id: 'py-m2-quiz', moduleId: 'py-m2', title: 'Quiz: Pandas Essencial',
    questions: [
      { id: 'q1', question: 'pd.read_csv() faz o quê?', options: ['Salva um CSV', 'Lê um CSV para DataFrame', 'Converte para JSON', 'Imprime o CSV'], correct: 1, explanation: 'read_csv importa dados CSV para um DataFrame.' },
      { id: 'q2', question: 'df.head(3) retorna:', options: ['3 últimas linhas', '3 primeiras linhas', 'Resumo estatístico', '3 colunas'], correct: 1, explanation: 'head(n) mostra as primeiras n linhas.' },
      { id: 'q3', question: 'Para filtrar idade > 25:', options: ['df.filter(idade>25)', 'df[df["idade"]>25]', 'df.where(25)', 'df.select(idade>25)'], correct: 1, explanation: 'Indexação booleana: df[condição].' },
      { id: 'q4', question: 'groupby("loja")["vendas"].sum() retorna:', options: ['Soma total', 'Soma por loja', 'Média por loja', 'Contagem'], correct: 1, explanation: 'GroupBy agrupa por loja e sum() soma.' },
      { id: 'q5', question: 'df.shape retorna:', options: ['Tipos', 'Colunas', '(linhas, colunas)', 'Índice'], correct: 2, explanation: 'shape retorna tupla (n_rows, n_cols).' },
    ],
  },

  // ── SQL ──
  {
    id: 'sql-m1-quiz', moduleId: 'sql-m1', title: 'Quiz: Fundamentos SQL',
    questions: [
      { id: 'q1', question: 'Qual cláusula filtra linhas?', options: ['SELECT', 'FROM', 'WHERE', 'ORDER BY'], correct: 2, explanation: 'WHERE filtra as linhas.' },
      { id: 'q2', question: 'ORDER BY nome ASC ordena:', options: ['Decrescente', 'Alfabética/crescente', 'Aleatório', 'Por ID'], correct: 1, explanation: 'ASC = ordem crescente/alfabética.' },
      { id: 'q3', question: 'COUNT(*) retorna:', options: ['Soma dos valores', 'Número de linhas', 'Média', 'Valor máximo'], correct: 1, explanation: 'COUNT(*) conta o total de linhas.' },
      { id: 'q4', question: 'LIMIT 10 faz o quê?', options: ['Filtra 10 colunas', 'Retorna apenas 10 linhas', 'Agrupa em 10', 'Soma 10 valores'], correct: 1, explanation: 'LIMIT restringe o resultado a N linhas.' },
      { id: 'q5', question: 'Qual a ordem correta?', options: ['FROM, SELECT, WHERE', 'SELECT, FROM, WHERE', 'WHERE, SELECT, FROM', 'SELECT, WHERE, FROM'], correct: 1, explanation: 'SELECT → FROM → WHERE é a ordem padrão.' },
    ],
  },
  {
    id: 'sql-m2-quiz', moduleId: 'sql-m2', title: 'Quiz: JOINs e Agregações',
    questions: [
      { id: 'q1', question: 'INNER JOIN retorna:', options: ['Tudo da esquerda', 'Tudo da direita', 'Apenas com match', 'Tudo'], correct: 2, explanation: 'INNER JOIN retorna apenas registros com correspondência.' },
      { id: 'q2', question: 'LEFT JOIN sem match preenche com:', options: ['Zero', 'Vazio', 'NULL', 'Erro'], correct: 2, explanation: 'Campos sem correspondência = NULL.' },
      { id: 'q3', question: 'GROUP BY é usado com:', options: ['WHERE', 'Funções de agregação', 'ORDER BY apenas', 'LIMIT'], correct: 1, explanation: 'GROUP BY agrupa para funções como SUM, COUNT.' },
      { id: 'q4', question: 'HAVING filtra:', options: ['Linhas antes do GROUP BY', 'Grupos após agregação', 'Colunas', 'Tabelas'], correct: 1, explanation: 'HAVING filtra os resultados agrupados.' },
      { id: 'q5', question: 'CROSS JOIN gera:', options: ['Produto cartesiano', 'Apenas matches', 'Apenas NULLs', 'União de tabelas'], correct: 0, explanation: 'CROSS JOIN combina todas as linhas.' },
    ],
  },
];

export const getQuizById = (id) => quizzes.find(q => q.id === id);
