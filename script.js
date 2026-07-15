// ==========================================
// 1. MEDIDAS DE SEGURIDAD FRONT-END
// ==========================================
// Bloquea teclas de inspección (F12, Ctrl+Shift+I/J/C, Ctrl+U)
document.onkeydown = function(e) {
    if(e.keyCode == 123 || 
       (e.ctrlKey && e.shiftKey && (e.keyCode == 73 || e.keyCode == 74 || e.keyCode == 67)) || 
       (e.ctrlKey && e.keyCode == 85)) { 
        return false;
    }
};

// ==========================================
// 2. SIMULACIÓN DE ACCESO DE SOPORTE TI
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    const loginBtn = document.getElementById('btn-login-modal');
    const authSection = document.getElementById('auth-navbar-section');
    const adminPanel = document.getElementById('admin-floating-panel');

    if (loginBtn) {
        loginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Simulación lógica de un login con el Rol autorizado
            const rolSimulado = "Soporte TI"; 

            authSection.innerHTML = `
                <div style="display: flex; align-items: center; gap: 15px;">
                    <span style="color: #fff; font-size: 0.85rem; font-weight: 600; background: rgba(229,107,111,0.2); padding: 5px 12px; border-radius: 20px; border: 1px dashed var(--rosa-principal);">
                        <i class="fa-solid fa-user-shield"></i> ${rolSimulado}
                    </span>
                    <button id="btn-logout" class="btn-admin" title="Cerrar Sesión" style="border:none; cursor:pointer;">
                        <i class="fa-solid fa-right-from-bracket"></i>
                    </button>
                </div>
            `;

            // Muestra el panel flotante únicamente si accede como Soporte TI
            if (rolSimulado === "Soporte TI" && adminPanel) {
                adminPanel.classList.remove('hidden');
            }
        });
    }

    // GESTIÓN DEL BOTÓN DE LOGOUT
    if (authSection) {
        authSection.addEventListener('click', (e) => {
            const logoutBtn = e.target.closest('#btn-logout');
            if (logoutBtn) {
                e.preventDefault();
                // Recarga la sesión para restaurar el estado inicial seguro de la web
                location.reload();
            }
        });
    }
});
