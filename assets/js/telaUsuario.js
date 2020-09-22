var tokenUsuario = null;

function salvarToken(token){
    tokenUsuario = {"User-Token": token};
}

function pegarMeusQuizz(){
    var requisicao = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v1/buzzquizz/quizzes',{ headers: tokenUsuario})
    requisicao.then(processarSucessoQuizz).catch(processarErroQuizz);
}

function processarSucessoQuizz(resposta){
    console.log(resposta);
}

function processarErroQuizz(resposta){
    window.location.reload();
}

/* <div class="quizz">lalala</div> */
