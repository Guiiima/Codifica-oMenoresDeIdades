document.addEventListener('DOMContentLoaded', function () {
    // Máscara para o CPF
    var cpfInput = document.getElementById('cpf');
    cpfInput.addEventListener('input', function () {
        var cpf = cpfInput.value.replace(/\D/g, '');
        if (cpf.length > 11) {
            cpf = cpf.slice(0, 11);
        }
        cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
        cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
        cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        cpfInput.value = cpf;
    });

    // Máscara para o telefone
    var telefoneInput = document.getElementById('telefoneResponsavel');
    telefoneInput.addEventListener('input', function () {
        var telefone = telefoneInput.value.replace(/\D/g, '');
        if (telefone.length > 11) {
            telefone = telefone.slice(0, 11);
        }
        telefone = telefone.replace(/^(\d{2})(\d)/g, '($1) $2');
        telefone = telefone.replace(/(\d)(\d{4})$/, '$1-$2');
        telefoneInput.value = telefone;
    });

    // Função para encriptar dados usando AES
    function encryptData(data, key) {
        var iv = CryptoJS.lib.WordArray.random(16); // IV aleatório
        var encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), key, { iv: iv });
        return {
            ciphertext: encrypted.toString(),
            iv: iv.toString()
        };
    }

    document.addEventListener('DOMContentLoaded', function () {
        // Criar o banco de dados
        var db = criarTabela();

        // Form submission handling
        document.getElementById('cadastroForm').addEventListener('submit', function (event) {
            event.preventDefault();

            // Get form values
            var nomeCompleto = document.getElementById('nomeCompleto').value;
            var dataNascimento = document.getElementById('dataNascimento').value;
            var cpf = document.getElementById('cpf').value;
            var nomeResponsavel = document.getElementById('nomeResponsavel').value;
            var emailResponsavel = document.getElementById('emailResponsavel').value;
            var telefoneResponsavel = document.getElementById('telefoneResponsavel').value;

            // Encriptar dados sensíveis
            var dadosEncriptados = {
                cpf: encryptData(cpf, "chaveDeEncriptacao123"),
                dataNascimento: encryptData(dataNascimento, "chaveDeEncriptacao123")
            };

            // Objeto preparado para ser enviado para o banco de dados
            var objetoParaBancoDeDados = {
                nomeCompleto: nomeCompleto,
                cpf: dadosEncriptados.cpf.ciphertext,
                dataNascimento: dadosEncriptados.dataNascimento.ciphertext,
                nomeResponsavel: nomeResponsavel,
                emailResponsavel: emailResponsavel,
                telefoneResponsavel: telefoneResponsavel
            };

            // Chamar a função para salvar no banco de dados, passando o banco de dados como parâmetro
            salvarNoBancoDeDados(db, objetoParaBancoDeDados);

            // Clear form fields
            this.reset();
        });
    });

});
