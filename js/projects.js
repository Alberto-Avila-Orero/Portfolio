// Filtrado de los proyectos mediante los atributos data-filter y data-category.
let filtros = document.querySelectorAll(".filter");
let proyectos = document.querySelectorAll(".project[data-category]");
let estadoFiltro = document.getElementById("filter-status");

function filtrarProyectos(categoria) {
    let visibles = 0;
    filtros.forEach(function(boton) {
        let activo = boton.dataset.filter === categoria;
        boton.classList.toggle("active", activo);
        boton.setAttribute("aria-pressed", String(activo));
    });
    proyectos.forEach(function(proyecto) {
        let visible = categoria === "all" || proyecto.dataset.category === categoria;
        proyecto.hidden = !visible;
        if (visible) visibles++;
    });
    estadoFiltro.textContent = "Proyectos visibles: " + visibles;
}

filtros.forEach(function(boton) {
    boton.addEventListener("click", function() {
        filtrarProyectos(boton.dataset.filter);
    });
});
