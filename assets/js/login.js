var usuario = {};
var botaoDesativado;

function entrar(button){
    var inputEmail = document.querySelector('#email');
    var email = inputEmail.value;

    var inputSenha = document.querySelector('#senha');
    var senha = inputSenha.value;

    verificarDadosDigitados(email,senha,button);
}

function verificarDadosDigitados(email,senha,button){
    if(email.length !== 0 && senha.length !== 0){
        usuario = {
            "email": email,
            "password": senha
        }
        toggleAtivacaoBotao(button,"desativar");
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
    salvarToken(resposta.data.token);
    trocarParaTelaUsuario();
}

function processarErroLogin(){
    toggleAtivacaoBotao(botaoDesativado,"ativar");
    alert("Email ou senha incorretos! Digite novamente seu email ou senha");
}

function trocarParaTelaUsuario(){
    var telaLogin = document.querySelector('#tela-login');
    telaLogin.style.display = "none";
}

function toggleAtivacaoBotao(botao,comando){
    if(comando === 'desativar'){
        botao.setAttribute('disabled','');
        botaoDesativado = botao;
    } 
    else if ('ativar') botaoDesativado.removeAttribute('disabled','');
}