// ===============================
// MENU MOBILE
// ===============================

const menuButton = document.getElementById("menuButton");
const navLinks = document.getElementById("navLinks");

if (menuButton && navLinks) {
    menuButton.addEventListener("click", function () {
        navLinks.classList.toggle("active");
    });
}

const links = document.querySelectorAll(".nav-links a");

links.forEach(function (link) {
    link.addEventListener("click", function () {
        if (navLinks) {
            navLinks.classList.remove("active");
        }
    });
});


// ===============================
// MODO ESCURO
// ===============================

const themeButton = document.getElementById("themeButton");

if (themeButton) {

    let temaSalvo = null;

    try {
        temaSalvo = localStorage.getItem("tema");
    } catch (erro) {
        temaSalvo = null;
    }

    if (temaSalvo === "escuro") {
        document.body.classList.add("dark");
        themeButton.textContent = "☀️";
    } else {
        themeButton.textContent = "🌙";
    }

    themeButton.addEventListener("click", function () {

        document.body.classList.toggle("dark");

        const modoEscuro =
            document.body.classList.contains("dark");

        themeButton.textContent =
            modoEscuro ? "☀️" : "🌙";

        try {
            localStorage.setItem(
                "tema",
                modoEscuro ? "escuro" : "claro"
            );
        } catch (erro) {
            // Continua funcionando mesmo se o navegador bloquear o armazenamento.
        }

    });
}


// ===============================
// ANIMAÇÕES AO ROLAR A PÁGINA
// ===============================

const elementosAnimados = document.querySelectorAll(
    ".info-card, .participation-item, .number-card, .reason-item, .check-card, .right-card, .guide-step"
);

function mostrarElementos() {

    elementosAnimados.forEach(function (elemento) {

        const posicao =
            elemento.getBoundingClientRect().top;

        const alturaTela = window.innerHeight;

        if (posicao < alturaTela - 80) {
            elemento.classList.add("show");
        }

    });
}

window.addEventListener("scroll", mostrarElementos);

mostrarElementos();


// ===============================
// QUIZ
// ===============================

const perguntas = [

    {
        pergunta: "Qual atitude ajuda na formação de uma opinião consciente?",
        respostas: [
            "Compartilhar qualquer informação recebida.",
            "Comparar informações de fontes diferentes.",
            "Considerar apenas opiniões com as quais já concordamos.",
            "Ignorar informações diferentes."
        ],
        correta: 1
    },

    {
        pergunta: "Qual destas pode ser uma forma de participação cidadã?",
        respostas: [
            "Participar de um projeto comunitário.",
            "Evitar qualquer discussão sobre a comunidade.",
            "Compartilhar informações sem verificar.",
            "Impedir opiniões diferentes."
        ],
        correta: 0
    },

    {
        pergunta: "Por que é importante conhecer diferentes pontos de vista?",
        respostas: [
            "Para obrigar outras pessoas a concordarem.",
            "Para descobrir qual opinião todos devem ter.",
            "Para compreender melhor diferentes argumentos.",
            "Para evitar qualquer debate."
        ],
        correta: 2
    },

    {
        pergunta: "No Brasil, o voto para jovens de 16 e 17 anos é:",
        respostas: [
            "Facultativo.",
            "Obrigatório.",
            "Permitido apenas em eleições municipais.",
            "Permitido somente aos 17 anos."
        ],
        correta: 0
    },

    {
        pergunta: "Antes de compartilhar uma notícia, é recomendável:",
        respostas: [
            "Compartilhar rapidamente.",
            "Verificar a fonte e outras informações.",
            "Confiar somente no título.",
            "Considerar verdadeira se muitas pessoas compartilharam."
        ],
        correta: 1
    },

    {
        pergunta: "Qual é uma característica importante do diálogo democrático?",
        respostas: [
            "Ouvir e respeitar pessoas com opiniões diferentes.",
            "Impedir opiniões contrárias.",
            "Evitar argumentos diferentes.",
            "Fazer todos concordarem."
        ],
        correta: 0
    },

    {
        pergunta: "A participação política acontece somente durante as eleições?",
        respostas: [
            "Sim, somente pelo voto.",
            "Sim, porque outras atividades não são participação.",
            "Não. Existem diferentes formas de participação cidadã.",
            "Somente para pessoas filiadas a partidos."
        ],
        correta: 2
    },

    {
        pergunta: "Qual atitude pode ajudar a identificar uma informação duvidosa?",
        respostas: [
            "Verificar a fonte, a data e comparar com outras fontes.",
            "Acreditar porque alguém conhecido enviou.",
            "Considerar verdadeira porque possui uma imagem.",
            "Compartilhar antes de verificar."
        ],
        correta: 0
    },

    {
        pergunta: "Participar de um grêmio estudantil pode ser considerado:",
        respostas: [
            "Uma forma de participação no ambiente escolar.",
            "Uma atividade exclusivamente eleitoral.",
            "Uma atividade que não envolve cidadania.",
            "Uma forma de impedir outros estudantes de participar."
        ],
        correta: 0
    },

    {
        pergunta: "A partir de qual idade uma pessoa pode solicitar o título eleitoral no Brasil?",
        respostas: [
            "14 anos.",
            "15 anos.",
            "16 anos.",
            "18 anos."
        ],
        correta: 1
    }

];


