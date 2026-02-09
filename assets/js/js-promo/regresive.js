// Función para iniciar la cuenta regresiva
function iniciarCuentaRegresiva() {
    // Verificar si ya existe una fecha de promoción guardada
    let fechaPromocion = localStorage.getItem('fechaPromocion');
    
    // Si no existe, o si ya pasó la fecha, crear una nueva fecha
    const ahora = new Date();
    if (!fechaPromocion || new Date(fechaPromocion) <= ahora) {
        fechaPromocion = new Date();
        fechaPromocion.setDate(fechaPromocion.getDate() + 7);
        fechaPromocion.setHours(23, 59, 59, 999);
        
        // Guardar la fecha en localStorage
        localStorage.setItem('fechaPromocion', fechaPromocion.toISOString());
    } else {
        // Convertir la fecha guardada de vuelta a un objeto Date
        fechaPromocion = new Date(fechaPromocion);
    }

    // Función para actualizar la cuenta regresiva
    function actualizarCuentaRegresiva() {
        const ahora = new Date();
        const diferencia = fechaPromocion - ahora;

        // Si la cuenta regresiva ha terminado, reiniciarla
        if (diferencia <= 0) {
            // Crear una nueva fecha para reiniciar la cuenta regresiva
            fechaPromocion = new Date();
            fechaPromocion.setDate(fechaPromocion.getDate() + 7);
            fechaPromocion.setHours(23, 59, 59, 999);
            
            // Guardar la nueva fecha en localStorage
            localStorage.setItem('fechaPromocion', fechaPromocion.toISOString());
            
            // Opcional: mostrar mensaje de reinicio
            console.log('¡Cuenta regresiva reiniciada!');
        }

        // Calcular días, horas, minutos y segundos (siempre positivos)
        const nuevaDiferencia = Math.max(0, fechaPromocion - ahora);
        const dias = Math.floor(nuevaDiferencia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((nuevaDiferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((nuevaDiferencia % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((nuevaDiferencia % (1000 * 60)) / 1000);

        // Actualizar elementos del DOM
        document.getElementById('days').textContent = dias.toString().padStart(2, '0');
        document.getElementById('hours').textContent = horas.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutos.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = segundos.toString().padStart(2, '0');
    }

    // Actualizar inmediatamente y luego cada segundo
    actualizarCuentaRegresiva();
    const intervalo = setInterval(actualizarCuentaRegresiva, 1000);
    
    // Retornar el intervalo por si necesitamos detenerlo en algún momento
    return intervalo;
}

// Iniciar la cuenta regresiva cuando la página se cargue
document.addEventListener('DOMContentLoaded', iniciarCuentaRegresiva);