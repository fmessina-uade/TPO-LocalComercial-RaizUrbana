document.addEventListener('DOMContentLoaded', function () {
    const productos = [
        { nombre: 'Monstera deliciosa', precio: 28500, desc: 'Hojas grandes. Luz media/alta y riego moderado.', tag: 'Interior', img: 'monstera-deliciosa.webp' },
        { nombre: 'Sansevieria', precio: 15900, desc: 'Muy resistente. Perfecta para principiantes.', tag: 'Bajo riego', img: 'sansevieria.jpg' },
        { nombre: 'Potos dorado', precio: 12500, desc: 'Trepadora colgante. Luz media.', tag: 'Macetas 12', img: 'potos-dorado.webp' },
        { nombre: 'Cactus mix', precio: 8200, desc: 'Variedades pequeñas para escritorio.', tag: 'Pack x3', img: 'cactus-mix.jpg' },
        { nombre: 'Maceta cemento M', precio: 6700, desc: 'Hecha a mano con drenaje.', tag: 'Local', img: 'maceta-cemento-m.webp' },
        { nombre: 'Sustrato universal 5L', precio: 4100, desc: 'Mezcla aireada para interior.', tag: 'Insumos', img: 'sustrato-universal.jpeg' },
        { nombre: 'Ficus lyrata', precio: 32000, desc: 'Árbol de interior con hojas grandes y llamativas.', tag: 'Interior', img: 'ficus-Lyrata.jpg' },
        { nombre: 'Calathea orbifolia', precio: 22000, desc: 'Hojas redondas con rayas plateadas. Necesita humedad.', tag: 'Humedad alta', img: 'Calathea-orbifolia.jpg' },
        { nombre: 'Helecho de Boston', precio: 18500, desc: 'Frondas arqueadas y plumosas. Ideal para colgar.', tag: 'Sombra', img: 'helecho-de-boston.webp' },
        { nombre: 'Orquídea Phalaenopsis', precio: 25000, desc: 'Flores elegantes y duraderas. Riego cuidadoso.', tag: 'Flores', img: 'Orquídea Phalaenopsis.jpg' },
        { nombre: 'Suculenta Echeveria', precio: 5500, desc: 'Forma de roseta. Necesita mucho sol.', tag: 'Pleno sol', img: 'Suculenta Echeveria.jpeg' },
        { nombre: 'Bonsái Ficus Ginseng', precio: 45000, desc: 'Tronco grueso y raíces aéreas. Arte en miniatura.', tag: 'Bonsái', img: 'Bonsái Ficus Ginseng.avif' },
        { nombre: 'Palmera Areca', precio: 29000, desc: 'Purifica el aire. Hojas plumosas y elegantes.', tag: 'Purificadora', img: 'Palmera Areca.avif' },
        { nombre: 'Cinta (Malamadre)', precio: 9500, desc: 'Fácil de cuidar y propagar. Hojas variegadas.', tag: 'Principiantes', img: 'Cinta (Malamadre).avif' },
        { nombre: 'Anturio rojo', precio: 21000, desc: 'Flores rojas brillantes en forma de corazón.', tag: 'Flores', img: 'Anturio rojo.jpeg' },
        { nombre: 'Zamioculca', precio: 26000, desc: 'Planta "indestructible". Tolera poca luz y sequía.', tag: 'Poca luz', img: 'Zamioculca.jpeg' },
        { nombre: 'Maceta de terracota', precio: 3500, desc: 'Material poroso que ayuda a la transpiración.', tag: 'Macetas', img: 'Maceta de terracota.jpg' },
        { nombre: 'Regadera de metal', precio: 7500, desc: 'Diseño vintage y funcional. Capacidad de 1.5L.', tag: 'Accesorios', img: 'Regadera de metal.webp' },
        { nombre: 'Tijeras de podar', precio: 5200, desc: 'Acero inoxidable. Ideales para mantenimiento.', tag: 'Herramientas', img: 'Tijeras de podar.webp' },
        { nombre: 'Fertilizante líquido', precio: 3800, desc: 'Para plantas de interior. Aplicar cada 15 días.', tag: 'Insumos', img: 'Fertilizante líquido.webp' }
    ];

    const productosContainer = document.getElementById('productos-container');
    const paginacionContainer = document.getElementById('paginacion');
    const productosPorPagina = 6;
    let paginaActual = 1;

    function mostrarProductos(pagina) {
        productosContainer.innerHTML = '';
        paginaActual = pagina;

        const inicio = (pagina - 1) * productosPorPagina;
        const fin = inicio + productosPorPagina;
        const productosPagina = productos.slice(inicio, fin);

        productosPagina.forEach(producto => {
            const productoHTML = `
                <div class="col-12 col-sm-6 col-lg-4">
                    <article class="card product-card h-100">
                        <div class="product-media ratio ratio-16x9">
                            <img src="assets/${producto.img}" alt="${producto.nombre}">
                        </div>
                        <div class="card-body d-flex flex-column">
                            <h3 class="h5">${producto.nombre}</h3>
                            <p class="card-text flex-grow-1 text-muted">${producto.desc}</p>
                            <div class="product-foot">
                                <span class="price">$${producto.precio.toLocaleString('es-AR')}</span>
                                <span class="product-tag">${producto.tag}</span>
                            </div>
                        </div>
                        <div class="card-cta">
                            <a class="btn btn-sm btn-outline-success"
                               target="_blank"
                               href="https://api.whatsapp.com/send?phone=5491161508000&text=Hola%20Ra%C3%ADz%20Urbana%2C%20me%20interesa%20${encodeURIComponent(producto.nombre)}%20(%24${producto.precio.toLocaleString('es-AR')}).%20%C2%BFHay%20stock%3F">Consultar</a>
                        </div>
                    </article>
                </div>
            `;
            productosContainer.innerHTML += productoHTML;
        });
    }

    function setupPaginacion() {
        const totalPaginas = Math.ceil(productos.length / productosPorPagina);
        paginacionContainer.innerHTML = '';

        for (let i = 1; i <= totalPaginas; i++) {
            const li = document.createElement('li');
            li.className = `page-item ${i === paginaActual ? 'active' : ''}`;
            const a = document.createElement('a');
            a.className = 'page-link';
            a.href = '#';
            a.innerText = i;
            a.addEventListener('click', (e) => {
                e.preventDefault();
                mostrarProductos(i);
                setupPaginacion();
            });
            li.appendChild(a);
            paginacionContainer.appendChild(li);
        }
    }

    mostrarProductos(1);
    setupPaginacion();
});