var usuario = {};
var botaoEntrar;

function entrar(button){
    botaoEntrar = button;
    var inputEmail = document.querySelector('#email');
    var email = inputEmail.value;

    var inputSenha = document.querySelector('#senha');
    var senha = inputSenha.value;

    verificarDadosDigitados(email,senha);
}

function verificarDadosDigitados(email,senha){
    if(email.length !== 0 && senha.length !== 0){
        usuario = {
            "email": email,
            "password": senha
        }
        botaoEntrar.setAttribute('disabled','');
        enviarUsuario();
    }else{
        alert("Você precisa inserir um email ou senha válidos");

    }
}

function pressionarEnter(button){
    codekey = event.keyCode;
    console.log("enter");
    if (codekey === 13){
        entrar(button);
    }
}

function enviarUsuario(){
    axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v1/buzzquizz/users',usuario).then(processarSucessoLogin).catch(processarErroLogin);
}

function processarSucessoLogin(resposta){
    botaoEntrar.removeAttribute('disabled','');
    salvarToken(resposta.data.token);

    var telaLogin = document.querySelector('#tela-login');
    telaLogin.style.display = "none";
}

function processarErroLogin(){
    botaoEntrar.removeAttribute('disabled','');
    alert("Email ou senha incorretos! Digite novamente seu email ou senha");
}