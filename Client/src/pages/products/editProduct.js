import * as http from "../../lib/helpers/httpClient.js";

const form = document.querySelector("#edit-product");
const selectedProduct = document.querySelector("#selected-product");

const urlSearch = new URLSearchParams(window.location.search);
const productId = urlSearch.get("id");

const loadProduct = async () => {
  const product = await http.get(`Products/${productId}`);

  selectedProduct.innerHTML = `
  <h2>Selected Product: <br>
  ${product.data.productName}</h2>
  <p>Price: ${product.data.price}$</p>
  <p>Description: ${product.data.description}</p>
  `;
};

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const updateProduct = {
    price: parseFloat(document.querySelector("#price").value),
  };

  try {
    await http.patch(`Products/${productId}`, updateProduct);
    window.location.href = "../products/products.html";
  } catch (error) {
    console.error("Failed to update product:", error);
  }
});

const cancelButton = document.querySelector("#cancel-button");
cancelButton.addEventListener("click", (event) => {
  event.preventDefault();
  window.location.href = "../products/products.html";
});


document.addEventListener("DOMContentLoaded", loadProduct);
