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

function deletarQuizz(id){
    axios.delete('https://mock-api.bootcamp.respondeai.com.br/api/v1/buzzquizz/quizzes/'+ id,{ headers: tokenUsuario}).then(processarSucessoExclusão);
}

function processarSucessoExclusão(){
    pegarMeusQuizz();
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
    var tituloQuizz = document.createElement('span');
    tituloQuizz.setAttribute('onclick','jogarQuizz(' + posicao +')');
    tituloQuizz.innerText = quizz.title;
    tituloQuizz.style.cursor = 'pointer';
    div.appendChild(tituloQuizz);

    var iconeDeletar = criarIconeDeletar(quizz.id);
    div.appendChild(iconeDeletar);

    containerQuizzes.appendChild(div);
}

function criarIconeDeletar(id){
    var iconeDeletar = document.createElement('ion-icon');
    iconeDeletar.setAttribute('name','trash-outline');
    iconeDeletar.setAttribute('onclick','deletarQuizz('+ id +')');
    return iconeDeletar;
}