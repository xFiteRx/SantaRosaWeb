// Deshabilitar Clic Derecho
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
}, false);

// Deshabilitar atajos de teclado de copia e inspección
document.addEventListener('keydown', function(e) {
    if (e.key === 'F12') { e.preventDefault(); return false; }
    if (e.ctrlKey && e.shiftKey && e.key === 'I') { e.preventDefault(); return false; }
    if (e.ctrlKey && e.shiftKey && e.key === 'J') { e.preventDefault(); return false; }
    if (e.ctrlKey && e.key === 'u') { e.preventDefault(); return false; }
    if (e.ctrlKey && e.key === 'c') { e.preventDefault(); return false; }
    if (e.ctrlKey && e.key === 's') { e.preventDefault(); return false; }
});

// CARRUSEL DE IMÁGENES (SLIDER)
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;
setInterval(() => {
    if(slides.length > 0) {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }
}, 5000);

// REPRODUCTOR DE PLAYLIST (Nombre de función limpiado y sanitizado de UCV)
function cambiarVideoSeccion(elemento, idVideo) {
    document.querySelectorAll('.playlist-video-item').forEach(item => item.classList.remove('playing-now'));
    elemento.classList.add('playing-now');
    document.getElementById('video-main-player').src = "https://www.youtube.com/embed/" + idVideo + "?enablejsapi=1&autoplay=1";
}

// ANIMACIÓN CONTADOR
document.addEventListener("DOMContentLoaded", () => {
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
});
