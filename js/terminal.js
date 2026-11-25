// 1. Capturamos los elementos HTML de la consola.
let input = document.getElementById("terminal-input");
let output = document.getElementById("terminal-output");
let form = document.getElementById("terminal-form");
let terminal = document.getElementById("terminal");
let botonAmpliar = document.getElementById("terminal-expand");
let historial = [];
let posicionHistorial = 0;
let borrador = "";

// Datos de contacto y enlaces permitidos. La terminal no ejecuta código del usuario.
let enlaces = {
    vitalo: "https://prismatic-crumble-916bd5.netlify.app",
    github: "https://github.com/Alberto-Avila-Orero",
    linkedin: "https://www.linkedin.com/in/alberto-avila-orero",
    cv: "docs/Alberto_Avila_Orero_CV.pdf"
};
let comandos = {
    help: "Mostrar ayuda",
    whoami: "Sobre mí",
    skills: "Mis tecnologías",
    learning: "Actualmente aprendiendo",
    projects: "Mis proyectos",
    "open vitalo": "Abrir Vitalo",
    education: "Formación académica",
    experience: "Experiencia profesional",
    contact: "Datos de contacto",
    cv: "Abrir currículum",
    theme: "Cambiar tema",
    history: "Historial de comandos",
    clear: "Limpiar terminal",
    github: "Abrir GitHub",
    linkedin: "Abrir LinkedIn",
    date: "Mostrar fecha y hora"
};

// 2. Funciones auxiliares para escribir y crear enlaces en la consola.
function bajarTerminal() {
    output.scrollTop = output.scrollHeight;
}

function mostrarTexto(texto, clase = "") {
    let parrafo = document.createElement("p");
    parrafo.textContent = texto;
    if (clase) parrafo.className = clase;
    output.appendChild(parrafo);
    bajarTerminal();
}

function mostrarEnlace(url, nombre, abrir = false) {
    let parrafo = document.createElement("p");
    let enlace = document.createElement("a");
    enlace.href = url;
    enlace.textContent = nombre;
    enlace.target = "_blank";
    enlace.rel = "noopener noreferrer";
    parrafo.appendChild(enlace);
    output.appendChild(parrafo);
    // El enlace queda disponible aunque el navegador bloquee la nueva pestaña.
    if (abrir) window.open(url, "_blank", "noopener,noreferrer");
    bajarTerminal();
}

// 3. Acciones de cada comando.
function ejecutarComando(comando) {
    switch (comando) {
        case "help":
            let ayuda = Object.entries(comandos).map(function(entrada) {
                return entrada[0].padEnd(13) + " " + entrada[1];
            }).join("\n");
            mostrarTexto("COMANDOS DISPONIBLES\n\n" + ayuda);
            break;
        case "whoami":
            mostrarTexto("Alberto Ávila Orero\nEstudiante de segundo de DAW.\nTécnico en Sistemas Microinformáticos y Redes.\nDisponible para prácticas profesionales.");
            break;
        case "skills":
            mostrarTexto("FRONTEND: HTML, CSS, JavaScript\nBACKEND: Java, PHP\nBASES DE DATOS: SQL, MySQL\nCONTROL DE VERSIONES: Git, GitHub\nSISTEMAS: Linux, Windows Server");
            break;
        case "learning":
            mostrarTexto("Actualmente aprendiendo:\nAngular · React · MongoDB · Laravel · Docker");
            break;
        case "projects":
            mostrarTexto("01. Vitalo — Aplicación de entrenamiento creada con IA.\n02. El Rinconcito del Domi — Trabajo de Fin de Grado (TFG) de DAW, actualmente en desarrollo.\n03. Alberto.dev — Portfolio interactivo.\n\nEscribe 'open vitalo' para abrir la aplicación.");
            mostrarEnlace(enlaces.vitalo, "Ver Vitalo ↗");
            break;
        case "open vitalo":
            mostrarTexto("Abriendo Vitalo...");
            mostrarEnlace(enlaces.vitalo, "Ver aplicación Vitalo ↗", true);
            break;
        case "education":
            mostrarTexto("Grado Superior de Desarrollo de Aplicaciones Web — Davante (en curso).\nGrado Medio de Sistemas Microinformáticos y Redes.\nInglés B2 Cambridge (C1 en preparación). Francés básico.");
            break;
        case "experience":
            mostrarTexto("Ayuntamiento de Torremolinos\nPrácticas FCT — Soporte informático.\n- Mantenimiento de equipos.\n- Instalación y configuración de software.\n- Asistencia en la gestión de incidencias.\n- Sistemas y redes.");
            break;
        case "contact":
            mostrarTexto("Email: avilaorero@gmail.com\nTorremolinos, Málaga.\nDisponible para prácticas profesionales.");
            mostrarEnlace(enlaces.linkedin, "LinkedIn ↗");
            mostrarEnlace(enlaces.github, "GitHub ↗");
            break;
        case "cv":
            mostrarTexto("Abriendo currículum...");
            mostrarEnlace(enlaces.cv, "Consultar currículum PDF ↗", true);
            break;
        case "theme":
            let nuevoTema = cambiarTema();
            mostrarTexto("Tema actualizado: " + (nuevoTema === "light" ? "claro" : "oscuro"));
            break;
        case "clear":
            output.replaceChildren();
            break;
        case "history":
            mostrarTexto(historial.map(function(elemento, indice) {
                return (indice + 1) + ". " + elemento;
            }).join("\n"));
            break;
        case "github":
            mostrarTexto("Abriendo GitHub...");
            mostrarEnlace(enlaces.github, "Mi perfil de GitHub ↗", true);
            break;
        case "linkedin":
            mostrarTexto("Abriendo LinkedIn...");
            mostrarEnlace(enlaces.linkedin, "Mi perfil de LinkedIn ↗", true);
            break;
        case "date":
            mostrarTexto(new Date().toLocaleString("es-ES"));
            break;
        case "sudo":
            mostrarTexto("Permiso denegado. Aquí el único superpoder es seguir aprendiendo.");
            break;
        default:
            mostrarTexto("Comando no reconocido: " + comando + ". Escribe 'help'.", "terminal-error");
            break;
    }
}

