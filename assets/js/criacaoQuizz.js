var qtdPerguntas = 1;
var qtdNiveis = 1;
var perguntaInvalida = null;
var quizz = {
	"title": null,
	"data": {
        "perguntas": [],
        "niveis": []
    }
}
function resetarVariaveis(){
    quizz = {
        "title": null,
        "data": {
            "perguntas": [],
            "niveis": []
        }
}
    perguntaInvalida = null;
}


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
    resetarVariaveis();

    var tituloQuizz = pegarValorInput('#titulo');
    if(tituloQuizz !== 'vazio'){
        tituloQuizz = removerEspaçosInicioFim(tituloQuizz);
        tituloQuizz = primeiraLetraEmMaiusculo(tituloQuizz);
        quizz.title = tituloQuizz;
    }else return;

    pegarPerguntas();
    pegarNiveis();

    //se alguma pergunta foi digitada em formato invalido:
    if(perguntaInvalida !== null) alert(perguntaInvalida);
    else enviarQuizz(quizz);
}

//-------------------------------------------------------------------- funções de pagar dados digitados

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
        }else{
            perguntaInvalida = 'Você digitou perguntas em um formato inválido, por favor refaça o formulário com perguntas com apenas uma interrogação, posicionada ao final da sua pergunta, ex.: "Que dia é hoje?"';
        }
        numeroPergunta++;
    }
}
function pegarRespostas(identificadorCaixa){
    var arrayrespostas = [];

    var respostaCorreta = pegarValorInput(identificadorCaixa + ' .correta .resposta');
    respostaCorreta = removerEspaçosInicioFim(respostaCorreta);
    respostaCorreta = primeiraLetraEmMaiusculo(respostaCorreta);

    var linkCorreta = pegarValorInput(identificadorCaixa + ' .correta .link');
    linkCorreta = removerEspaçosInicioFim(linkCorreta);

    arrayrespostas.push({"resposta": respostaCorreta,"link": linkCorreta});

    for(var i = 1; i <= 3; i++){
        var posicao = transformarParaClasse(i);

        var respostaErrada = pegarValorInput(identificadorCaixa + ' .errada'+ posicao +' .resposta');
        respostaErrada = removerEspaçosInicioFim(respostaErrada);
        respostaErrada = primeiraLetraEmMaiusculo(respostaErrada);

        var linkErrada = pegarValorInput(identificadorCaixa + ' .errada'+ posicao +' .link');
        linkErrada = removerEspaçosInicioFim(linkErrada);

        arrayrespostas.push({"resposta": respostaErrada,"link": linkErrada});
    }
    return arrayrespostas;
}

function pegarNiveis(){
    var numeroNivel = 1;
    while(numeroNivel <= qtdNiveis){
        var identificadorCaixa = '#niveis .item-lista:nth-child('+numeroNivel+')';

        var acertoMinimo = pegarValorInput(identificadorCaixa + ' .acerto-min');
        acertoMinimo = removerEspaçosInicioFim(acertoMinimo);
        acertoMinimo = primeiraLetraEmMaiusculo(acertoMinimo);

        var acertoMaximo = pegarValorInput(identificadorCaixa + ' .acerto-max');
        acertoMaximo = removerEspaçosInicioFim(acertoMaximo);
        acertoMaximo = primeiraLetraEmMaiusculo(acertoMaximo);

        var tituloNivel = pegarValorInput(identificadorCaixa + ' .titulo');
        tituloNivel = removerEspaçosInicioFim(tituloNivel);
        tituloNivel = primeiraLetraEmMaiusculo(tituloNivel);

        var linkNivel = pegarValorInput(identificadorCaixa + ' .link');
        linkNivel = removerEspaçosInicioFim(linkNivel);
        linkNivel = primeiraLetraEmMaiusculo(linkNivel);

        var descricaoNivel = pegarValorInput(identificadorCaixa + ' .descricao');
        descricaoNivel = removerEspaçosInicioFim(descricaoNivel);
        descricaoNivel = primeiraLetraEmMaiusculo(descricaoNivel);

        var objetoNivel = [{
            "acerto-minimo": acertoMinimo,
            "acerto-maximo": acertoMaximo,
            "titulo": tituloNivel,
            "link": linkNivel,
            "descricao": descricaoNivel
        }];
        quizz.data.niveis.push(objetoNivel);

        numeroNivel++;
    }
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