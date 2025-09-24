// --- Productos de ejemplo (puedes agregar más o editar) ---
const productos = [
    {
        nombre: "Bob Omb",
        precio: 12000,
        imagen: "peluches/BobOmb/BobOmb1.PNG"
    },
    {
        nombre: "Bowser",
        precio: 15000,
        imagen: "peluches/Bowser/Bowser1.PNG"
    },
    {
        nombre: "Conejo Zanahoria",
        precio: 9000,
        imagen: "peluches/ConejoZanahoria/ConejoZanahoria1.PNG"
    },
    {
        nombre: "DK",
        precio: 11000,
        imagen: "peluches/DK/DK1.PNG"
    },
    {
        nombre: "Gato Emperador",
        precio: 10000,
        imagen: "peluches/GatoEmperador/GatoEmperador1.PNG"
    },
    {
        nombre: "Gato Llavero",
        precio: 6000,
        imagen: "peluches/GatoLLavero/GatoLLavero1.PNG"
    },
    {
        nombre: "Golira",
        precio: 9500,
        imagen: "peluches/Golira/Golira1.PNG"
    },
    {
        nombre: "Hitori Gotou",
        precio: 13000,
        imagen: "peluches/HitoriGotou/bocchi1.webp"
    },
    {
        nombre: "Ikuyo Kita",
        precio: 13000,
        imagen: "peluches/IkuyoKita/Kita1.PNG"
    },
    {
        nombre: "Koopa",
        precio: 11000,
        imagen: "peluches/Koopa/Koopa1.PNG"
    },
    {
        nombre: "Nijika Ijichi",
        precio: 13000,
        imagen: "peluches/NijikaIjichi/Nijika1.PNG"
    },
    {
        nombre: "Palta",
        precio: 8000,
        imagen: "peluches/Palta/Palta1.PNG"
    },
    {
        nombre: "Panda Bambú",
        precio: 12000,
        imagen: "peluches/PandaBambu/PandaBambu1.PNG"
    },
    {
        nombre: "Panda Llavero",
        precio: 6000,
        imagen: "peluches/PandaLlavero/PandaLlavero1.PNG"
    },
    {
        nombre: "Panda Rojo",
        precio: 9500,
        imagen: "peluches/PandaRojo/pandaRojo1.PNG"
    },
    {
        nombre: "Pato Gorro",
        precio: 9000,
        imagen: "peluches/PatoGorro/PatoGorro1.PNG"
    },
    {
        nombre: "Ryo Yamada",
        precio: 13000,
        imagen: "peluches/RyoYamada/ryo1.PNG"
    },
    {
        nombre: "Snoopy",
        precio: 10000,
        imagen: "peluches/Snoopy/Snoopy1.PNG"
    },
    {
        nombre: "Toad",
        precio: 11000,
        imagen: "peluches/Toad/Toad1.PNG"
    },
    {
        nombre: "Yoshi",
        precio: 11000,
        imagen: "peluches/Yoshi/Yoshi1.PNG"
    }
];

// --- Renderizar productos en index.html (destacados) ---
if (document.getElementById("contenedor")) {
    let html = "";
    productos.slice(0, 8).forEach((prod, i) => {
        html += `
        <div class="product-card card">
            <img src="${prod.imagen}" class="img-placeholder card-img-top" alt="${prod.nombre}">
            <div class="card-body text-center">
                <h5 class="product-title card-title">${prod.nombre}</h5>
                <p class="product-price card-text">$${prod.precio.toLocaleString()}</p>
                <button class="btn btn-success btn-agregar add-btn" data-index="${i}">Agregar</button>
            </div>
        </div>
        `;
    });
    document.getElementById("contenedor").innerHTML = html;
}

// --- Renderizar todos los productos en productos.html ---
if (document.getElementById("productos-list")) {
    let html = "";
    productos.forEach((prod, i) => {
        html += `
        <div class="product-card card">
            <img src="${prod.imagen}" class="img-placeholder card-img-top" alt="${prod.nombre}">
            <div class="card-body text-center">
                <h5 class="product-title card-title">${prod.nombre}</h5>
                <p class="product-price card-text">$${prod.precio.toLocaleString()}</p>
                <button class="btn btn-success btn-agregar add-btn" data-index="${i}">Agregar</button>
            </div>
        </div>
        `;
    });
    document.getElementById("productos-list").innerHTML = html;
}

// --- Carrito ---
function getCart() {
    return JSON.parse(localStorage.getItem("cart") || "[]");
}
function setCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}
function updateCartCount() {
    const cart = getCart();
    document.querySelectorAll("#cart-count").forEach(el => el.textContent = cart.reduce((a, b) => a + b.cantidad, 0));
}
updateCartCount();

// --- Añadir al carrito ---
function addToCart(index) {
    const cart = getCart();
    const prod = productos[index];
    const found = cart.find(item => item.nombre === prod.nombre);
    if (found) {
        found.cantidad += 1;
    } else {
        cart.push({ ...prod, cantidad: 1 });
    }
    setCart(cart);
}

// --- Botones "Agregar" ---
document.addEventListener("click", function(e) {
    if (e.target.classList.contains("add-btn")) {
        const idx = e.target.getAttribute("data-index");
        addToCart(idx);
        e.target.textContent = "¡Agregado!";
        setTimeout(() => { e.target.textContent = "Agregar"; }, 1000);
    }
});