// 4. Procesamos el texto, guardamos el historial y ejecutamos el comando.
function procesarComando(texto) {
    let comando = texto.trim().toLowerCase().replace(/\s+/g, " ");
    if (!comando) return;
    historial.push(comando);
    posicionHistorial = historial.length;
    borrador = "";
    mostrarTexto("alberto@portfolio:~$ " + comando, "terminal-command");
    ejecutarComando(comando);
    input.value = "";
}

form.addEventListener("submit", function(evento) {
    evento.preventDefault();
    procesarComando(input.value);
    input.focus();
});

let botonesComandos = document.querySelectorAll("[data-command]");
botonesComandos.forEach(function(boton) {
    boton.addEventListener("click", function() {
        procesarComando(boton.dataset.command);
    });
});

// 5. Historial con las flechas y autocompletado con TAB.
input.addEventListener("keydown", function(evento) {
    if (evento.key === "ArrowUp") {
        evento.preventDefault();
        if (posicionHistorial === historial.length) borrador = input.value;
        if (posicionHistorial > 0) {
            posicionHistorial--;
            input.value = historial[posicionHistorial];
        }
    } else if (evento.key === "ArrowDown") {
        evento.preventDefault();
        if (posicionHistorial < historial.length) posicionHistorial++;
        input.value = posicionHistorial === historial.length ? borrador : historial[posicionHistorial];
    } else if (evento.key === "Tab" && !evento.shiftKey) {
        let texto = input.value.trimStart().toLowerCase();
        if (!texto) return;
        let coincidencias = Object.keys(comandos).filter(function(comando) {
            return comando.startsWith(texto);
        });
        if (coincidencias.length === 1 && coincidencias[0] !== texto) {
            evento.preventDefault();
            input.value = coincidencias[0];
        } else if (coincidencias.length > 1 && !coincidencias.includes(texto)) {
            // Muestra alternativas sin impedir que TAB avance al siguiente control.
            mostrarTexto(coincidencias.join("   "));
        }
    }
});

// 6. Ampliar o reducir el área de salida.
botonAmpliar.addEventListener("click", function() {
    let ampliada = terminal.classList.toggle("expanded");
    botonAmpliar.textContent = ampliada ? "⤡" : "⤢";
    botonAmpliar.setAttribute("aria-expanded", String(ampliada));
    let etiqueta = ampliada ? "Reducir terminal" : "Ampliar terminal";
    botonAmpliar.setAttribute("aria-label", etiqueta);
    botonAmpliar.title = etiqueta;
    bajarTerminal();
});
