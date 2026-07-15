<script>
        // ========================================================
        // 1. SEGURIDAD BÁSICA FRONT-END
        // ========================================================
        document.addEventListener('contextmenu', function(e) { e.preventDefault(); }, false);

        document.addEventListener('keydown', function(e) {
            if (e.key === 'F12') { e.preventDefault(); return false; }
            if (e.ctrlKey && e.shiftKey && e.key === 'I') { e.preventDefault(); return false; }
            if (e.ctrlKey && e.shiftKey && e.key === 'J') { e.preventDefault(); return false; }
            if (e.ctrlKey && e.key === 'u') { e.preventDefault(); return false; }
            if (e.ctrlKey && e.key === 'c') { e.preventDefault(); return false; }
            if (e.ctrlKey && e.key === 's') { e.preventDefault(); return false; }
        });

        // ========================================================
        // 2. MULTIMEDIA (CARRUSEL Y VIDEOS)
        // ========================================================
        const slides = document.querySelectorAll('.slide');
        let currentSlide = 0;
        setInterval(() => {
            if(slides.length > 0) {
                slides[currentSlide].classList.remove('active');
                currentSlide = (currentSlide + 1) % slides.length;
                slides[currentSlide].classList.add('active');
            }
        }, 5000);

        function cambiarVideoUCV(elemento, idVideo) {
            document.querySelectorAll('.playlist-video-item').forEach(item => item.classList.remove('playing-now'));
            elemento.classList.add('playing-now');
            document.getElementById('ucv-main-player').src = "https://www.youtube.com/embed/" + idVideo + "?enablejsapi=1&autoplay=1";
        }

        // ========================================================
        // 3. BASE DE DATOS SIMULADA DE USUARIOS
        // ========================================================
        const usuariosSimulados = [
            {
                correo: "juan@colegio.edu.pe",
                clave: "123456",
                nombre: "Juan Castillo",
                rol: "Estudiante",
                nivel: "primaria",
                grado: "3",
                seccion: "A"
            },
            {
                correo: "marcos@colegio.edu.pe",
                clave: "123456",
                nombre: "Marcos Diaz",
                rol: "Docente",
                nivel: "primaria",
                grado: "3",
                seccion: "A"
            },
            {
                correo: "director@colegio.edu.pe",
                clave: "123456",
                nombre: "Director General",
                rol: "Director",
                nivel: "",
                grado: "",
                seccion: ""
            },
            {
                correo: "soporte@colegio.edu.pe",
                clave: "123",
                nombre: "Soporte TI",
                rol: "Soporte TI",
                nivel: "",
                grado: "",
                seccion: ""
            }
        ];

        // ========================================================
        // 4. FUNCIÓN PARA ACTUALIZAR NAVBAR SEGÚN EL ROL
        // ========================================================
        function actualizarNavbar(usuario) {
            const authSection = document.getElementById('navbar-auth-section');
            const adminFloatingPanel = document.getElementById('admin-floating-panel');
            
            if (authSection) {
                authSection.innerHTML = `
                    <div class="user-nav-profile-container">
                        <div class="user-nav-avatar">
                            ${usuario.nombre.charAt(0).toUpperCase()}
                        </div>
                        <div class="user-nav-info">
                            <span class="user-nav-name">¡Hola, ${usuario.nombre.split(' ')[0]}!</span>
                            <span class="user-nav-role">${usuario.rol}</span>
                        </div>
                        <button id="btn-logout" class="user-nav-logout-btn" title="Cerrar Sesión">
                            <i class="fa-solid fa-right-from-bracket"></i>
                        </button>
                    </div>
                `;
            }

            // Mostrar el panel lateral si es Soporte TI
            if (usuario.rol === "Soporte TI" && adminFloatingPanel) {
                adminFloatingPanel.classList.remove('hidden');
            } else if (adminFloatingPanel) {
                adminFloatingPanel.classList.add('hidden');
            }
        }

        // ========================================================
        // 5. CONTROLADOR PRINCIPAL DEL DOM Y LOGIN
        // ========================================================
        document.addEventListener("DOMContentLoaded", () => {
            
            // A. Revisar si hay un usuario logueado previamente
            const usuarioActivo = JSON.parse(localStorage.getItem("usuarioSantaRosa"));
            if (usuarioActivo) {
                actualizarNavbar(usuarioActivo);
            }

            // B. Contadores Animados
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
                    if (progress < duration) requestAnimationFrame(animateCounter);
                    else counter.textContent = toValue;
                };
                requestAnimationFrame(animateCounter);
            });

            // C. Lógica del Modal
            const modal = document.getElementById('loginModal');
            const authSection = document.getElementById('navbar-auth-section');
            const btnClose = document.getElementById('closeModal');
            const btnBack = document.getElementById('backToRoles');
            
            const roleSelectionView = document.getElementById('roleSelectionView');
            const loginFormView = document.getElementById('loginFormView');
            const loginForm = document.getElementById('loginForm');
            const loginError = document.getElementById('loginError');

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

            if (btnClose) btnClose.addEventListener('click', () => { modal.style.display = 'none'; });
            if (btnBack) btnBack.addEventListener('click', () => { resetearModal(); });

            document.getElementById('role-estudiante').addEventListener('click', () => mostrarFormulario('Estudiante', '#0077b6'));
            document.getElementById('role-docente').addEventListener('click', () => mostrarFormulario('Docente', '#b7791f'));
            document.getElementById('role-director').addEventListener('click', () => mostrarFormulario('Director', '#252629'));
            document.getElementById('link-soporte').addEventListener('click', () => mostrarFormulario('Soporte TI', '#e56b6f'));

            function resetearModal() {
                roleSelectionView.style.display = 'block';
                loginFormView.style.display = 'none';
                btnBack.style.display = 'none';
                loginForm.reset();
                loginError.style.display = 'none';
                document.getElementById('formIconContainer').innerHTML = '';
            }

            function mostrarFormulario(rol, colorTema) {
                roleSelectionView.style.display = 'none';
                loginFormView.style.display = 'block';
                btnBack.style.display = 'block';

                document.getElementById('selectedRole').value = rol;
                document.getElementById('formTitle').textContent = "Acceso para " + rol;
                
                const iconBox = document.getElementById('formIconContainer');
                let iconHtml = '';
                if(rol==='Estudiante') iconHtml = `<i class="fa-solid fa-graduation-cap" style="color: ${colorTema};"></i>`;
                else if(rol==='Docente') iconHtml = `<i class="fa-solid fa-chalkboard-user" style="color: ${colorTema};"></i>`;
                else if(rol==='Director') iconHtml = `<i class="fa-solid fa-user-tie" style="color: ${colorTema};"></i>`;
                else iconHtml = `<i class="fa-solid fa-screwdriver-wrench" style="color: ${colorTema};"></i>`;
                iconBox.innerHTML = iconHtml;

                const btnSubmit = document.getElementById('submitBtn');
                if (rol === 'Docente' || rol === 'Director') {
                    btnSubmit.style.background = "linear-gradient(135deg, #ffcd3f 0%, #f4b400 100%)";
                    btnSubmit.style.color = "#000";
                } else {
                    btnSubmit.style.background = colorTema;
                    btnSubmit.style.color = "#fff";
                }
            }

            // D. PROCESAMIENTO DEL LOGIN (SIMULADO)
            if (loginForm) {
                loginForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    
                    const rol = document.getElementById('selectedRole').value;
                    const email = document.getElementById('loginEmail').value.trim();
                    const password = document.getElementById('loginPassword').value.trim();
                    
                    // Buscar usuario en nuestro arreglo "usuariosSimulados"
                    const usuarioEncontrado = usuariosSimulados.find(u => 
                        u.correo === email && 
                        u.clave === password && 
                        u.rol === rol
                    );

                    if (usuarioEncontrado) {
                        // ¡Login Exitoso! Lo guardamos en la memoria del navegador (localStorage)
                        localStorage.setItem("usuarioSantaRosa", JSON.stringify(usuarioEncontrado));
                        
                        // Actualizar la interfaz
                        actualizarNavbar(usuarioEncontrado);
                        loginError.style.display = 'none';
                        modal.style.display = 'none';
                    } else {
                        // Credenciales incorrectas
                        loginError.textContent = "Correo o contraseña incorrectos. Revisa tu rol.";
                        loginError.style.display = 'block';
                    }
                });
            }

            // E. CERRAR SESIÓN (LOGOUT)
            if (authSection) {
                authSection.addEventListener('click', (e) => {
                    const logoutBtn = e.target.closest('#btn-logout');
                    if (logoutBtn) {
                        e.preventDefault();
                        
                        // Borrar sesión de la memoria
                        localStorage.removeItem("usuarioSantaRosa");
                        
                        // Recargar la página para limpiar todo (Devolver a modo invitado)
                        location.reload();
                    }
                });
            }
        });
    </script>
