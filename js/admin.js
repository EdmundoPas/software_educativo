const resultados = JSON.parse(localStorage.getItem("resultados")) || [];
const tbody = document.querySelector("#tablaResultados tbody");

function renderTable() {
  tbody.innerHTML = "";
  resultados.forEach((r, index) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${r.usuario}</td>
      <td>${r.puntaje}</td>
      <td>${r.total}</td>
      <td>${r.porcentaje}%</td>
      <td><button onclick="eliminarResultado(${index})">Eliminar</button></td>
    `;
    tbody.appendChild(fila);
  });
}

function eliminarResultado(index) {
  if (confirm("¿Estás seguro de que quieres eliminar este resultado?")) {
    resultados.splice(index, 1);
    localStorage.setItem("resultados", JSON.stringify(resultados));
    renderTable();
  }
}

function cerrarSesion() {
  if (confirm("¿Estás seguro de que quieres cerrar la sesión de administrador?")) {
    window.location.href = "index.html";
  }
}

renderTable();
