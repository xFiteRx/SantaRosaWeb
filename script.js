document.addEventListener("DOMContentLoaded", () => {
    // ==========================================
    // 1. CONTROL DE BANNER DE IMÁGENES (SLIDER)
    // ==========================================
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;

    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    // Cambia de imagen cada 5 segundos de forma automática
    if (slides.length > 0) {
        setInterval(nextSlide, 5000);
    }

    // ==========================================
    // 2. ELEMENTOS DEL MODAL DE AUTENTICACIÓN
    // ==========================================
    const modal = document.getElementById('loginModal');
    const authSection = document.getElementById('auth-section');
    const closeModalBtn = document.getElementById('closeModal');
    const roleSelectionView = document.getElementById('role-selection-view');
    const loginFormView = document.getElementById('login-form-view');
    const backToRolesBtn = document.getElementById('backToRoles');
    const loginRoleTitle = document.getElementById('login-role-title');
    const roleCards = document.querySelectorAll('.role-card-3d');
    const formCredenciales = document.getElementById('form-credenciales');
    const adminFloatingPanel = document.getElementById('admin-floating-panel');

    let selectedRole = ""; // Almacenará el rol seleccionado

    // CONTROL DE APERTURA DEL MODAL (Clic en el botón de la barra superior)
    if (authSection) {
        authSection.addEventListener('click', (e) => {
            const loginBtn = e.target.closest('#btn-login-modal');
            if (loginBtn) {
                e.preventDefault();
                resetModal();
                modal.style.display = 'flex';
            }
        });
    }

    // CERRAR EL MODAL
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    // CERRAR MODAL HACIENDO CLIC AFUERA DEL RECUADRO BLANCO
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // SELECCIÓN DE TARJETA DE ROL
    roleCards.forEach(card => {
        card.addEventListener('click', () => {
            selectedRole = card.getAttribute('data-role');
            
            // Cambiar de vista en el modal
            roleSelectionView.classList.add('hidden');
            loginFormView.classList.remove('hidden');
            
            // Personalizar el título según el rol seleccionado
            loginRoleTitle.textContent = `Acceso: ${selectedRole}`;
            
            // Limpiar inputs
            document.getElementById('username').value = "";
            document.getElementById('password').value = "";
        });
    });

    // VOLVER A LA PANTALLA DE ROLES
    if (backToRolesBtn) {
        backToRolesBtn.addEventListener('click', () => {
            resetModal();
        });
    }

    // RESTABLECER MODAL A LA VISTA ORIGINAL
    function resetModal() {
        roleSelectionView.classList.remove('hidden');
        loginFormView.classList.add('hidden');
        selectedRole = "";
    }

    // ==========================================
    // 3. PROCESO DE INGRESO (LOGIN SIMULADO)
    // ==========================================
    if (formCredenciales) {
        formCredenciales.addEventListener('submit', (e) => {
            e.preventDefault();

            const usuario = document.getElementById('username').value.trim();
            const contrasena = document.getElementById('password').value.trim();

            if (!usuario || !contrasena) return;

            // Simulación temporal de nombre de usuario profesional
            const nombreUsuario = usuario.split('@')[0];
            const InicialNombre = nombreUsuario.charAt(0).toUpperCase();

            // Transformar la sección de Login del Navbar en el Perfil del Usuario ingresado
            if (authSection) {
                authSection.innerHTML = `
                    <div class="user-nav-profile-container">
                        <div class="user-nav-avatar">${InicialNombre}</div>
                        <div class="user-nav-info">
                            <span class="user-nav-name">${nombreUsuario}</span>
                            <span class="user-nav-role">${selectedRole}</span>
                        </div>
                        <button id="btn-logout" class="user-nav-logout-btn" title="Cerrar Sesión">
                            <i class="fa-solid fa-right-from-bracket"></i>
                        </button>
                    </div>
                `;
            }

            // Mostrar el Panel Flotante ÚNICAMENTE si el rol es Soporte TI
            if (selectedRole === "Soporte TI") {
                adminFloatingPanel.classList.remove('hidden');
            } else {
                adminFloatingPanel.classList.add('hidden');
            }

            // Cerrar el modal automáticamente
            modal.style.display = 'none';
        });
    }

    // ==========================================
    // 4. CONTROL DE LOGOUT DINÁMICO
    // ==========================================
    if (authSection) {
        authSection.addEventListener('click', (e) => {
            const logoutBtn = e.target.closest('#btn-logout');
            if (logoutBtn) {
                e.preventDefault();
                
                // Restablecer el Navbar al botón de acceso original
                authSection.innerHTML = `
                    <a id="btn-login-modal" class="btn-admin" title="Portal de Acceso">
                        <i class="fa-solid fa-right-to-bracket"></i>
                    </a>
                `;
                
                // Asegurar que el panel de soporte TI se oculte
                adminFloatingPanel.classList.add('hidden');
            }
        });
    }
});
