import * as http from "../../lib/helpers/httpClient.js";

const form = document.querySelector("#add-product");
const cancelButton = document.querySelector("#cancel-button");

const initApp = () => {};

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const productData = {
    ProductName: document.getElementById("productName").value,
    ItemNumber: document.getElementById("itemNumber").value,
    Description: document.getElementById("description").value,
    Price: parseFloat(document.getElementById("price").value),
    QuantityInpack: parseInt(document.getElementById("quantityInpack").value),
    Weight: parseFloat(document.getElementById("weight").value),
    imageURL: document.getElementById("imageURL").value,
  };

  try {
    const response = await http.post("Products", productData);

    alert("Product added successfully!");
    form.reset();
    window.location.href = "../products/products.html";
  } catch (error) {
    alert("Error while adding product!!");
  }
});
cancelButton.addEventListener("click", (event) => {
  event.preventDefault();
  window.location.href = "../products/products.html";
});

document.addEventListener("DOMContentLoaded", initApp);
