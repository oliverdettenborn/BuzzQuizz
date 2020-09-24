var quizzJogando = [];
var acertos = 0;
var numeroPeguntaAtual = 0;
var perguntasQuizz = [];
var niveisQuizz = [];

function jogarEsseQuizz(quizzSelecionado){
    quizzJogando = quizzSelecionado;
    perguntasQuizz = quizzJogando.data.perguntas;
    niveisQuizz = quizzJogando.data.niveis;

    renderizarJogo();
}

function renderizarJogo(){
    var divPai = document.querySelector('#tela-jogar #divPai');
    
    var titulo = renderizarTitulo();
    divPai.appendChild(titulo);

    var container = document.createElement('div');
    container.classList.add('container');

    var pergunta = renderizarPergunta();
    container.appendChild(pergunta);

    var arrayRespostas = perguntasQuizz[numeroPeguntaAtual].respostas;
    console.log(arrayRespostas,perguntasQuizz[numeroPeguntaAtual]);
    var arrayElementoHTML= [];

    for(var i = 0; i < arrayRespostas.length; i++){
        var opcaoDeResposta = renderizarRespostas(arrayRespostas[i]);
        arrayElementoHTML.push(opcaoDeResposta);
    }

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

/* .correta .texto-resposta{
    background-color: #c0eebe;
}
.errada .texto-resposta{
    background-color: #ebaaac;
} */