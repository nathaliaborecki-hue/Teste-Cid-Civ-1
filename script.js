```javascript
// ==========================================
// MENU PARA CELULAR
// ==========================================

const menuButton = document.getElementById("menuButton");
const navLinks = document.getElementById("navLinks");

if (menuButton && navLinks) {
    menuButton.addEventListener("click", function () {
        navLinks.classList.toggle("active");
    });
}


// Fecha o menu quando clicar em um link

const links = document.querySelectorAll(".nav-links a");

links.forEach(function (link) {
    link.addEventListener("click", function () {
        navLinks.classList.remove("active");
    });
});


// ==========================================
// TEMA CLARO / ESCURO
// ==========================================

const themeButton = document.getElementById("themeButton");

if (themeButton) {

    // Verifica se o usuário já escolheu um tema
    const temaSalvo = localStorage.getItem("tema");

    if (temaSalvo === "escuro") {
        document.body.classList.add("dark");
        themeButton.textContent = "☀️";
    } else {
        themeButton.textContent = "🌙";
    }


    themeButton.addEventListener("click", function () {

        document.body.classList.toggle("dark");

        if (document.body.classList.contains("dark")) {

            themeButton.textContent = "☀️";

            localStorage.setItem("tema", "escuro");

        } else {

            themeButton.textContent = "🌙";

            localStorage.setItem("tema", "claro");
        }

    });
}


// ==========================================
// ANIMAÇÃO DOS CARDS
// ==========================================

const elementosAnimados = document.querySelectorAll(
    ".info-card, .participation-item, .number-card"
);


function mostrarElementos() {

    elementosAnimados.forEach(function (elemento) {

        const posicao =
            elemento.getBoundingClientRect().top;

        const alturaTela =
            window.innerHeight;

        if (posicao < alturaTela - 80) {
            elemento.classList.add("show");
        }

    });

}


// Executa quando a página é rolada
window.addEventListener("scroll", mostrarElementos);


// Executa uma vez quando a página abre
mostrarElementos();


// ==========================================
// QUIZ
// ==========================================

const perguntas = [

    {
        pergunta:
            "Qual atitude ajuda na formação de uma opinião consciente?",

        respostas: [
            "Compartilhar informações sem verificar.",
            "Comparar informações de fontes diferentes.",
            "Acreditar automaticamente em qualquer postagem."
        ],

        correta: 1
    },

    {
        pergunta:
            "Qual destas pode ser uma forma de participação cidadã?",

        respostas: [
            "Participar de um projeto comunitário.",
            "Ignorar todos os problemas da comunidade.",
            "Evitar conhecer assuntos públicos."
        ],

        correta: 0
    },

    {
        pergunta:
            "Por que é importante conhecer diferentes pontos de vista?",

        respostas: [
            "Para obrigar outras pessoas a concordarem.",
            "Para evitar qualquer conversa.",
            "Para compreender melhor diferentes argumentos."
        ],

        correta: 2
    },

    {
        pergunta:
            "No Brasil, o voto para jovens de 16 e 17 anos é:",

        respostas: [
            "Facultativo.",
            "Sempre obrigatório.",
            "Proibido."
        ],

        correta: 0
    },

    {
        pergunta:
            "Antes de compartilhar uma notícia, é recomendável:",

        respostas: [
            "Compartilhar rapidamente.",
            "Verificar a fonte e outras informações.",
            "Acreditar apenas no título."
        ],

        correta: 1
    }

];


// ==========================================
// ELEMENTOS DO QUIZ
// ==========================================

const question = document.getElementById("question");
const answers = document.getElementById("answers");
const nextButton = document.getElementById("nextButton");
const questionNumber = document.getElementById("questionNumber");
const progressBar = document.getElementById("progressBar");
const quizResult = document.getElementById("quizResult");


// Variáveis do jogo

let perguntaAtual = 0;
let pontuacao = 0;
let respondeu = false;


// ==========================================
// MOSTRAR PERGUNTA
// ==========================================

function mostrarPergunta() {

    // Verifica se os elementos existem
    if (
        !question ||
        !answers ||
        !nextButton ||
        !questionNumber ||
        !progressBar
    ) {
        return;
    }


    respondeu = false;


    const pergunta =
        perguntas[perguntaAtual];


    // Texto da pergunta

    question.textContent =
        pergunta.pergunta;


    // Número da pergunta

    questionNumber.textContent =
        "Pergunta " +
        (perguntaAtual + 1) +
        " de " +
        perguntas.length;


    // Barra de progresso

    const progresso =
        ((perguntaAtual + 1) / perguntas.length) * 100;

    progressBar.style.width =
        progresso + "%";


    // Limpa respostas antigas

    answers.innerHTML = "";


    // Esconde botão até responder

    nextButton.style.display = "none";


    // Cria os botões das respostas

    pergunta.respostas.forEach(
        function (resposta, indice) {

            const botao =
                document.createElement("button");


            botao.textContent =
                resposta;


            botao.className =
                "answer-button";


            botao.type =
                "button";


            botao.addEventListener(
                "click",
                function () {

                    verificarResposta(
                        indice,
                        botao
                    );

                }
            );


            answers.appendChild(botao);

        }
    );

}


// ==========================================
// VERIFICAR RESPOSTA
// ==========================================

function verificarResposta(
    indice,
    botaoEscolhido
) {

    // Impede clicar várias vezes

    if (respondeu) {
        return;
    }


    respondeu = true;


    const respostaCorreta =
        perguntas[perguntaAtual].correta;


    const botoes =
        document.querySelectorAll(
            ".answer-button"
        );


    // Mostra qual era a resposta correta

    botoes.forEach(
        function (botao, indiceBotao) {

            if (
                indiceBotao === respostaCorreta
            ) {

                botao.classList.add(
                    "correct"
                );

            }

        }
    );


    // Verifica se o usuário acertou

    if (indice === respostaCorreta) {

        pontuacao++;

    } else {

        botaoEscolhido.classList.add(
            "wrong"
        );

    }


    // Mostra botão para continuar

    nextButton.style.display =
        "inline-block";


    // Última pergunta

    if (
        perguntaAtual ===
        perguntas.length - 1
    ) {

        nextButton.textContent =
            "Ver resultado";

    } else {

        nextButton.textContent =
            "Próxima pergunta →";

    }

}


// ==========================================
// BOTÃO PRÓXIMA PERGUNTA
// ==========================================

if (nextButton) {

    nextButton.addEventListener(
        "click",
        function () {

            perguntaAtual++;


            if (
                perguntaAtual <
                perguntas.length
            ) {

                mostrarPergunta();

            } else {

                mostrarResultado();

            }

        }
    );

}


// ==========================================
// MOSTRAR RESULTADO
// ==========================================

function mostrarResultado() {

    question.style.display =
        "none";

    answers.style.display =
        "none";

    nextButton.style.display =
        "none";


    questionNumber.textContent =
        "Resultado final";


    progressBar.style.width =
        "100%";


    let mensagem = "";


    if (pontuacao === 5) {

        mensagem =
            "🌟 Excelente! Você acertou todas as perguntas!";

    }

    else if (pontuacao >= 3) {

        mensagem =
            "👏 Muito bem! Você já conhece bastante sobre participação cidadã.";

    }

    else {

        mensagem =
            "💡 Continue aprendendo! Informação é um ótimo primeiro passo.";

    }


    quizResult.innerHTML =

        "<h3>" +
        pontuacao +
        " de " +
        perguntas.length +
        " pontos</h3>" +

        "<p>" +
        mensagem +
        "</p>" +

        "<button " +
        'class="main-button"' +
        'id="restartButton"' +
        'type="button">' +
        "Refazer quiz" +
        "</button>";


    // Botão para reiniciar

    const restartButton =
        document.getElementById(
            "restartButton"
        );


    restartButton.addEventListener(
        "click",
        reiniciarQuiz
    );

}


// ==========================================
// REINICIAR QUIZ
// ==========================================

function reiniciarQuiz() {

    perguntaAtual = 0;

    pontuacao = 0;

    question.style.display =
        "block";

    answers.style.display =
        "grid";

    quizResult.innerHTML = "";


    mostrarPergunta();

}


// ==========================================
// INICIAR O QUIZ
// ==========================================

mostrarPergunta();
```
