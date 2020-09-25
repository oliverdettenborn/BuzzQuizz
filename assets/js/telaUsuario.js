var tokenUsuario = null;
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

function jogarQuizz(indice){
    jogarEsseQuizz(meusQuizz[indice]);
    trocarDeTela("#tela-usuario",'#tela-jogar');
}


// -----------------------------------------------------------------------funções de renderização
function renderizarMeusQuizz(){
    var containerQuizzes = document.querySelector('#tela-usuario div.container');
    containerQuizzes.innerHTML = '';
    containerQuizzes.innerHTML = "<div id='criar-quizz' onclick='criarQuizz()'>Novo Quizz<ion-icon name='add-circle'></ion-icon></div>";
    for(var i = 0; i < meusQuizz.length; i++) renderizarQuizz(meusQuizz[i],i,containerQuizzes);
}

function renderizarQuizz(quizz,posicao,containerQuizzes){
    var div = document.createElement('div');
    div.classList.add('quizz');
    div.setAttribute('onclick','jogarQuizz(' + posicao +')');
    div.innerText = quizz.title;

    containerQuizzes.appendChild(div);
}