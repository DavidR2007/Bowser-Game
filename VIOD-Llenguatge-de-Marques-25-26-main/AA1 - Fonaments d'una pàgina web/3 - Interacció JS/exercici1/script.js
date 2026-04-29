// 1. Creació de la variable comptador
let comptador = 0;

// 2. Captura dels elements del document HTML
const boto = document.getElementById("boto");
const paragraf = document.getElementById("comptador");

// 3. Afegir un esdeveniment al botó
boto.addEventListener("click", () => {

    // El codi de l'esdemniment actualitza el "textContent" del paràgraf
    comptador++;
    paragraf.textContent = comptador;
});