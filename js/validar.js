//criando os objetos dos elementos de texto do form

var nome = document.querySelector("#inputName");
var nomeHelp = document.querySelector("#inputNameHelp");

var ano = document.querySelector("#inputYear");
var anoHelp = document.querySelector("#inputYearHelp");

var email = document.querySelector("#inputEmail");
var emailHelp = document.querySelector("#inputEmailHelp");

var pw = document.querySelector("#inputPassword");
var pwHelp = document.querySelector("#inputPasswordHelp");


/*declarando o evento listener para o campos de texto do form. 
Uma vez o foco do campo inputName mude, será chamada a função validarNome*/
nome.addEventListener('focusout', validarNome);
ano.addEventListener('focusout', validarAno)
email.addEventListener('focusout', validarEmail)
pw.addEventListener('focusout', validarSenha)



/*declaração tradicional de função validarNome(e)
'e' é o objeto do tipo evento que contém, alpem de outras propriedades, o objeto que iniciou o evento,
neste caso o objeto 'nome'
*/

function validarNome(e){ 
    //declaração da expressão regular para definir o formato de um nome válido
    const regexNome = /^[A-Z][a-z]+ [A-Z][a-z]+$/;
    const nome = e.target.value.trim();

    console.log(e); //impressão em console do objeto evento e
    console.log(e.target.value); //impressão em console do valor do objeto 'nome' que originou o evento   

    if(nome.match(regexNome)==null || nome.length <= 6){
        //muda o conteúdo e o estilo do objeto nomeHelp que referencia o elemento html com id=inputNameHelp
        nomeHelp.textContent = "Formato de nome inválido"; 
        nomeHelp.style.color="red";
    }
    else{
        nomeHelp.textContent = "";
    }       
}

/*declarando o evento listener para o campos de texto do form. 
Uma vez o foco seja mudado, será chamada a função validarNome*/

//declaração de função de forma anônima usando uma expressão de função de seta =>

function validarAno(e){
    //declaração da expressão regular para definir o formato de um ano válido
    const regexAno = /^[0-9]{4}$/;
    //tirar (trim) espaços em branco antes e depois da string
    const anoTrimado = e.target.value.trim();
    console.log(e.target.value);

    if(anoTrimado.match(regexAno)==null){
        //muda o conteúdo e o estilo do objeto nomeHelp que referencia o elemento html com id=inputYearHelp
        anoHelp.textContent = "Formato de ano inválido";
        anoHelp.style.color="red";
    }
    else{
        //objeto Date
        var date = new Date();
        //obtem o ano atual
        console.log(date.getFullYear()); 
        
        if( parseInt(anoTrimado) > parseInt(date.getFullYear()) ){
             //muda o conteúdo e o estilo do objeto nomeHelp que referencia o elemento html com id=inputYearHelp
            anoHelp.textContent = `Ano inválido. O ano não pode ser maior que ${date.getFullYear()}.`;
            anoHelp.style.color="red";
        }
        else if( parseInt(anoTrimado) < parseInt(date.getFullYear())-120 ){
             //muda o conteúdo e o estilo do objeto nomeHelp que referencia o elemento html com id=inputYearHelp
            anoHelp.textContent = `Ano inválido. O ano não pode ser menor que ${date.getFullYear()-120}.`;
            anoHelp.style.color="red";
        }
        else{
            anoHelp.textContent="";
        }        
        
    }
}

function validarEmail(e){
    // Definição da expressão regular para definir o formato do email
    const regexEmail = /^\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.(br|com|org|net)\b$/;
    const emailTrimado = e.target.value.trim();
    console.log(e.target.value);

    if(emailTrimado.match(regexEmail)==null){
        //muda o conteúdo e o estilo do objeto nomeHelp que referencia o elemento html com id=inputEmailHelp
        emailHelp.textContent = "Formato de email inválido";
        emailHelp.style.color="red";
    }
    else{
        emailHelp.textContent = "";
    }   
}

function validarSenha(e){
    const regexSenha = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[@#%&!+])[A-Za-z0-9@#%&!+]{6,20}$/;
    
    const senha = e.target.value.trim();
    
    const nome = document.querySelector("#inputName").value.trim().toLowerCase();
    const ano = document.querySelector("#inputYear").value.trim();
   
    console.log(senha);
    console.log(nome);
    console.log(ano);
    
    // Verifica se a senha atende aos critérios de complexidade
    if (!regexSenha.test(senha)) {
        pwHelp.textContent = "Senha inválida. Certifique-se de que a senha tem entre 6 e 20 caracteres, contém números, letras e caracteres especiais [@#%&!+].";
        pwHelp.style.color = "red";
        return;
    } else {
        pwHelp.textContent = "";
    }

    // Verifica se a senha contém o nome ou o ano de nascimento
    if (senha.toLowerCase().includes(nome) || senha.includes(ano)) {
        pwHelp.textContent = "A senha não deve conter seu nome ou ano de nascimento.";
        pwHelp.style.color = "red";
        return;
    }

     // Avalia a força da senha
     let forca = 0;
     const possuiEspecial = /[@#%&!+]/.test(senha);
     const possuiNumero = /[0-9]/.test(senha);
     const possuiLetraMaiuscula = /[A-Z]/.test(senha);
     const possuiMaisEspeciais = (senha.match(/[@#%&!+]/g) || []).length > 1;
     const possuiMaisNumeros = (senha.match(/[0-9]/g) || []).length > 1;
     const possuiMaisMaiusculas = (senha.match(/[A-Z]/g) || []).length > 1;
 
     // Define o nível de força da senha
     if (senha.length >= 6 && possuiEspecial && possuiNumero) {
         forca = 10; // Base para senhas válidas
         if (senha.length >= 8 && possuiLetraMaiuscula) {
             forca = 20;
         }
         if (senha.length > 12 && possuiMaisEspeciais && possuiMaisNumeros && possuiMaisMaiusculas) {
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
}
