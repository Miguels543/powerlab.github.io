# 📊 Admin Dashboard - PowerLab

## 🎯 Descripción
Panel de administración completo para gestionar productos, ver registros de usuarios y seguimiento de compras. Todos los datos se guardan en **localStorage** del navegador (no requiere servidor).

---

## 🚀 Acceso al Dashboard

### Opción 1: Abrir directamente desde archivo
1. Localiza el archivo `admin.html` en la carpeta raíz del proyecto
2. Arrastra el archivo al navegador o abre con doble clic
3. La URL será similar a: `file:///C:/...../admin.html`

### Opción 2: Usar servidor local (recomendado)
Si tienes Node.js y npm instalados:
```bash
npm install -g http-server
cd c:\Users\nexus\OneDrive\Documentos\webs\ecomerce\suplementos\powerlab.github.io-main
http-server
```
Luego accede a: `http://localhost:8080/admin.html`

---

## 📋 Tabs del Dashboard

### 1. 📦 **Productos**
Gestiona el catálogo de productos:
- **Ver todos los productos**: Tabla con ID, Nombre, Categoría, Precio y Stock
- **Editar Precio**: Modifica el precio directamente en la columna "Precio"
- **Editar Stock**: Ajusta la cantidad disponible de cada producto
- **Guardar cambios**: Botón verde para guardar todos los cambios en localStorage
- **Refrescar**: Recarga la tabla desde localStorage
- **Restablecer valores**: Vuelve a cargar el catálogo por defecto (con confirmación)

**⚠️ Importante**: Después de guardar cambios en productos, los clientes deben recargar las páginas de tienda/index para ver los nuevos precios y stock.

---

### 2. 👥 **Usuarios**
Visualiza y gestiona registros de clientes:

#### Estadísticas Rápidas
- **Total de Usuarios**: Cantidad de clientes únicos
- **Total de Compras**: Número total de órdenes realizadas
- **Monto Total**: Ingresos totales en soles peruanos

#### Búsqueda y Filtrado
- Busca usuarios por **nombre** o **celular**
- Los resultados se actualizan en tiempo real mientras escribes

#### Tarjetas de Usuario
Cada usuario muestra:
- **Nombre** del cliente
- **Celular** registrado
- **Dirección** de entrega (si la proporcionó)
- **Número de compras** y **monto invertido**

#### Ver Detalles
- Haz clic en cualquier tarjeta de usuario para ver:
  - Información completa del cliente
  - Todas sus compras (fecha, productos, cantidad, monto)
  - Monto total invertido

---

### 3. 🛒 **Compras**
Historial completo de todas las órdenes realizadas:

#### Información por Compra
Cada compra muestra:
- **# de Compra, Cliente y Celular**
- **Fecha** de la compra
- **Monto total** en soles
- **Lista de productos** comprados (nombre, cantidad, precio unitario)

#### Ordenamiento
Las compras se muestran ordenadas de **más reciente a más antigua**

---

## 💾 Flujo de Datos

### Cómo se Registran las Compras

1. **Cliente agrega productos al carrito** en index.html/tienda.html
2. **Hace clic en "Comprar por WhatsApp"**
3. **Se abre un formulario modal** pidiendo:
   - Nombre
   - Celular
   - Dirección (opcional)
4. **Al enviar el formulario**:
   - Los datos se guardan en localStorage bajo la clave `registrations`
   - Se abre WhatsApp con el resumen de la compra
5. **En el Admin Dashboard**:
   - Los registros aparecen automáticamente en los tabs "Usuarios" y "Compras"

---

## 🔧 Datos en localStorage

### Claves principales:
- **`products`**: Array de productos con ID, nombre, precio, stock, etc.
- **`registrations`**: Array de todas las compras/registros de clientes

### Ver datos directamente (para desarrolladores):
1. Abre el navegador (F12 o DevTools)
2. Ve a **Console**
3. Escribe: `JSON.parse(localStorage.getItem('products'))` o `JSON.parse(localStorage.getItem('registrations'))`

---

## 📱 Responsive
El dashboard está optimizado para:
- ✅ Desktop/Laptop
- ✅ Tablet
- ✅ Móvil

---

## 🎨 Colores y Diseño
- **Azul principal** (#3498db): Usado en headers, botones y highlights
- **Azul oscuro** (#2980b9): Botones en hover y acentos
- **Verde éxito** (#51ff00): Botones de guardar
- **Rojo alerta** (#ff6b6b): Botones peligrosos
- **Fondo claro**: Gradiente suave para mejor experiencia visual

---

## ⚠️ Limitaciones Actuales

1. **Datos solo en navegador**: Si se limpia el cache/localStorage, los datos se pierden
2. **No hay respaldo automático**: Se recomienda descargar periódicamente
3. **No hay autenticación**: Cualquiera con acceso al admin.html puede ver/editar

### Mejoras Futuras Recomendadas:
- [ ] Agregar contraseña básica
- [ ] Descargar registros como CSV
- [ ] Sincronizar con base de datos en la nube
- [ ] Backup automático

---

## 🆘 Troubleshooting

### "No hay usuarios" en la sección de usuarios
**Causa**: Aún no hay compras registradas.  
**Solución**: Realiza una compra de prueba desde index.html/tienda.html

### Los precios no se actualizan en tienda.html
**Causa**: Las páginas están cacheadas en el navegador.  
**Solución**: Presiona **Ctrl+Shift+R** (limpiar cache) o abre en modo incógnito.

### Los datos desaparecen después de cerrar el navegador
**Causa**: localStorage fue borrado o la sesión se limpió.  
**Solución**: Activa configuración en navegador para mantener datos de sitios.

---

## 📞 Contacto
Para consultas sobre el sistema: prlab.shop@hotmail.com

---

**Versión**: 1.0  
**Última actualización**: 9 de febrero de 2026
