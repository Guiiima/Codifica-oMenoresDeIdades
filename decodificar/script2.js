import * as service from "../database.js"; // Importa os serviços do banco de dados
const chave = "chaveDeEncriptacao123";
const dadosDescriptografados = [];
document.addEventListener("DOMContentLoaded", function () {
  function carregarConteudo() {
    service
      .recuperarDoBancoDeDados()
      .then(function (dadosEncriptados) {
        // Função de descriptografia
        function decryptData(ciphertext, key, iv) {
          var parsedIV = CryptoJS.enc.Hex.parse(iv);
          var decrypted = CryptoJS.AES.decrypt(ciphertext, key, {
            iv: parsedIV,
          });
          var decryptedData = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
          return decryptedData;
        }

        // Descriptografar dados e armazená-los no array
        var cpfDescriptografado = decryptData(
          dadosEncriptados.cpf.ciphertext,
          chave,
          dadosEncriptados.cpf.iv
        );
        var emailDescriptografado = decryptData(
          dadosEncriptados.email.ciphertext,
          chave,
          dadosEncriptados.email.iv
        );
        dadosDescriptografados.push({
          nomeCompleto: dadosEncriptados.nomeCompleto,
          dataNascimento: dadosEncriptados.dataNascimento,
          cpf: cpfDescriptografado,
          senha: dadosEncriptados.senha,
          nomeResponsavel: dadosEncriptados.nomeResponsavel,
          emailResponsavel: dadosEncriptados.emailResponsavel,
          telefoneResponsavel: dadosEncriptados.telefoneResponsavel,
          email: emailDescriptografado,
        });

        // Preencher a tabela com os dados descriptografados
        const tableBody = document.getElementById("table-body");
        dadosDescriptografados.forEach((dado) => {
          const row = document.createElement("tr");
          row.innerHTML = `
            <td>${dado.nomeCompleto}</td>
            <td>${dado.dataNascimento}</td>
            <td>${dado.cpf}</td>
            <td>${dado.senha}</td>
            <td>${dado.nomeResponsavel}</td>
            <td>${dado.emailResponsavel}</td>
            <td>${dado.telefoneResponsavel}</td>
            <td>${dado.email}</td>
        `;
          tableBody.appendChild(row);
        });
      })
      .catch(function (error) {
        console.log("Erro", error);
      });
  }
  carregarConteudo();
  const botaoTeste = document.getElementById("botaoTeste");
  botaoTeste.addEventListener("click", carregarConteudo);
});
