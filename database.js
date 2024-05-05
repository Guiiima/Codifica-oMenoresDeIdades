const sqlite3 = require('sqlite3').verbose();

// Abrindo uma conexão com o banco de dados
let db = new sqlite3.Database('dados.db');

// Criação da tabela se ela ainda não existir
db.serialize(function() {
  db.run("CREATE TABLE IF NOT EXISTS dados (Nome TEXT NOT NULL, Nasc DATE NOT NULL, CPF TEXT UNIQUE NOT NULL, Senha TEXT NOT NULL, NomeResponsavel TEXT NOT NULL, EmailResponsavel TEXT NOT NULL, TelefoneResponsavel TEXT)");
});

// Função para inserir dados no banco de dados
function salvarNoBancoDeDados(objeto) { 
  db.serialize(function () {
      let stmt = db.prepare("INSERT INTO cadastros (Nome, Nasc, CPF, Senha, NomeResponsavel, EmailResponsavel, TelefoneResponsavel) VALUES (?, ?, ?, ?, ?, ?, ?)");
      stmt.run(objeto.nomeCompleto, objeto.dataNascimento, objeto.cpf, objeto.senha, objeto.nomeResponsavel, objeto.emailResponsavel, objeto.telefoneResponsavel, function (err) {
          if (err) {
              console.error('Erro ao gravar no banco de dados:', err.message);
          } else {
              console.log('Sucesso ao gravar no banco de dados');
          }
      });
      stmt.finalize();
  });
}

// Exportando a função para ser utilizada em outros arquivos
module.exports = { salvarNoBancoDeDados };
