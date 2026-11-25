// Tema de la web: se aplica a las variables CSS del elemento <html>.
let themeButton = document.getElementById("theme-button");
let themeIcon = document.getElementById("theme-icon");

function aplicarTema(tema) {
    document.documentElement.dataset.theme = tema;
    themeIcon.textContent = tema === "light" ? "☾" : "☀";
    themeButton.setAttribute("aria-label", tema === "light" ? "Cambiar a tema oscuro" : "Cambiar a tema claro");
    try {
        localStorage.setItem("alberto-theme", tema);
    } catch (error) {
        // El cambio funciona aunque el navegador no permita guardar datos.
    }
}

function cambiarTema() {
    let temaActual = document.documentElement.dataset.theme;
    let nuevoTema = temaActual === "light" ? "dark" : "light";
    aplicarTema(nuevoTema);
    return nuevoTema;
}

try {
    let temaGuardado = localStorage.getItem("alberto-theme");
    if (temaGuardado === "light" || temaGuardado === "dark") {
        aplicarTema(temaGuardado);
    }
} catch (error) {
    // Si localStorage no está disponible, se mantiene el tema oscuro.
}

themeButton.addEventListener("click", cambiarTema);
