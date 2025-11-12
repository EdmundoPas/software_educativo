let course = localStorage.getItem("course");
let username = localStorage.getItem("username");
let index = 0;
let score = 0;

document.getElementById("course-title").innerText = "Curso: " + course.toUpperCase();
document.getElementById("user-display").innerText = "Usuario: " + username;

function showQuestion() {
  let data = questions[course][index];
  let questionContainer = document.querySelector('.quiz-container');
  
  // Agrega una animación para la transición de la pregunta
  questionContainer.classList.remove('zoomIn');
  void questionContainer.offsetWidth; // Truco para reiniciar la animación
  questionContainer.classList.add('zoomIn');

  document.getElementById("question").innerText = data.q;

  let optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  data.options.forEach(op => {
    let btn = document.createElement("button");
    btn.innerText = op;
    btn.onclick = (event) => checkAnswer(op, event.target);
    optionsDiv.appendChild(btn);
  });
}

function checkAnswer(selected, btnElement) {
  const isCorrect = selected === questions[course][index].answer;
  if (isCorrect) {
    score++;
    btnElement.classList.add('correct');
  } else {
    btnElement.classList.add('incorrect');
  }

  // Deshabilitar todos los botones
  document.querySelectorAll('#options button').forEach(btn => {
    btn.disabled = true;
  });

  // Esperar un momento para que el usuario vea el resultado
  setTimeout(() => {
    index++;
    nextQuestion();
  }, 1000); // 1 segundo de espera
}

function nextQuestion() {
  if (index >= questions[course].length) {
    saveScore();
    alert(`Fin del examen ✅
Tu puntaje: ${score}/${questions[course].length}`);
    window.location = "index.html";
  } else {
    showQuestion();
  }
}

function saveScore() {
  const username = localStorage.getItem('username');
  const difficulty = localStorage.getItem('difficulty');
  const scores = JSON.parse(localStorage.getItem('scores')) || [];

  scores.push({
    username: username,
    course: course,
    difficulty: difficulty,
    score: score,
    date: new Date()
  });

  localStorage.setItem('scores', JSON.stringify(scores));

  // Guardar resultado para admin
  guardarResultado(username, score, questions[course].length);
}

function guardarResultado(usuario, puntaje, total) {
  const resultados = JSON.parse(localStorage.getItem("resultados")) || [];
  const porcentaje = ((puntaje / total) * 100).toFixed(1);
  resultados.push({ usuario, puntaje, total, porcentaje });
  localStorage.setItem("resultados", JSON.stringify(resultados));
}

showQuestion();
