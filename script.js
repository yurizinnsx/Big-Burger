const menu = document.getElementById("menu");
const cartBtn = document.getElementById("cart-btn");
const cartModal = document.getElementById("cart-modal");
const cartItemsContainer = document.getElementById("cart-items"); // nome certo aqui!
const cartTotal = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout-btn");
const closeModalBtn = document.getElementById("close-modal-btn");
const cartCounter = document.getElementById("cart-count");
const addressInput = document.getElementById("address");
const addressWarn = document.getElementById("address-warn"); // estava "adress-warn"
const cart = [];

// Abrir carrinho
cartBtn.addEventListener("click", () => {
  cartModal.style.display = "flex";
});

// Fechar carrinho clicando fora
cartModal.addEventListener("click", (event) => {
  if (event.target === cartModal) {
    cartModal.style.display = "none";
  }
});

// Botão de fechar
closeModalBtn.addEventListener("click", () => {
  cartModal.style.display = "none";
});

// Adicionar ao carrinho
menu.addEventListener("click", (event) => {
  const parentButton = event.target.closest(".add-to-cart-btn");
  if (parentButton) {
    const name = parentButton.getAttribute("data-name");
    const price = parseFloat(parentButton.getAttribute("data-price"));
    addToCart(name, price);
  }
});

// Adiciona item ao carrinho
function addToCart(name, price) {
  const existingItem = cart.find(item => item.name === name);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ name, price, quantity: 1 });
  }

  updateCartModal();
}

// Atualiza o conteúdo do modal do carrinho
function updateCartModal() {
  cartItemsContainer.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;

    const cartItemElement = document.createElement("div");
    cartItemElement.classList.add("mb-4");

    cartItemElement.innerHTML = `
      <div class="flex justify-between items-center bg-white shadow p-2 rounded">
        <div>
          <p class="font-bold">${item.name}</p>
          <p>Quantidade: ${item.quantity}</p>
          <p>Preço: R$${(item.price * item.quantity).toFixed(2)}</p>
        </div>
        <div>
          <button class="text-red-500 hover:underline" onclick="removeItem(${index})">Remover</button>
        </div>
      </div>
    `;

    cartItemsContainer.appendChild(cartItemElement);
  });

  // Atualiza valor total no carrinho
  cartTotal.innerText = `Total: R$${total.toFixed(2)}`;

  // Atualiza o contador do ícone
  cartCounter.innerText = cart.length;
}

// Remove item do carrinho
function removeItem(index) {
  cart.splice(index, 1);
  updateCartModal();
}
