// =================================================================
// SEGURIDAD DE NAVEGACIÓN (Protección contra copias e inspecciones)
// =================================================================

// 1. Deshabilitar el Clic Derecho en todas las páginas internas
document.addEventListener('contextmenu', function(event) {
    event.preventDefault();
});

// 2. Deshabilitar atajos de teclado para desarrolladores (F12, Ctrl+Shift+I, Ctrl+U)
document.onkeydown = function(e) {
    if (e.keyCode == 123 || // F12
        (e.ctrlKey && e.shiftKey && (e.keyCode == 73 || e.keyCode == 74 || e.keyCode == 67)) || // Ctrl+Shift+I/J/C
        (e.ctrlKey && e.keyCode == 85)) { // Ctrl+U (Ver código fuente)
        return false;
    }
};

// 3. Deshabilitar el arrastre de imágenes y enlaces
document.addEventListener('dragstart', function(e) {
    e.preventDefault();
});

console.log("🔒 Seguridad escolar de la I.E. Santa Rosa activada correctamente.");
