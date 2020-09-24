var tokenUsuario = null;
// var contentType = {"Content-Type": "application/json"}
var meusQuizz = [];


// ----------------------------------------------------------------funções de comunicação server

function salvarToken(token){
    tokenUsuario = {"User-Token": token};
}

function pegarMeusQuizz(){
    var requisicao = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v1/buzzquizz/quizzes',{ headers: tokenUsuario});
    requisicao.then(processarSucessoQuizz).catch(processarErroQuizz);
}

function processarSucessoQuizz(resposta){
    meusQuizz = resposta.data;
    renderizarMeusQuizz();
}

function processarErroQuizz(){
    window.location.reload();
}

function enviarQuizz(quizz){
    var requisicao = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v1/buzzquizz/quizzes',quizz,{ headers: tokenUsuario});
    requisicao.then(processarSucessoEnvioQuizz).catch(processarErroEnvioQuizz);
}

function processarSucessoEnvioQuizz(){
    pegarMeusQuizz();
    trocarDeTela("#tela-criacao","#tela-usuario");
}

function processarErroEnvioQuizz(erro){
    alert('Tivemos um problema em enviar seu Quizz, por favor refaça o quizz');
}

// -----------------------------------------------------------------------------funções onclick
function criarQuizz(){
    renderizarPerguntas();
    renderizarNiveis();
    trocarDeTela("#tela-usuario","#tela-criacao");
}

function jogarQuizz(id){}


// -----------------------------------------------------------------------funções de renderização
function renderizarMeusQuizz(){
    for(var i = 0; i < meusQuizz.length; i++) renderizarQuizz(meusQuizz[i]);
}

function renderizarQuizz(quizz){
    var div = document.createElement('div');
    div.classList.add('quizz');
    div.setAttribute('onclick','jogarQuizz(' + quizz.id +')');
    div.innerText = quizz.title;

    var containerQuizzes = document.querySelector('#tela-usuario div.container');
    containerQuizzes.appendChild(div);
}