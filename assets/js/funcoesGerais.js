function trocarDeTela(telaAtual,proximaTela){
    var desabilitarTela = document.querySelector(telaAtual);
    telaLogin.style.display = "none";
    var habilitarTela = document.querySelector(proximaTela);
    habilitarTela.style.display = "block";
}