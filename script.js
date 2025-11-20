// 1. Base de datos de productos (Array de Objetos)
const products = [
    { id: 1, name: "Pan Francés", price: 0.40 },
    { id: 2, name: "Pan Yema", price: 0.50 },
    { id: 3, name: "Ciabatta", price: 0.60 },
    { id: 4, name: "Pastel de Acelga", price: 3.50 },
    { id: 5, name: "Empanada Pollo", price: 4.00 },
    { id: 6, name: "Alfajor", price: 1.50 },
    { id: 7, name: "Keke de Naranja", price: 2.00 },
    { id: 8, name: "Chafainita (Pan)", price: 2.50 }
];

// Variable para guardar lo que el cliente compra
let cart = [];

// 2. Función para dibujar los productos en el HTML al cargar
function renderProducts() {
    const productList = document.getElementById("product-list");
    
    products.forEach(product => {
        // Creamos una "tarjeta" para cada pan
        const card = document.createElement("div");
        card.classList.add("card");
        
        // Usamos emojis como imágenes para no complicarnos con archivos externos
        card.innerHTML = `
            <h3>${product.name}</h3>
            <p class="price">S/ ${product.price.toFixed(2)}</p>
            <button class="btn-add" onclick="addToCart(${product.id})">Agregar +</button>
        `;
        
        productList.appendChild(card);
    });
}

// 3. Función para agregar al carrito
function addToCart(id) {
    // Buscar el producto en la "base de datos"
    const product = products.find(p => p.id === id);
    
    // Agregarlo a la lista del carrito
    cart.push(product);
    
    // Actualizar la vista del carrito
    updateCart();
}

// 4. Función para actualizar la lista visual y el total
function updateCart() {
    const cartList = document.getElementById("cart-items");
    const totalSpan = document.getElementById("total-price");
    
    // Limpiar lista anterior
    cartList.innerHTML = "";
    
    let total = 0;

    cart.forEach((item, index) => {
        const li = document.createElement("li");
        li.innerHTML = `${item.name} <span>S/ ${item.price.toFixed(2)}</span>`;
        cartList.appendChild(li);
        
        // Sumar al total
        total += item.price;
    });

    // Si está vacío
    if (cart.length === 0) {
        cartList.innerHTML = '<li class="empty-msg">Tu canasta está vacía</li>';
    }

    // Mostrar total con 2 decimales
    totalSpan.innerText = total.toFixed(2);
}

// 5. Función para simular el cobro
function payOrder() {
    if (cart.length > 0) {
        const total = document.getElementById("total-price").innerText;
        alert(`¡Gracias por tu compra!\nEl total a pagar es: S/ ${total}\n\n(Pedido enviado a cocina 👨‍🍳)`);
        clearCart();
    } else {
        alert("La canasta está vacía. Agrega productos primero.");
    }
}

// 6. Función para limpiar
function clearCart() {
    cart = [];
    updateCart();
}

// Iniciar la tienda
renderProducts();