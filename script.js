const numeroWhatsApp = "51999999999";
// Base de datos con IMÁGENES (URLs)
const products = [
    { 
        id: 1, 
        name: "Pan Francés Crocante", 
        price: 0.50,
        // Usamos enlaces de Unsplash (imágenes gratuitas de alta calidad)
        img: "https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
    },
    { 
        id: 2, 
        name: "Ciabatta Rústica", 
        price: 0.80,
        img: "https://www.schaer-foodservice.com/wp-content/uploads/ciabatta-rustica-bake-off-header-mobile.jpg"
    },
    { 
        id: 3, 
        name: "Croissant de Mantequilla", 
        price: 2.50,
        img: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
    },
    { 
        id: 4, 
        name: "Pastel de Acelga", 
        price: 4.00,
        img: "https://tofuu.getjusto.com/orioneat-local/resized2/FMALjWTL2s3ZkQS74-2400-x.webp"
    },
    { 
        id: 5, 
        name: "Empanada de Carne", 
        price: 4.50,
        img: "https://tofuu.getjusto.com/orioneat-local/resized2/AMhmzhhvvd3BT2e7N-2400-x.webp"
    },
    { 
        id: 6, 
        name: "Alfajor Artesanal", 
        price: 2.00,
        img: "https://bodegaolcese.pe/recibir-hoy/wp-content/uploads/sites/3/2025/02/alfajor-personal.webp"
    },
    { 
        id: 7, 
        name: "Pan de Molde Integral", 
        price: 6.50,
        img: "https://assets.tmecosys.com/image/upload/t_web_rdp_recipe_584x480_1_5x/img/recipe/ras/Assets/791D03F1-A753-4B51-8208-8935C35F6587/Derivates/bd564d0a-8247-477b-9a52-48f2202d454e.jpg"
    },
    { 
        id: 8, 
        name: "Baguette Tradicional", 
        price: 3.50,
        img: "https://www.marialunarillos.com/blog/wp-content/uploads/2015/04/baguettes-1.jpg"
    }
];

let cart = [];

// 2. Función para dibujar los productos
function renderProducts() {
    const productList = document.getElementById("product-list");
    productList.innerHTML = ""; // Limpiamos para evitar duplicados al recargar
    
    products.forEach(product => {
        const card = document.createElement("div");
        card.classList.add("card");
        
        card.innerHTML = `
            <div class="card-image-container">
                <img src="${product.img}" alt="${product.name}" class="card-img" onerror="this.src='https://placehold.co/500x300?text=Pan+Delicioso'">
            </div>
            <div class="card-content">
                <h3>${product.name}</h3>
                <span class="price">S/ ${product.price.toFixed(2)}</span>
                <button class="btn-add" onclick="addToCart(${product.id})">Agregar +</button>
            </div>
        `;
        
        productList.appendChild(card);
    });
}

// 3. Función MEJORADA para agregar (Agrupa cantidades)
function addToCart(id) {
    const product = products.find(p => p.id === id);
    
    // Buscamos si el producto YA existe en el carrito
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        // Si ya existe, solo aumentamos la cantidad
        existingItem.quantity++;
    } else {
        // Si no existe, lo agregamos con cantidad inicial = 1
        // Usamos {...product} para crear una copia y no modificar el original
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
}

// 4. Función para actualizar la vista del carrito
function updateCart() {
    const cartList = document.getElementById("cart-items");
    const totalSpan = document.getElementById("total-price");
    
    cartList.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const li = document.createElement("li");
        li.innerHTML = `
            <div>
                <strong>${item.name}</strong> <br>
                <small>Cant: ${item.quantity} x S/ ${item.price.toFixed(2)}</small>
            </div>
            <span>S/ ${itemTotal.toFixed(2)}</span>
        `;
        cartList.appendChild(li);
    });

    if (cart.length === 0) {
        cartList.innerHTML = '<li class="empty-msg">Tu canasta está vacía</li>';
    }

    totalSpan.innerText = total.toFixed(2);
}

// 5. Función para enviar a WhatsApp
function payOrder() {
    if (cart.length === 0) {
        alert("⚠️ La canasta está vacía.");
        return;
    }

    const total = document.getElementById("total-price").innerText;

    // Construimos el mensaje de texto
    let mensaje = "Hola Panadería Los Brothers, quiero pedir:%0A%0A"; // %0A es un salto de línea

    cart.forEach(item => {
        // Ejemplo: - Pan Francés (x3) = S/ 1.50
        mensaje += `- ${item.name} (x${item.quantity}) = S/ ${(item.price * item.quantity).toFixed(2)}%0A`;
    });

    mensaje += `%0A*Total a Pagar: S/ ${total}*`;
    mensaje += "%0A%0AMétodo de pago: Yape / Plin";

    // Abrir WhatsApp con el mensaje
    window.open(`https://wa.me/${numeroWhatsApp}?text=${mensaje}`, '_blank');
    
    // Opcional: Limpiar el carrito después de enviar
    // clearCart(); 
}

function clearCart() {
    cart = [];
    updateCart();
}

// Iniciar la tienda
renderProducts();