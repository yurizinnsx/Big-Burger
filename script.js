const menu = document.getElementById("menu");
const cartBtn = document.getElementById("cart-btn");
const cartModal = document.getElementById("cart-modal");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout-btn");
const closeModalBtn = document.getElementById("close-modal-btn");
const cartCounter = document.getElementById("cart-count");
const addressInput = document.getElementById("address");
const addressWarn = document.getElementById("address-warn");

let cart = [];

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

  cart.forEach((item) => {
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
          <button class="text-red-500 hover:underline" onclick="removeItemCart('${item.name}')">Remover</button>
        </div>
      </div>
  
    `;

    cartItemsContainer.appendChild(cartItemElement);
  });

  cartTotal.innerText = `Total: R$${total.toFixed(2)}`;
  cartCounter.innerText = cart.length;
}

// Remove 1 unidade ou o item inteiro do carrinho
function removeItemCart(name) {
  const index = cart.findIndex(item => item.name === name);

  if (index !== -1) {
    const item = cart[index];

    if (item.quantity > 1) {
      item.quantity -= 1;
    } else {
      cart.splice(index, 1);
    }

    updateCartModal();
  }
}

addressInput.addEventListener("input", function (event) {
  let inputValue = event.target.value;

})

checkoutBtn.addEventListener("click", function () {

// const isOpen = checkRestaurantOpen();
// if (!isOpen) {
// alert("RESTAURANTE FECHADO MO MOMENTO")
// }

  if (cart.length === 0) return;
  if (addressInput.value.trim() === "") {
    addressWarn.classList.remove("hidden");
    addressInput.classList.add("border-red-500");
    return;
  } else {
    addressWarn.classList.add("hidden");
    addressInput.classList.remove("border-red-500");
  }
  
// Enviar o pedido para api whatsapp

const cartItems = cart.map((item)=>{
return(
  `${item.name} Quantidade: (${item.quantity}) Preço: R$${item.price}|`
)
}).join("")

const message = encodeURIComponent(cartItems)
const phone = "21999295346"

window.open(`https://wa.me/${phone}?text=${message} Endereço: ${addressInput.value}`,"blank")

})

function checkRestaurantOpen() {
  const data = new Date()
  const hora = data.getHours()
  return hora >= 18 && hora < 22 ;

}

const spanItem = document.getElementById("date-span")
const isOpen = checkRestaurantOpen()
if (isOpen) {
  spanItem.classList.remove("bg-red-500")
  spanItem.classList.add("bg-green-600")
}else{
  spanItem.classList.remove("bg-green-600")
  spanItem.classList.add("bg-red-500")
}