// --- Mostrar carrito en cart.html ---
if (document.getElementById("cart-items")) {
    renderCart();
    document.getElementById("clear-cart-btn").onclick = function() {
        setCart([]);
        renderCart();
    };
    document.getElementById("checkout-btn").onclick = function() {
        setCart([]);
        renderCart();
        const msg = document.getElementById("cart-message");
        msg.textContent = "¡Gracias por tu compra!";
        msg.classList.remove("d-none");
        setTimeout(() => msg.classList.add("d-none"), 3000);
    };
}
function renderCart() {
    const cart = getCart();
    let html = "";
    let total = 0;
    if (cart.length === 0) {
        html = `<div class="alert alert-info">Tu carrito está vacío.</div>`;
    } else {
        cart.forEach((item, i) => {
            total += item.precio * item.cantidad;
            html += `
            <div class="row align-items-center mb-3">
                <div class="col-2"><img src="${item.imagen}" alt="${item.nombre}" style="width:60px"></div>
                <div class="col-4">${item.nombre}</div>
                <div class="col-2">$${item.precio.toLocaleString()}</div>
                <div class="col-2">
                    <input type="number" min="1" value="${item.cantidad}" class="form-control form-control-sm cart-qty" data-index="${i}">
                </div>
                <div class="col-2">
                    <button class="btn btn-danger btn-sm remove-cart-item" data-index="${i}">Eliminar</button>
                </div>
            </div>
            `;
        });
    }
    document.getElementById("cart-items").innerHTML = html;
    document.getElementById("cart-total").textContent = total.toLocaleString();

    // Eventos cantidad y eliminar
    document.querySelectorAll(".cart-qty").forEach(input => {
        input.onchange = function() {
            const idx = this.getAttribute("data-index");
            const cart = getCart();
            cart[idx].cantidad = parseInt(this.value) || 1;
            setCart(cart);
            renderCart();
        };
    });
    document.querySelectorAll(".remove-cart-item").forEach(btn => {
        btn.onclick = function() {
            const idx = this.getAttribute("data-index");
            const cart = getCart();
            cart.splice(idx, 1);
            setCart(cart);
            renderCart();
        };
    });
}

// --- Registro de usuario ---
(function () {
    'use strict';
    var form = document.getElementById('registerForm');
    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            event.stopPropagation();

            document.getElementById('registerSuccess').classList.add('d-none');
            document.getElementById('registerError').classList.add('d-none');

            if (!form.checkValidity()) {
                form.classList.add('was-validated');
                return;
            }

            let correo = form.correo.value.trim();
            let correo2 = form.correo2.value.trim();
            let pass = form.password.value;
            let pass2 = form.password2.value;
            let valid = true;

            if (correo !== correo2) {
                form.correo2.setCustomValidity("Los correos no coinciden");
                valid = false;
            } else {
                form.correo2.setCustomValidity("");
            }
            if (pass !== pass2) {
                form.password2.setCustomValidity("Las contraseñas no coinciden");
                valid = false;
            } else {
                form.password2.setCustomValidity("");
            }
            if (!valid) {
                form.classList.add('was-validated');
                return;
            }

            let users = JSON.parse(localStorage.getItem('usuarios') || '[]');
            if (users.some(u => u.correo === correo)) {
                document.getElementById('registerError').classList.remove('d-none');
                return;
            }
            users.push({
                nombre: form.nombre.value.trim(),
                correo: correo,
                password: pass,
                telefono: form.telefono.value.trim(),
                region: form.region.value,
                comuna: form.comuna.value
            });
            localStorage.setItem('usuarios', JSON.stringify(users));

            form.reset();
            form.classList.remove('was-validated');
            document.getElementById('registerSuccess').classList.remove('d-none');
        });

        form.correo2.addEventListener('input', function () {
            form.correo2.setCustomValidity("");
        });
        form.password2.addEventListener('input', function () {
            form.password2.setCustomValidity("");
        });
    }
})();

// --- Login de usuario ---
(function () {
    'use strict';
    var form = document.getElementById('loginForm');
    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            event.stopPropagation();

            document.getElementById('loginSuccess').classList.add('d-none');
            document.getElementById('loginError').classList.add('d-none');

            if (!form.checkValidity()) {
                form.classList.add('was-validated');
                return;
            }

            let correo = form.correo.value.trim();
            let pass = form.password.value;
            let users = JSON.parse(localStorage.getItem('usuarios') || '[]');
            let user = users.find(u => u.correo === correo && u.password === pass);

            if (user) {
                document.getElementById('loginSuccess').classList.remove('d-none');
                setTimeout(() => {
                    window.location.href = "index.html";
                }, 1200);
            } else {
                document.getElementById('loginError').classList.remove('d-none');
            }
        });
    }
})();

//contacto
(function () {
    var form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            event.stopPropagation();

            document.getElementById('contactSuccess').classList.add('d-none');

            if (!form.checkValidity()) {
                form.classList.add('was-validated');
                return;
            }

            form.reset();
            form.classList.remove('was-validated');
            document.getElementById('contactSuccess').classList.remove('d-none');
        });
    }
})();