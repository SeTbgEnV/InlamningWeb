import * as http from "../../lib/helpers/httpClient.js";

const productlist = document.querySelector("#products");

const initApp = () => {
  loadProducts();
};

const loadProducts = async () => {
  const result = await http.get("Products");
  result.data.$values.forEach((product) => {
    productlist.appendChild(createHtml(product));
  });
};

const createHtml = (product) => {
  const li = document.createElement("li");
  li.classList.add("card");

  let html = `
    <p>Product: <span>${product.productName}</span></p>
    <p> Product Id: ${product.id}</p>
    <br>
    <p>Price: <span>${product.price}$</span></p>
    <p>Description: <span>${product.description}</span></p>
      <div class="buttons">
      <a href="../products/editProduct.html?id=${product.id}" class="edit-btn">Edit Price</a>
      <button class="remove-btn">Remove</button>
    </div>
  `;

  li.innerHTML = html;

  const removeBtn = li.querySelector(".remove-btn");
  removeBtn.addEventListener("click", async () => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this product?"
    );
    if (confirmDelete) {
      try {
        await http.DELETE(`Products/${product.id}`);
        li.remove();
      } catch (error) {
        console.error("Failed to delete product:", error);
      }
    }
  });
  
  return li;
};

document.addEventListener("DOMContentLoaded", initApp);
