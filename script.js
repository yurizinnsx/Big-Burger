const menu = document.getElementById("menu")
const cartBtn = document.getElementById("cart-btn")
const cartModal = document.getElementById("cart-modal")
const cartItens = document.getElementById("cart-items")
const cartTotal = document.getElementById("cart-btn")
const checkoutBtn = document.getElementById("checkout-btn")
const closeModalBtn = document.getElementById("close-modal-btn")
const cartCounter = document.getElementById("cart-count")
const addressInput = document.getElementById("address")
const addressWarn = document.getElementById("adress-warn")


cartBtn.addEventListener("click", function () {
  cartModal.style.display = "flex"
})


cartModal.addEventListener("click", function (event) {
  if (event.target === cartModal) {
    cartModal.style.display = "none"
  }
})

closeModalBtn.addEventListener("click", function () {
  cartModal.style.display = "none"
})

menu.addEventListener("click", function (event) {
  // console.log(event.target)
  let parentbutton = event.target.closest(".add-to-cart-btn")

  if (parentbutton) {
    const name = parentbutton.getAttribute("data-name")
    const price = parseFloat(parentbutton.getAttribute("data-price"))
    addToCart(name, price)
  }
})

function addToCart(name, price) {
  cart.push({
    name,
    price,
    quantity: 1,
  })

}