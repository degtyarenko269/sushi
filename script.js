document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();
    loadProducts();
});

function loadProducts() {
    fetch("products.json")
        .then(response => response.json())
        .then(products => renderProducts(products))
        .catch(error => console.error("Ошибка загрузки:", error));
}

function renderProducts(products) {
    const container = document.getElementById("items-container");

    products.forEach(product => {
        const itemDiv = document.createElement("div");
        itemDiv.className = "item";

        itemDiv.innerHTML = `
        <img src="${product.image}" alt="${product.name}" />
        <h3>${product.name}</h3>
        <p>${product.description} • ${product.price} грн</p>
        <button onclick="addToCart('${product.name}')">Добавить</button>
      `;

        container.appendChild(itemDiv);
    });
}

function addToCart(itemName) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(itemName);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${itemName} додано до кошика!`);
    updateCartCount();
}

function updateCartCount() {
    const cartCount = document.getElementById("cart-count");
    if (cartCount) {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        cartCount.textContent = cart.length;
    }
}
