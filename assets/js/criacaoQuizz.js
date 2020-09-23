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