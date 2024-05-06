// Função para criar o banco de dados e a tabela, se ainda não existirem
function criarTabela() {
  // Criar o banco de dados em memória
  var db = new SQL.Database();

  // Criar a tabela, se não existir
  db.run("CREATE TABLE IF NOT EXISTS dados (Nome TEXT NOT NULL, Nasc DATE NOT NULL, CPF TEXT UNIQUE NOT NULL, Senha TEXT NOT NULL, NomeResponsavel TEXT NOT NULL, EmailResponsavel TEXT NOT NULL, TelefoneResponsavel TEXT)");

  return db;
}

// Função para inserir dados no banco de dados
function salvarNoBancoDeDados(db, objeto) {
  // Construir a consulta SQL
  var sql = "INSERT INTO dados (Nome, Nasc, CPF, Senha, NomeResponsavel, EmailResponsavel, TelefoneResponsavel) VALUES (?, ?, ?, ?, ?, ?, ?)";
  // Executar a consulta SQL com os parâmetros
  db.run(sql, [objeto.nomeCompleto, objeto.dataNascimento, objeto.cpf, objeto.senha, objeto.nomeResponsavel, objeto.emailResponsavel, objeto.telefoneResponsavel], function (err) {
      if (err) {
          console.error('Erro ao gravar no banco de dados:', err.message);
      } else {
          console.log('Sucesso ao gravar no banco de dados');
      }
  });
function recuperarDoBancoDeDados(db, callback) {
    var sql = "SELECT * FROM dados";
    db.all(sql, [], function(err, rows) {
      if (err) {
        console.error('Erro ao recuperar dados do banco de dados:', err.message);
        callback(err, null);
      } else {
        console.log('Dados recuperados do banco de dados com sucesso');
        callback(null, rows);
      }
    });
  }
}

