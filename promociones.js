document.addEventListener('DOMContentLoaded', function () {
    const productos = [
        // Productos existentes
        { id: 1, nombre: 'Monstera deliciosa', precio: 28500, img: 'monstera-deliciosa.webp', promo3x2: false },
        { id: 2, nombre: 'Sansevieria', precio: 15900, img: 'sansevieria.jpg', promo3x2: true },
        { id: 3, nombre: 'Potos dorado', precio: 12500, img: 'potos-dorado.webp', promo3x2: true },
        { id: 4, nombre: 'Cactus mix', precio: 8200, img: 'cactus-mix.jpg', promo3x2: true },
        { id: 5, nombre: 'Maceta cemento M', precio: 6700, img: 'maceta-cemento-m.webp', promo3x2: false },
        { id: 6, nombre: 'Sustrato universal 5L', precio: 4100, img: 'sustrato-universal.jpeg', promo3x2: true },
        { id: 7, nombre: 'Ficus lyrata', precio: 32000, img: 'ficus-Lyrata.jpg', promo3x2: false },
        { id: 8, nombre: 'Calathea orbifolia', precio: 22000, img: 'Calathea-orbifolia.jpg', promo3x2: false },
        { id: 9, nombre: 'Helecho de Boston', precio: 18500, img: 'helecho-de-boston.webp', promo3x2: true },
        { id: 10, nombre: 'Orquídea Phalaenopsis', precio: 25000, img: 'orquidea-phalaenopsis.jpg', promo3x2: false },
        { id: 11, nombre: 'Suculenta Echeveria', precio: 5500, img: 'Suculenta Echeveria.jpeg', promo3x2: true },
        { id: 12, nombre: 'Bonsái Ficus Ginseng', precio: 45000, img: 'bonsái-ficus-ginseng.avif', promo3x2: false },
        { id: 13, nombre: 'Palmera Areca', precio: 29000, img: 'Palmera Areca.avif', promo3x2: false },
        { id: 14, nombre: 'Cinta (Malamadre)', precio: 9500, img: 'Cinta (Malamadre).avif', promo3x2: true },
        { id: 15, nombre: 'Anturio rojo', precio: 21000, img: 'Anturio rojo.jpeg', promo3x2: false },
        { id: 16, nombre: 'Zamioculca', precio: 26000, img: 'Zamioculca.jpeg', promo3x2: false },
        { id: 17, nombre: 'Maceta de terracota', precio: 3500, img: 'Maceta de terracota.jpg', promo3x2: true },
        { id: 18, nombre: 'Regadera de metal', precio: 7500, img: 'Regadera de metal.webp', promo3x2: false },
        { id: 19, nombre: 'Tijeras de podar', precio: 5200, img: 'Tijeras de podar.webp', promo3x2: true },
        { id: 20, nombre: 'Fertilizante líquido', precio: 3800, img: 'fertilizante-líquido.webp', promo3x2: true }
    ];

    const modalProductosLista = document.getElementById('modal-productos-lista');
    const productosSeleccionadosContainer = document.getElementById('productos-seleccionados');
    const confirmarSeleccionBtn = document.getElementById('confirmar-seleccion');
    const calcularBtn = document.getElementById('calcular-btn');
    const spinner = calcularBtn.querySelector('.spinner-border');
    const promocionSelect = document.getElementById('promocion');

    let carrito = new Map();

    function getTotalItems() {
        let total = 0;
        carrito.forEach(quantity => total += quantity);
        return total;
    }

    function actualizarEstadoBotones() {
        const totalItems = getTotalItems();
        const allIncrementButtons = modalProductosLista.querySelectorAll('[data-action="increment"]');
        allIncrementButtons.forEach(btn => {
            btn.disabled = totalItems >= 3;
        });
    }

    productos.forEach(producto => {
        const apto3x2Badge = producto.promo3x2 ? '<span class="badge bg-info text-dark ms-2">Apto 3x2</span>' : '';
        const productoHTML = `
            <div class="col-12 col-md-6">
                <div class="product-option d-flex justify-content-between align-items-center">
                    <div class="d-flex align-items-center">
                        <img src="assets/${producto.img}" alt="${producto.nombre}" class="me-2" width="40" height="40" style="object-fit: cover; border-radius: .25rem;">
                        <div>
                            <div class="fw-bold">${producto.nombre}${apto3x2Badge}</div>
                            <div class="text-muted">$${producto.precio.toLocaleString('es-AR')}</div>
                        </div>
                    </div>
                    <div class="quantity-control d-flex align-items-center">
                        <button type="button" class="btn btn-sm btn-outline-secondary" data-action="decrement" data-id="${producto.id}">-</button>
                        <span class="quantity mx-2" data-id="${producto.id}">0</span>
                        <button type="button" class="btn btn-sm btn-outline-secondary" data-action="increment" data-id="${producto.id}">+</button>
                    </div>
                </div>
            </div>
        `;
        modalProductosLista.innerHTML += productoHTML;
    });

    modalProductosLista.addEventListener('click', function(e) {
        if (e.target.dataset.action === 'increment' || e.target.dataset.action === 'decrement') {
            const productId = parseInt(e.target.dataset.id);
            const quantitySpan = modalProductosLista.querySelector(`.quantity[data-id='${productId}']`);
            let currentQuantity = carrito.get(productId) || 0;

            if (e.target.dataset.action === 'increment') {
                if (getTotalItems() < 3) {
                    currentQuantity++;
                }
            } else {
                currentQuantity = Math.max(0, currentQuantity - 1);
            }

            if (currentQuantity > 0) {
                carrito.set(productId, currentQuantity);
            } else {
                carrito.delete(productId);
            }

            quantitySpan.textContent = currentQuantity;
            actualizarEstadoBotones();
        }
    });

    function actualizarPromocionesDisponibles() {
        const promo3x2Option = promocionSelect.querySelector('option[value="promo2"]');
        let habilitar3x2 = true;
        if (carrito.size > 0) {
            for (const productId of carrito.keys()) {
                const producto = productos.find(p => p.id === productId);
                if (!producto.promo3x2) {
                    habilitar3x2 = false;
                    break;
                }
            }
        } else {
            habilitar3x2 = true; // Si no hay productos, la opción debe estar habilitada
        }
        promo3x2Option.disabled = !habilitar3x2;
        if (!habilitar3x2 && promocionSelect.value === 'promo2') {
            promocionSelect.value = 'ninguna';
        }
    }

    confirmarSeleccionBtn.addEventListener('click', () => {
        mostrarProductosSeleccionados();
        actualizarPromocionesDisponibles();
        // Activar o desactivar el botón de calcular
        calcularBtn.disabled = carrito.size === 0;
    });

    function mostrarProductosSeleccionados() {
        productosSeleccionadosContainer.innerHTML = '';
        if (carrito.size > 0) {
            const lista = document.createElement('ul');
            lista.className = 'list-group';
            carrito.forEach((quantity, productId) => {
                const producto = productos.find(p => p.id === productId);
                const li = document.createElement('li');
                li.className = 'list-group-item d-flex justify-content-between align-items-center';
                li.innerHTML = `<span>${producto.nombre} <span class="text-muted">x${quantity}</span></span><span class="fw-bold">$${(producto.precio * quantity).toLocaleString('es-AR')}</span>`;
                lista.appendChild(li);
            });
            productosSeleccionadosContainer.appendChild(lista);
        } else {
            productosSeleccionadosContainer.innerHTML = '<p class="text-center text-muted">Aún no has seleccionado productos.</p>';
        }
    }

    const calculator = document.getElementById('promo-calculator');
    const resultadosDiv = document.getElementById('resultados');
    const totalSinDescuentoSpan = document.getElementById('total-sin-descuento');
    const descuentoSpan = document.getElementById('descuento');
    const totalFinalSpan = document.getElementById('total-final');

    calcularBtn.addEventListener('click', function () {
        spinner.style.display = 'inline-block';
        calcularBtn.disabled = true;

        setTimeout(() => {
            const precios = [];
            carrito.forEach((quantity, productId) => {
                const producto = productos.find(p => p.id === productId);
                for (let i = 0; i < quantity; i++) {
                    precios.push(producto.precio);
                }
            });

            if (precios.length === 0) {
                alert('Por favor, seleccioná al menos un producto.');
                spinner.style.display = 'none';
                // No es necesario reactivar el botón aquí, ya que debería estar desactivado si no hay productos
                return;
            }

            let totalSinDescuento = precios.reduce((acc, curr) => acc + curr, 0);
            let descuento = 0;
            let error = false;

            switch (promocionSelect.value) {
                case 'promo1':
                    if (precios.length < 2) {
                        alert('La promoción 2x1 requiere al menos 2 productos.');
                        error = true;
                    } else {
                        descuento = Math.min(...precios) * 0.5;
                    }
                    break;
                case 'promo2':
                    if (precios.length < 3) {
                        alert('La promoción 3x2 requiere 3 productos.');
                        error = true;
                    } else {
                        descuento = Math.min(...precios);
                    }
                    break;
                case 'promo3':
                    if (totalSinDescuento <= 30000) {
                        alert('El 10% OFF se activa en compras superiores a $30.000.');
                        error = true;
                    } else {
                        descuento = totalSinDescuento * 0.10;
                    }
                    break;
            }

            if (!error) {
                const totalFinal = totalSinDescuento - descuento;
                totalSinDescuentoSpan.textContent = `$${totalSinDescuento.toLocaleString('es-AR')}`;
                descuentoSpan.textContent = `$${descuento.toLocaleString('es-AR')}`;
                totalFinalSpan.textContent = `$${totalFinal.toLocaleString('es-AR')}`;
                resultadosDiv.style.display = 'block';
            } else {
                resultadosDiv.style.display = 'none';
            }

            spinner.style.display = 'none';
            // Reactivar el botón solo si hay productos seleccionados
            calcularBtn.disabled = carrito.size === 0;
        }, 500);
    });

    // Inicializar el estado del botón al cargar la página
    calcularBtn.disabled = carrito.size === 0;
    mostrarProductosSeleccionados();
    actualizarPromocionesDisponibles();
});