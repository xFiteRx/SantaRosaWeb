 // SEGURIDAD: Deshabilitar Clic Derecho
        document.addEventListener('contextmenu', function(e) {
            e.preventDefault();
        }, false);

        // SEGURIDAD: Deshabilitar atajos de teclado de copia e inspección
        document.addEventListener('keydown', function(e) {
            if (e.key === 'F12') { e.preventDefault(); return false; }
            if (e.ctrlKey && e.shiftKey && e.key === 'I') { e.preventDefault(); return false; }
            if (e.ctrlKey && e.shiftKey && e.key === 'J') { e.preventDefault(); return false; }
            if (e.ctrlKey && e.key === 'u') { e.preventDefault(); return false; }
            if (e.ctrlKey && e.key === 'c') { e.preventDefault(); return false; }
            if (e.ctrlKey && e.key === 's') { e.preventDefault(); return false; }
        });

        // CARRUSEL DE IMÁGENES
        const slides = document.querySelectorAll('.slide');
        let currentSlide = 0;
        setInterval(() => {
            if(slides.length > 0) {
                slides[currentSlide].classList.remove('active');
                currentSlide = (currentSlide + 1) % slides.length;
                slides[currentSlide].classList.add('active');
            }
        }, 5000);

        // REPRODUCTOR DE PLAYLIST
        function cambiarVideoUCV(elemento, idVideo) {
            document.querySelectorAll('.playlist-video-item').forEach(item => item.classList.remove('playing-now'));
            elemento.classList.add('playing-now');
            document.getElementById('ucv-main-player').src = "https://www.youtube.com/embed/" + idVideo + "?enablejsapi=1&autoplay=1";
        }

        // CONTROL INTEGRADO CUANDO EL DOM ESTÉ LISTO
        document.addEventListener("DOMContentLoaded", () => {
            
            // Asignar evento al elemento por defecto de la playlist
            const defaultVideo = document.getElementById('default-video-item');
            if (defaultVideo) {
                defaultVideo.addEventListener('click', function() {
                    cambiarVideoUCV(this, 'p3X_S65pGZ8');
                });
            }

            // ANIMACIÓN DE LOS CONTADORES
            const counters = document.querySelectorAll('.elementor-counter-number');
            counters.forEach(counter => {
                const toValue = parseInt(counter.getAttribute('data-to-value'));
                const duration = parseInt(counter.getAttribute('data-duration')) || 2000;
                let startTime = null;

                const animateCounter = (timestamp) => {
                    if (!startTime) startTime = timestamp;
                    const progress = timestamp - startTime;
                    const currentCount = Math.min(Math.floor((progress / duration) * toValue), toValue);
                    
                    counter.textContent = currentCount;
                    if (progress < duration) {
                        requestAnimationFrame(animateCounter);
                    } else {
                        counter.textContent = toValue;
                    }
                };
                requestAnimationFrame(animateCounter);
            });

            // GESTIÓN DEL MODAL Y SIMULACIÓN COMPLETA DE ACCESO POR ROLES (FIREBASE INTEGRATION READY)
            const modal = document.getElementById('loginModal');
            const authSection = document.getElementById('navbar-auth-section');
            const adminFloatingPanel = document.getElementById('admin-floating-panel');
            
            const btnClose = document.getElementById('closeModal');
            const btnBack = document.getElementById('backToRoles');
            
            const roleSelectionView = document.getElementById('roleSelectionView');
            const loginFormView = document.getElementById('loginFormView');
            const loginForm = document.getElementById('loginForm');
            const loginError = document.getElementById('loginError');

            const cardEstudiante = document.getElementById('role-estudiante');
            const cardDocente = document.getElementById('role-docente');
            const cardDirector = document.getElementById('role-director');
            const linkSoporte = document.getElementById('link-soporte');

            // Delegación de apertura delegada por clase/id dinámico
            if (authSection) {
                authSection.addEventListener('click', (e) => {
                    const trigger = e.target.closest('#btn-login-modal');
                    if (trigger) {
                        e.preventDefault();
                        resetearModal();
                        modal.style.display = 'flex';
                    }
                });
            }

            if (btnClose) {
                btnClose.addEventListener('click', () => { modal.style.display = 'none'; });
            }

            window.addEventListener('click', (e) => { 
                if (e.target === modal) modal.style.display = 'none'; 
            });

            if (btnBack) {
                btnBack.addEventListener('click', () => { resetearModal(); });
            }

            if(cardEstudiante) cardEstudiante.addEventListener('click', () => mostrarFormulario('Estudiante', '#0077b6'));
            if(cardDocente) cardDocente.addEventListener('click', () => mostrarFormulario('Docente', '#b7791f'));
            if(cardDirector) cardDirector.addEventListener('click', () => mostrarFormulario('Director', '#252629'));
            if(linkSoporte) linkSoporte.addEventListener('click', () => mostrarFormulario('Soporte TI', '#e56b6f'));

            function resetearModal() {
                if (roleSelectionView) roleSelectionView.style.display = 'block';
                if (loginFormView) loginFormView.style.display = 'none';
                if (btnBack) btnBack.style.display = 'none';
                if (loginForm) loginForm.reset();
                if (loginError) loginError.style.display = 'none';
                
                const iconBox = document.getElementById('formIconContainer');
                if (iconBox) iconBox.innerHTML = '';
            }

            function mostrarFormulario(rol, colorTema) {
                if (!roleSelectionView || !loginFormView || !btnBack) return;

                roleSelectionView.style.display = 'none';
                loginFormView.style.display = 'block';
                btnBack.style.display = 'block';

                const selectedRoleInput = document.getElementById('selectedRole');
                const formTitle = document.getElementById('formTitle');
                if (selectedRoleInput) selectedRoleInput.value = rol;
                if (formTitle) formTitle.textContent = "Acceso para " + rol;
                
                const iconBox = document.getElementById('formIconContainer');
                if (iconBox) {
                    let iconHtml = '';
                    switch(rol) {
                        case 'Estudiante':
                            iconHtml = `<i class="fa-solid fa-graduation-cap" style="color: ${colorTema};"></i>`;
                            break;
                        case 'Docente':
                            iconHtml = `<i class="fa-solid fa-chalkboard-user" style="color: ${colorTema};"></i>`;
                            break;
                        case 'Director':
                            iconHtml = `<i class="fa-solid fa-user-tie" style="color: ${colorTema};"></i>`;
                            break;
                        case 'Soporte TI':
                            iconHtml = `<i class="fa-solid fa-screwdriver-wrench" style="color: ${colorTema};"></i>`;
                            break;
                    }
                    iconBox.innerHTML = iconHtml;
                }

                const btnSubmit = document.getElementById('submitBtn');
                if (btnSubmit) {
                    if (rol === 'Docente' || rol === 'Director') {
                        btnSubmit.style.background = "linear-gradient(135deg, #ffcd3f 0%, #f4b400 100%)";
                        btnSubmit.style.color = "#000";
                    } else {
                        btnSubmit.style.background = colorTema;
                        btnSubmit.style.color = "#fff";
                    }
                }
            }

            // SIMULACIÓN DE PROCESAMIENTO DE LOGIN DE FIREBASE COMPATIBLE CON CAMBIOS DINÁMICOS
            if (loginForm) {
                loginForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    const rol = document.getElementById('selectedRole').value;
                    const email = document.getElementById('loginEmail').value;
                    
                    // Definición de nombres simulados basados en las colecciones
                    let usuarioNombre = "John";
                    if (rol === 'Director') usuarioNombre = "Juan Luis";

                    // Inyección dinámica de la plantilla de saludo en la barra de navegación (Aviso de Ingreso Exitoso)
                    authSection.innerHTML = `
                        <div class="user-nav-profile-container">
                            <div class="user-nav-avatar">
                                ${usuarioNombre.charAt(0).toUpperCase()}
                            </div>
                            <div class="user-nav-info">
                                <span class="user-nav-name">¡Hola, ${usuarioNombre}!</span>
                                <span class="user-nav-role">${rol}</span>
                            </div>
                            <button id="btn-logout" class="user-nav-logout-btn" title="Cerrar Sesión">
                                <i class="fa-solid fa-right-from-bracket"></i>
                            </button>
                        </div>
                    `;

                    // Control estricto del panel flotante según el Rol de Soporte TI
                    if (rol === "Soporte TI") {
                        adminFloatingPanel.classList.remove('hidden');
                    } else {
                        adminFloatingPanel.classList.add('hidden');
                    }

                    // Cerrar el modal automáticamente
                    modal.style.display = 'none';
                });
            }

            // ESCUCHA DEL BOTÓN DE LOGOUT DINÁMICO
            if (authSection) {
                authSection.addEventListener('click', (e) => {
                    const logoutBtn = e.target.closest('#btn-logout');
                    if (logoutBtn) {
                        e.preventDefault();
                        // Restablecer Navbar al estado original sin autenticar
                        authSection.innerHTML = `
                            <a id="btn-login-modal" class="btn-admin" title="Portal de Acceso">
                                <i class="fa-solid fa-right-to-bracket"></i>
                            </a>
                        `;
                        // Ocultar panel de edición si existía
                        adminFloatingPanel.classList.add('hidden');
                    }
                });
            }
        });
