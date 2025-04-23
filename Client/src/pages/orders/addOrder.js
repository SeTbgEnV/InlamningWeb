import * as http from "../../lib/helpers/httpClient.js";

const form = document.querySelector("#add-order");
const cancelButton = document.querySelector("#cancel-button");

const initApp = () => {
    cancelButton.addEventListener("click", (event) => {
        event.preventDefault();
        window.location.href = "../orders/orders.html";
    });
};

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const orderData = {
    CustomerName: document.getElementById("customerName").value,
    CustomerId: parseInt(document.getElementById("customerId").value),
    Products: [
        {
            ProductId: parseInt(document.getElementById("productId").value),
            ProductName: document.getElementById("productName").value,
            Price: parseFloat(document.getElementById("price").value),
            Quantity: parseInt(document.getElementById("quantity").value),
        },
    ],
  };

  try {
    const response = await http.post("Orders", orderData);

    alert("Order added successfully!");
    window.location.href = "../orders/orders.html";
    form.reset();
  } catch (error) {
    alert("Error while adding order!!");
  }
});

document.addEventListener("DOMContentLoaded", initApp);