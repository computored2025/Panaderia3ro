/* ============================================================
   1. NÚMERO DE WHATSAPP AL QUE SE ENVIARÁ EL PEDIDO
   (Solo cambia el número si quieres que vaya a otro celular)
============================================================ */
const numeroWhatsApp = "51971099012";

/* ============================================================
   2. BASE DE DATOS DE PRODUCTOS
   Cada producto tiene:
   - id: número único
   - name: nombre del pan
   - price: precio
   - img: imagen del pan
============================================================ */
const products = [
    { 
        id: 1, 
        name: "Pan Francés Crocante", 
        price: 0.50,
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

/* ============================================================
   3. EL CARRITO DE COMPRAS
   Aquí se guardan los productos que el usuario va agregando.
   Inicialmente está vacío.
============================================================ */
let cart = [];

/* ============================================================
   4. FUNCIÓN PARA CREAR LAS TARJETAS DE PRODUCTOS EN LA PÁGINA
   (Se llama automáticamente cuando carga la página)
============================================================ */
function renderProducts() {
    const productList = document.getElementById("product-list");
    productList.innerHTML = ""; // Limpiamos para no duplicar cosas
    
    // Recorremos todos los productos y creamos sus tarjetas
    products.forEach(product => {
        const card = document.createElement("div");
        card.classList.add("card");
        
        // Plantilla HTML de cada producto
        card.innerHTML = `
            <div class="card-image-container">
                <img src="${product.img}" 
                     alt="${product.name}" 
                     class="card-img"
                     onerror="this.src='https://placehold.co/500x300?text=Pan+Delicioso'">
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

/* ============================================================
   5. FUNCIÓN PARA AGREGAR PRODUCTOS AL CARRITO
   Si el producto ya está → suma 1 cantidad
   Si no está → lo agrega por primera vez
============================================================ */
function addToCart(id) {
    const product = products.find(p => p.id === id); // Buscamos el producto en la lista
    
    const existingItem = cart.find(item => item.id === id); // ¿Ya está en el carrito?

    if (existingItem) {
        // Si ya está, aumentamos la cantidad
        existingItem.quantity++;
    } else {
        // Si no está, lo agregamos con cantidad 1
        cart.push({ ...product, quantity: 1 });
    }

    updateCart(); // Actualizamos la vista
}

/* ============================================================
   6. FUNCIÓN PARA MOSTRAR LOS PRODUCTOS DENTRO DEL CARRITO
   También calcula el total a pagar.
============================================================ */
function updateCart() {
    const cartList = document.getElementById("cart-items");
    const totalSpan = document.getElementById("total-price");
    
    cartList.innerHTML = "";
    let total = 0;

    // Recorremos todo el carrito
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity; // Subtotal por producto
        total += itemTotal; // Sumamos al total final

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

    // Si no hay productos mostramos un mensaje
    if (cart.length === 0) {
        cartList.innerHTML = '<li class="empty-msg">Tu canasta está vacía</li>';
    }

    // Mostramos el precio total
    totalSpan.innerText = total.toFixed(2);
}

/* ============================================================
   7. FUNCIÓN PARA ENVIAR EL PEDIDO A WHATSAPP
   Crea un mensaje y abre WhatsApp automáticamente.
============================================================ */
function payOrder() {
    if (cart.length === 0) {
        alert("⚠️ La canasta está vacía.");
        return;
    }

    const total = document.getElementById("total-price").innerText;

    // Empezamos a crear el mensaje
    let mensaje = "Hola Panadería Los Brothers, quiero pedir:%0A%0A";

    cart.forEach(item => {
        mensaje += `- ${item.name} (x${item.quantity}) = S/ ${(item.price * item.quantity).toFixed(2)}%0A`;
    });

    mensaje += `%0A*Total a Pagar: S/ ${total}*`;
    mensaje += "%0A%0AMétodo de pago: Yape / Plin";

    // Abrimos WhatsApp en una nueva pestaña
    window.open(`https://wa.me/${numeroWhatsApp}?text=${mensaje}`, '_blank');
}

/* ============================================================
   8. FUNCIÓN PARA LIMPIAR EL CARRITO
============================================================ */
function clearCart() {
    cart = [];    // Vaciamos el carrito
    updateCart(); // Actualizamos la vista
}

/* ============================================================
   9. INICIAR LA TIENDA
   Apenas carga la página, dibujamos los productos.
============================================================ */
renderProducts();
