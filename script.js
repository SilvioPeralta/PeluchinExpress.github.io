document.querySelectorAll('.btn').forEach(function(btn){
    btn.addEventListener('click', function(e){
        e.preventDefault();
        window.location.href = 'productos.html';
    });
});

// index.html: Generar productos de ejemplo con mismo diseño que productos.html
if (document.getElementById("contenedor")) {
    let html = '';
    for (let i = 0; i < 12; i++) {
        html += `
            <div class="product-card">
                <div class="img-placeholder">Imagen</div>
                <div class="product-title">Producto ${i + 1}</div>
                <div class="product-price">$${(10 + i * 2).toFixed(2)}</div>
                <button class="add-btn">Agregar</button>
            </div>
        `;
    }
    document.getElementById("contenedor").innerHTML = html;
}