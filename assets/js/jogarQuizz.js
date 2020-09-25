var quizzJogando = [];
var acertos = 0;
var numeroPeguntaAtual = 0;
var perguntasQuizz = [];
var niveisQuizz = [];
var respostaCerta = null;
var acertos = 0;

function jogarEsseQuizz(quizzSelecionado){
    quizzJogando = quizzSelecionado;
    perguntasQuizz = quizzJogando.data.perguntas;
    niveisQuizz = quizzJogando.data.niveis;

    renderizarJogo();
}
//---------------------------------------------------------------------------------- função de clique na opção
function verficarRespostaCorreta(elementoClicado){
    var textoClicado = elementoClicado.querySelector('.texto-resposta');
    var respostaEscolhida = textoClicado.getAttribute('data-name');

    if(respostaEscolhida === respostaCerta) acertos++;

    mudarCorCaixaOpcao();
    verificarFinalDoJogo();
}

function mudarCorCaixaOpcao(){
    var opcoes = document.querySelectorAll('#tela-jogar .opcao .texto-resposta');

    for(var i = 0; i < opcoes.length; i++){
        var dataName = opcoes[i].getAttribute('data-name');

        if(dataName === respostaCerta) opcoes[i].style.background = '#c0eebe';
        else opcoes[i].style.background = '#ebaaac';
    }
}

function verificarFinalDoJogo(){
    var terminouAsPerguntas = (numeroPeguntaAtual + 1) === perguntasQuizz.length;

    if(terminouAsPerguntas){
        finalJogo();
    }else{
        numeroPeguntaAtual++;
        setTimeout(renderizarJogo,2000);
    }
}


//--------------------------------------------------------------------- fim do quizz
function finalJogo(){
    var score = calcularScore();
    renderizarPontuacao(score);

    var nivelAtingido = verificarNivel(score);

    renderizarDescricaoNivel(nivelAtingido);

    resertarJogo();

}

function calcularScore(){
    var pontuação = Math.floor((acertos / perguntasQuizz.length * 100));
    return pontuação;
}

function verificarNivel(score){
    for(var i = 0; i < niveisQuizz.length; i++){
        var minimo = niveisQuizz[i]["acerto-minimo"];
        var maximo = niveisQuizz[i]["acerto-maximo"];
        if(minimo <= score && score <= maximo){
            return niveisQuizz[i];
        }
    }
}

function resertarJogo(){
    quizzJogando = [];
    acertos = 0;
    numeroPeguntaAtual = 0;
    perguntasQuizz = [];
    niveisQuizz = [];
    respostaCerta = null;
    acertos = 0;
}



//---------------------------------------------------------------------- renderização tela final
function renderizarPontuacao(score){
    renderizarBotaoHome();
    var caixaHeader = document.querySelector('#pergunta-atual');
    caixaHeader.innerHTML = "Você acertou " + acertos + ' de ' + perguntasQuizz.length + ' perguntas! <br>';
    caixaHeader.innerHTML += 'Score: ' + score + '%';
}

function renderizarBotaoHome(){
    var iconeHome = document.querySelector('#tela-jogar header ion-icon');
    iconeHome.setAttribute('onclick','trocarDeTela("#tela-jogar","#tela-usuario")');
    iconeHome.style.color = '#fff';

}

function renderizarDescricaoNivel(nivel){
    var caixaOpcoes= document.querySelector('#opcoes-resposta');
    caixaOpcoes.innerHTML = "";

    var caixaNivel = document.createElement('div');
    caixaNivel.classList.add('nivel-atingido');

    var tituloNivel = document.createElement('h3');
    tituloNivel.innerText = nivel.titulo;
    caixaNivel.appendChild(tituloNivel);

    var descricaoDoNivel = document.createElement('p');
    descricaoDoNivel.innerText = nivel.descricao;
    caixaNivel.appendChild(descricaoDoNivel);

    var imagemNivel = document.createElement('img');
    imagemNivel.classList.add('imagem-nivel')
    imagemNivel.setAttribute('src',nivel.link.toLowerCase());

    caixaOpcoes.appendChild(caixaNivel);
    caixaOpcoes.appendChild(imagemNivel);

}


//------------------------------------------------------------------------------------ renderização das perguntas
function renderizarJogo(){
    var divPai = document.querySelector('#tela-jogar #divPai');
    divPai.innerHTML = "";
    
    var titulo = renderizarTitulo();
    divPai.appendChild(titulo);

    var container = document.createElement('div');
    container.classList.add('container');

    var pergunta = renderizarPergunta();
    container.appendChild(pergunta);

    var arrayRespostas = perguntasQuizz[numeroPeguntaAtual].respostas;
    var arrayElementoHTML= [];

    for(var i = 0; i < arrayRespostas.length; i++){
        var opcaoDeResposta = renderizarRespostas(arrayRespostas[i]);
        arrayElementoHTML.push(opcaoDeResposta);
    }

    respostaCerta = arrayRespostas[0].resposta;

    //embaralhar a array de elementos HTML
    var arrayEmbaralhada = arrayElementoHTML.sort(comparador);
    var caixaTodasOpcoes = document.createElement('div');
    caixaTodasOpcoes.setAttribute('id','opcoes-resposta');

    for(var i = 0; i < arrayEmbaralhada.length; i++){
        caixaTodasOpcoes.appendChild(arrayEmbaralhada[i]);
    }

    container.appendChild(caixaTodasOpcoes);
    divPai.appendChild(container);
}

function renderizarTitulo(){
    var titulo = document.createElement('h2');
    titulo.setAttribute('id','titulo-quizz');
    titulo.innerText = quizzJogando.title;
    return titulo;
}

function renderizarPergunta(){
    var pergunta = document.createElement('div');
    pergunta.setAttribute('id','pergunta-atual');
    pergunta.innerText = (numeroPeguntaAtual + 1) + ". " + perguntasQuizz[numeroPeguntaAtual].titulo;
    return pergunta;
}

function renderizarRespostas(elemento){
    var caixaOpcao = document.createElement('div');
    caixaOpcao.setAttribute('class','opcao');
    caixaOpcao.setAttribute('onclick','verficarRespostaCorreta(this)');

    var imagem = document.createElement('img');
    imagem.setAttribute('src',elemento.link);
    caixaOpcao.appendChild(imagem);

    var textoResposta = document.createElement('div');
    textoResposta.classList.add('texto-resposta');
    textoResposta.innerText = elemento.resposta;
    textoResposta.setAttribute('data-name',elemento.resposta);
    caixaOpcao.appendChild(textoResposta);
    return caixaOpcao;
}