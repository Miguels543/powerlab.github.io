document.addEventListener('DOMContentLoaded', function() {
    // Manejar el envío del formulario de contacto
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener los valores del formulario
            const nombre = document.getElementById('nombre').value;
            const apellido = document.getElementById('apellido').value;
            const email = document.getElementById('email').value;
            const mensaje = document.getElementById('mensaje').value;
            
            // Construir el mensaje para WhatsApp
            const mensajeWhatsApp = `Formulario de Contacto PowerLab%0A%0ANombre: ${nombre} ${apellido}%0AEmail: ${email}%0AMensaje: ${mensaje}`;
            
            // Abrir WhatsApp con el mensaje
            window.open(`https://wa.me/51994379232?text=${mensajeWhatsApp}`, '_blank');
            
            // Opcional: Limpiar el formulario
            contactForm.reset();
            
            // Opcional: Mostrar un mensaje de éxito
            alert('¡Gracias por tu mensaje! Te responderemos a la brevedad.');
        });
    }
    
    // Manejar las preguntas frecuentes
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            question.addEventListener('click', () => {
                // Cerrar todas las demás respuestas
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                        otherItem.querySelector('.faq-toggle').textContent = '+';
                    }
                });
                
                // Alternar la respuesta actual
                item.classList.toggle('active');
                const toggle = item.querySelector('.faq-toggle');
                toggle.textContent = item.classList.contains('active') ? '−' : '+';
            });
        });
    }
});