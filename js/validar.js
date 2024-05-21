var nome = document.querySelector("#inputName");
var nomeHelp = document.querySelector("#inputNameHelp");

var ano = document.querySelector("#inputYear");
var anoHelp = document.querySelector("#inputYearHelp");

var email = document.querySelector("#inputEmail");
var emailHelp = document.querySelector("#inputEmailHelp");

var pw = document.querySelector("#inputPassword");
var pwHelp = document.querySelector("#inputPasswordHelp");

var botao = document.querySelector(".btn-primary");
var resultado = document.querySelector("#inputResult");


nome.addEventListener('focusout', (e) => validarNome(e.target.value));
ano.addEventListener('focusout', (e) => validarAno(e.target.value));
email.addEventListener('focusout', (e) => validarEmail(e.target.value));
pw.addEventListener('focusout', (e) => validarSenha(e.target.value));

botao.addEventListener("click", validarFormulario);

function validarNome(nome) { 
    const regexNome = /^[A-Z][a-z]+(?: [A-Z][a-z]+)*$/;
    const nomeTrimado = nome.trim();

    if(nomeTrimado.match(regexNome) == null || nomeTrimado.length < 6 || nomeTrimado.length > 30){
        nomeHelp.textContent = "Nome inválido"; 
        nomeHelp.style.color = "red";
        return false;
    } else {
        nomeHelp.textContent = "";
        return true;
    }       
}

function validarAno(ano) {
    const regexAno = /^[0-9]{4}$/;
    const anoTrimado = ano.trim();
    const date = new Date();

    if(anoTrimado.match(regexAno) == null){
        anoHelp.textContent = "Ano inválido";
        anoHelp.style.color = "red";
        return false;
    } else if(parseInt(anoTrimado) > date.getFullYear() || parseInt(anoTrimado) < date.getFullYear() - 120) {
        anoHelp.textContent = `Ano inválido. Deve ser entre ${date.getFullYear() - 120} e ${date.getFullYear()}.`;
        anoHelp.style.color = "red";
        return false;
    } else {
        anoHelp.textContent = "";
        return true;
    }
}

function validarEmail(email) {
    const regexEmail = /^\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.(br|com|org|net)\b$/;
    const emailTrimado = email.trim();

    if(emailTrimado.match(regexEmail) == null){
        emailHelp.textContent = "Formato de email inválido";
        emailHelp.style.color = "red";
        return false;
    } else {
        emailHelp.textContent = "";
        return true;
    }   
}

function validarSenha(senha) {
    const regexSenha = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[@#%&!+])[A-Za-z0-9@#%&!+]{6,20}$/;
    const senhaTrimada = senha.trim();
    const nome = document.querySelector("#inputName").value.trim().toLowerCase();
    const ano = document.querySelector("#inputYear").value.trim();

    if (!regexSenha.test(senhaTrimada) || (nome && senhaTrimada.toLowerCase().includes(nome)) || (ano && senhaTrimada.includes(ano))) {
        pwHelp.textContent = "Senha inválida";
        pwHelp.style.color = "red";
        document.getElementById('passStrengthMeter').value = 0;
        return false;
    } else {
        pwHelp.textContent = "";
        let forca = 0;
        const possuiEspecial = /[@#%&!+]/.test(senhaTrimada);
        const possuiNumero = /[0-9]/.test(senhaTrimada);
        const possuiLetraMaiuscula = /[A-Z]/.test(senhaTrimada);
        const possuiMaisEspeciais = (senhaTrimada.match(/[@#%&!+]/g) || []).length > 1;
        const possuiMaisNumeros = (senhaTrimada.match(/[0-9]/g) || []).length > 1;
        const possuiMaisMaiusculas = (senhaTrimada.match(/[A-Z]/g) || []).length > 1;

        if (senhaTrimada.length >= 6 && possuiEspecial && possuiNumero) {
            forca = 10;
            if (senhaTrimada.length >= 8 && possuiLetraMaiuscula) {
                forca = 20;
            }
            if (senhaTrimada.length > 12 && possuiMaisEspeciais && possuiMaisNumeros && possuiMaisMaiusculas) {
                forca = 30;
            }
        }

        document.getElementById('passStrengthMeter').value = forca;

        if (forca === 10) {
            pwHelp.textContent = "Senha fraca.";
            pwHelp.style.color = "red";
        } else if (forca === 20) {
            pwHelp.textContent = "Senha moderada.";
            pwHelp.style.color = "orange";
        } else if (forca === 30) {
            pwHelp.textContent = "Senha forte.";
            pwHelp.style.color = "green";
        } else {
            pwHelp.textContent = "";
            pwHelp.style.color = "";
        }
        return true;
    }
}

function validarFormulario() {
    const nomeValido = validarNome(nome.value);
    const anoValido = validarAno(ano.value);
    const emailValido = validarEmail(email.value);
    const senhaValida = validarSenha(pw.value);

    if (nomeValido && anoValido && emailValido && senhaValida) {
        resultado.textContent = "Seus dados foram registrados";
        resultado.style.color = "green";
    } else {
        resultado.textContent = "Seus dados não foram registrados";
        resultado.style.color = "red";
    }
}
