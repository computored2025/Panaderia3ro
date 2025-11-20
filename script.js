// 1. Base de datos con IMÁGENES (URLs)
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
        img: "https://images.unsplash.com/photo-1608656241606-17c807181d81?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
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
        img: "https://images.unsplash.com/photo-1621252307832-40a3596d4c22?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
    },
    { 
        id: 5, 
        name: "Empanada de Carne", 
        price: 4.50,
        img: "https://t2.rg.ltmcdn.com/es/images/5/0/2/empanadas_de_carne_fritas_55205_600.jpg"
    },
    { 
        id: 6, 
        name: "Alfajor Artesanal", 
        price: 2.00,
        img: "https://images.unsplash.com/photo-1600331216135-619985421679?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
    },
    { 
        id: 7, 
        name: "Pan de Molde Integral", 
        price: 6.50,
        img: "https://images.unsplash.com/photo-1598373182133-52452f769140?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
    },
    { 
        id: 8, 
        name: "Baguette Tradicional", 
        price: 3.50,
        img: "https://images.unsplash.com/photo-1597393353365-92f33940d601?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
    }
];

let cart = [];

// 2. Función para dibujar los productos (Ahora con imagen)
function renderProducts() {
    const productList = document.getElementById("product-list");
    
    products.forEach(product => {
        const card = document.createElement("div");
        card.classList.add("card");
        
        // Hemos modificado el HTML interno para incluir la etiqueta <img>
        card.innerHTML = `
            <div class="card-image-container">
                <img src="${product.img}" alt="${product.name}" class="card-img">
            </div>
            <div class="card-content">
                <h3>${product.name}</h3>
                <span class="price">S/ ${product.price.toFixed(2)}</span>
                <button class="btn-add" onclick="addToCart(${product.id})">Agregar al pedido</button>
            </div>
        `;
        
        productList.appendChild(card);
    });
}

// (El resto de la lógica es igual que la versión anterior, ¡porque funciona bien!)

function addToCart(id) {
    const product = products.find(p => p.id === id);
    cart.push(product);
    updateCart();
}

function updateCart() {
    const cartList = document.getElementById("cart-items");
    const totalSpan = document.getElementById("total-price");
    cartList.innerHTML = "";
    let total = 0;

    cart.forEach((item) => {
        const li = document.createElement("li");
        li.innerHTML = `${item.name} <span>S/ ${item.price.toFixed(2)}</span>`;
        cartList.appendChild(li);
        total += item.price;
    });

    if (cart.length === 0) {
        cartList.innerHTML = '<li class="empty-msg">Selecciona productos...</li>';
    }
    totalSpan.innerText = total.toFixed(2);
}

function payOrder() {
    if (cart.length > 0) {
        const total = document.getElementById("total-price").innerText;
        // Un mensaje más profesional
        alert(`✅ PEDIDO CONFIRMADO\n\nTotal a cobrar: S/ ${total}\n\nGracias por comprar en "Los Brothers"`);
        clearCart();
    } else {
        alert("⚠️ La boleta está vacía. Agrega productos primero.");
    }
}

function clearCart() {
    cart = [];
    updateCart();
}

renderProducts();