let perguntaAtual = 0;
let pontuacao = 0;
let respondeu = false;


const questionNumber =
    document.getElementById("questionNumber");

const question =
    document.getElementById("question");

const answers =
    document.getElementById("answers");

const nextButton =
    document.getElementById("nextButton");

const progressBar =
    document.getElementById("progressBar");

const quizResult =
    document.getElementById("quizResult");


function mostrarPergunta() {

    respondeu = false;

    if (
        !questionNumber ||
        !question ||
        !answers ||
        !nextButton ||
        !progressBar
    ) {
        return;
    }

    const atual = perguntas[perguntaAtual];

    questionNumber.textContent =
        `Pergunta ${perguntaAtual + 1} de ${perguntas.length}`;

    question.textContent =
        atual.pergunta;

    answers.innerHTML = "";

    progressBar.style.width =
        `${((perguntaAtual) / perguntas.length) * 100}%`;

    nextButton.style.display = "none";

    atual.respostas.forEach(function (resposta, indice) {

        const button =
            document.createElement("button");

        button.className = "answer-button";

        button.textContent = resposta;

        button.addEventListener("click", function () {

            verificarResposta(indice, button);

        });

        answers.appendChild(button);

    });
}


function verificarResposta(indiceEscolhido, botao) {

    if (respondeu) {
        return;
    }

    respondeu = true;

    const atual = perguntas[perguntaAtual];

    const botoes =
        document.querySelectorAll(".answer-button");

    botoes.forEach(function (botaoResposta, indice) {

        botaoResposta.disabled = true;

        if (indice === atual.correta) {
            botaoResposta.classList.add("correct");
        }

    });


    if (indiceEscolhido === atual.correta) {

        pontuacao++;

    } else {

        botao.classList.add("wrong");

    }


    if (nextButton) {
        nextButton.style.display = "inline-block";
    }
}


function mostrarResultado() {

    if (!question || !answers || !nextButton || !quizResult) {
        return;
    }

    question.textContent =
        "Quiz concluído!";

    answers.innerHTML = "";

    questionNumber.textContent =
        "Resultado";

    progressBar.style.width = "100%";

    nextButton.style.display = "none";


    let mensagem = "";

    if (pontuacao === perguntas.length) {

        mensagem =
            `🌟 Excelente! Você acertou todas as ${perguntas.length} perguntas!`;

    } else if (pontuacao >= 7) {

        mensagem =
            `👏 Muito bem! Você acertou ${pontuacao} de ${perguntas.length}.`;

    } else if (pontuacao >= 5) {

        mensagem =
            `📚 Você acertou ${pontuacao} de ${perguntas.length}. Continue aprendendo!`;

    } else {

        mensagem =
            `💡 Você acertou ${pontuacao} de ${perguntas.length}. Informação é um ótimo primeiro passo!`;

    }


    quizResult.innerHTML = `
        <p>${mensagem}</p>

        <button
            id="restartButton"
            class="secondary-button"
            style="margin-top: 20px;"
        >
            Refazer o quiz
        </button>
    `;


    const restartButton =
        document.getElementById("restartButton");

    if (restartButton) {

        restartButton.addEventListener(
            "click",
            reiniciarQuiz
        );

    }
}


function reiniciarQuiz() {

    perguntaAtual = 0;

    pontuacao = 0;

    respondeu = false;

    if (quizResult) {
        quizResult.innerHTML = "";
    }

    mostrarPergunta();
}


if (nextButton) {

    nextButton.addEventListener("click", function () {

        if (!respondeu) {
            return;
        }

        perguntaAtual++;

        if (perguntaAtual < perguntas.length) {

            mostrarPergunta();

        } else {

            mostrarResultado();

        }

    });

}


// Inicia o quiz
mostrarPergunta();