var tokenUsuario = null;
var meusQuizz = [];

function salvarToken(token){
    tokenUsuario = {"User-Token": token};
}

function pegarMeusQuizz(){
    var requisicao = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v1/buzzquizz/quizzes',{ headers: tokenUsuario})
    requisicao.then(processarSucessoQuizz).catch(processarErroQuizz);
}

function processarSucessoQuizz(resposta){
    meusQuizz = resposta.data;
    renderizarMeusQuizz();
}

function processarErroQuizz(){
    window.location.reload();
}


// ----------------------------------------------------------------------------funções de renderização
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