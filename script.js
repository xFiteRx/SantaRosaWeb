// Esperamos a que la página cargue por completo para activar las funciones
document.getElementById('btn-ingresar').addEventListener('click', function() {
    
    // 1. Capturamos el rol que el usuario seleccionó en la lista
    const rolSeleccionado = document.getElementById('selector-rol').value;

    // 2. Buscamos todos los paneles de la pantalla y los ocultamos
    const todosLosPaneles = document.querySelectorAll('.panel');
    todosLosPaneles.forEach(function(panel) {
        panel.style.display = 'none';
    });

    // 3. Si seleccionó un rol, construimos el ID del panel correspondiente y lo mostramos
    if (rolSeleccionado !== "") {
        const panelAMostrar = document.getElementById('panel-' + rolSeleccionado);
        if (panelAMostrar) {
            panelAMostrar.style.display = 'block';
        }
    } else {
        alert("Por favor, selecciona un rol de la lista para ingresar.");
    }
});
