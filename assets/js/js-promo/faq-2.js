// Script para manejar la interactividad del FAQ
document.addEventListener('DOMContentLoaded', () => {
    // Seleccionar todos los elementos de preguntas del FAQ
    const faqQuestions = document.querySelectorAll('.faq-question');

    // Añadir evento de clic a cada pregunta
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            // Encontrar el elemento padre (faq-item)
            const faqItem = question.closest('.faq-item');
            
            // Alternar la clase 'active' para expandir/contraer
            faqItem.classList.toggle('active');
            
            // Opcional: Cerrar otras preguntas abiertas
            const otherItems = document.querySelectorAll('.faq-item.active');
            otherItems.forEach(item => {
                if (item !== faqItem) {
                    item.classList.remove('active');
                }
            });
        });
    });
});