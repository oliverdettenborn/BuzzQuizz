var qtdPerguntas = 1;
var qtdNiveis = 1;

//--------------------------------------------------------------- funções adição pergunta e nivel
function adicionarPergunta(){
    qtdPerguntas++;
    renderizarPerguntas();
}
function adicionarNivel(){
    qtdNiveis++;
    renderizarNiveis();
}

//------------------------------------------------------------ funções de verficação novo quizz
function publicarNovoQuizz(){
    var tituloQuizz = pegarValorInput('#titulo');
    if(tituloQuizz !== 'vazio'){
        tituloQuizz = removerEspaçosInicioFim(tituloQuizz);
        tituloQuizz = primeiraLetraEmMaiusculo(tituloQuizz);
        quizz.title = tituloQuizz;
    }else return;

    pegarPerguntas();

    
    // //pegar os dados do input dos niveis
    // pegarNiveis();
    //     removerEspaçosInicioFim();
    //     primeiraLetraEmMaiusculo();
    
    // enviarQuizz();

    //renderizar os quizz na tela do user
    //voltar a tela do user
}

//-------------------------------------------------------------------- funções de pagar dados digitados
var quizz = {
	"title": null,
	"data": {
        "perguntas": [],
        "niveis": []
    }
}

renderizarPerguntas();
renderizarNiveis();
// {
//     "perguntas": [{
//         "titulo": "Pergunta 1?",
//         "respostas": ["1", "2", "3", "4"]
//     }]
// }
function pegarPerguntas(){
    var numeroPergunta = 1;
    while(numeroPergunta <= qtdPerguntas){
        var identificadorCaixa = '#perguntas .item-lista:nth-child('+numeroPergunta+')';

        var pergunta = pegarValorInput(identificadorCaixa + ' .pergunta');
        pergunta = removerEspaçosInicioFim(pergunta);
        pergunta = primeiraLetraEmMaiusculo(pergunta);
    
        var respostas = pegarRespostas(identificadorCaixa);
    
        var verificacao = verificarPerguntas(pergunta);
    
        if(verificacao === true){
            var objetoPergunta = [{
                "titulo": pergunta,
                "repostas": respostas
            }];
            quizz.data.perguntas.push(objetoPergunta);
            console.log(quizz);
    
        }
    }
}
function pegarRespostas(identificadorCaixa){
    var arrayrespostas = [];

    var respostaCorreta = pegarValorInput(identificadorCaixa + ' .correta .resposta');
    respostaCorreta = removerEspaçosInicioFim(respostaCorreta);
    respostaCorreta = primeiraLetraEmMaiusculo(respostaCorreta);

    var linkCorreta = pegarValorInput(identificadorCaixa + ' .correta .link');
    linkCorreta = removerEspaçosInicioFim(linkCorreta);

    arrayrespostas.push({"respota": respostaCorreta,"link": linkCorreta});

    for(var i = 1; i <= 3; i++){
        var posicao = transformarParaClasse(i);

        var respostaErrada = pegarValorInput(identificadorCaixa + ' .errada'+ posicao +' .resposta');
        respostaErrada = removerEspaçosInicioFim(respostaErrada);
        respostaErrada = primeiraLetraEmMaiusculo(respostaErrada);

        var linkErrada = pegarValorInput(identificadorCaixa + ' .errada'+ posicao +' .link');
        linkErrada = removerEspaçosInicioFim(linkErrada);

        arrayrespostas.push({"respota": respostaErrada,"link": linkErrada});
    }
    return arrayrespostas;
}

function pegarNiveis(){

}

//------------------------------------------------------------------------- funções de renderizar
function renderizarPerguntas(){
    var caixaPergunta = document.createElement('div');
    caixaPergunta.classList.add('item-lista');

    var h3 = document.createElement('h3');
    h3.innerText = "Pergunta " + qtdPerguntas;
    caixaPergunta.appendChild(h3);

    var pergunta = criarCaixadeTexto('input','pergunta full','Digite a pergunta');
    caixaPergunta.appendChild(pergunta);

    var caixaOpcao1 = criarCaixaOpcao('opcao correta','correta');
    caixaPergunta.appendChild(caixaOpcao1);

    var caixaOpcao2 = criarCaixaOpcao('opcao errada um','errada 1');
    caixaPergunta.appendChild(caixaOpcao2);

    var caixaOpcao3 = criarCaixaOpcao('opcao errada dois','errada 2');
    caixaPergunta.appendChild(caixaOpcao3);

    var caixaOpcao4 = criarCaixaOpcao('opcao errada tres','errada 3');
    caixaPergunta.appendChild(caixaOpcao4);

    var listaPerguntas = document.querySelector("#perguntas");
    listaPerguntas.appendChild(caixaPergunta);
}

function renderizarNiveis(){
    var caixaNivel = document.createElement('div');
    caixaNivel.classList.add('item-lista');

    var h3 = document.createElement('h3');
    h3.innerText = "Nível " + qtdNiveis;
    caixaNivel.appendChild(h3);

    var porcentagemNivel = criarCaixaPorcentagem();
    caixaNivel.appendChild(porcentagemNivel);

    var tituloNivel = criarCaixadeTexto('input','titulo full','Título do nível');
    caixaNivel.appendChild(tituloNivel);

    var LinkNivel = criarCaixadeTexto('input','link full','Link da imagem do nível');
    caixaNivel.appendChild(LinkNivel);

    var descricaoNivel = criarCaixadeTexto('textarea','descricao full','Descrição do Nível');
    caixaNivel.appendChild(descricaoNivel);
    
    var listaNiveis = document.querySelector('#niveis');
    listaNiveis.appendChild(caixaNivel);
}


//----------------------------------------------------funções de apoio a renderização
function criarCaixaOpcao(classes,texto){
    var caixaOpcao = document.createElement('div');
    caixaOpcao.setAttribute('class',classes);
    var inputResposta = criarCaixadeTexto('input','resposta','Digite a resposta ' + texto);
    var inputLink = criarCaixadeTexto('input','link','Digite o link da imagem ' + texto);
    caixaOpcao.appendChild(inputResposta);
    caixaOpcao.appendChild(inputLink);

    return caixaOpcao;
}
function criarCaixadeTexto(elemento,classes,texto){
    var caixaTexto = document.createElement(elemento);
    caixaTexto.setAttribute('type','text');
    caixaTexto.setAttribute('placeholder',texto);
    caixaTexto.setAttribute('class',classes);

    return caixaTexto;
}

function criarCaixaPorcentagem(){
    var caixaPorcentagem = document.createElement('div');
    caixaPorcentagem.classList.add('opcao');
    var minimo = criarCaixadeTexto('input','acerto-min','% Mínima de Acerto do Nível');
    var maximo = criarCaixadeTexto('input','acerto-max','% Máxima de Acerto do Nível');
    caixaPorcentagem.appendChild(minimo);
    caixaPorcentagem.appendChild(maximo);

    return caixaPorcentagem;
}