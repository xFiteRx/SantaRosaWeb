document.addEventListener("DOMContentLoaded", () => {
    
    // ===================================================
    // 1. SEGURIDAD CRÍTICA: ANTICOPY Y BLOQUEO DE F12
    // ===================================================
    document.onkeydown = function(e) {
        if(e.keyCode == 123 || // F12
           (e.ctrlKey && e.shiftKey && (e.keyCode == 73 || e.keyCode == 74 || e.keyCode == 67)) || // Ctrl+Shift+I/J/C
           (e.ctrlKey && e.keyCode == 85)) { // Ctrl+U
            return false;
        }
    };

    // Bloquear click derecho para evitar inspección rápida
    document.addEventListener('contextmenu', event => event.preventDefault());

    // ===================================================
    // 2. BUSCADOR INTERACTIVO EN TABLAS DE DOCUMENTOS
    // ===================================================
    const searchInput = document.getElementById('searchInput');
    const tableBody = document.getElementById('documentTableBody');

    if (searchInput && tableBody) {
        const tableRows = tableBody.querySelectorAll('tr');

        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase().trim();

            tableRows.forEach(row => {
                const docName = row.children[0].textContent.toLowerCase();
                const docDesc = row.children[1].textContent.toLowerCase();

                if (docName.includes(searchTerm) || docDesc.includes(searchTerm)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    }
});

// ===================================================
// 3. REDIRECCIÓN DINÁMICA E INTELIGENTE PARA JUEGOS (NIVEL PRIMARIA)
// ===================================================
function irAlJuego(idJuego, urlBase) {
    const gradoSelector = document.getElementById(`grado-${idJuego}`);
    const seccionSelector = document.getElementById(`seccion-${idJuego}`);

    if (!gradoSelector || !seccionSelector) return;

    const grado = gradoSelector.value;
    const seccion = seccionSelector.value;

    // Validación indispensable antes de ingresar al juego
    if (!grado || !seccion) {
        alert("Por favor, selecciona tu Grado y Sección para cargar tus preguntas asignadas.");
        return;
    }

    // Redirección con parámetros URL (?nivel=primaria&grado=X&seccion=Y)
    window.location.href = `${urlBase}?nivel=primaria&grado=${grado}&seccion=${seccion}`;
}
