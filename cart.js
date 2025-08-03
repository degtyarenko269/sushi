document.addEventListener("DOMContentLoaded", () => {
    renderCart();
    updateCartCount();
});

function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

function renderCart() {
    const cartList = document.getElementById("cart-list");
    const cartItems = getCart();
    cartList.innerHTML = "";

    if (cartItems.length === 0) {
        cartList.innerHTML = "<li>Кошик порожній</li>";
        return;
    }

    cartItems.forEach((item, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
        ${item}
        <button onclick="removeFromCart(${index})" style="margin-left: 10px;">Видалити</button>
      `;
        cartList.appendChild(li);
    });
}

function removeFromCart(index) {
    const cartItems = getCart();
    cartItems.splice(index, 1);
    saveCart(cartItems);
    renderCart();
}

function checkout() {
    const cartItems = getCart();
    if (cartItems.length === 0) {
        alert("Кошик порожній");
        return;
    }
    alert("Дякуємо за замовлення!");
    localStorage.removeItem("cart");
    renderCart();
}

function updateCartCount() {
    const count = getCart().length;
    const el = document.getElementById("cart-count");
    if (el) el.textContent = count;
}