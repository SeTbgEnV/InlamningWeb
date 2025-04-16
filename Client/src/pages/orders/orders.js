import * as http from "../../lib/helpers/httpClient.js";

const orderList = document.querySelector("#orders");

const initApp = () => {
  loadOrders();
};

const loadOrders = async () => {
  const result = await http.get("Orders");

  result.data.$values.forEach((order) => {
    orderList.appendChild(createHtml(order));
  });
};

const createHtml = (order) => {
  const li = document.createElement("li");
  li.classList.add("card");

  const orderItemsHtml = order.orderItems.$values
    .map(
      (item) => `
    <p>Product: <span>${item.product}</span></p>
    <p>Quantity: <span>${item.quantity}</span></p>
    <p>Price: <span>${item.price}$</span></p>
  `
    )
    .join("");

  let html = `
    <h2>OrderId: <span>${order.id}</span></h2>
    <p>Who ordered: <span>${order.firstName + " " + order.lastName}</span></p>
    <p>Email: <span>${order.email}</span></p>
    <br>
    <p>OrderItems: <span>${orderItemsHtml}</span></p>
    <p>Order total: <span>${order.totalPrice}$</span></p>
      <div class="buttons">
      <button class="remove-btn">Remove</button>
    </div>
  `;

  li.innerHTML = html;

    const removeBtn = li.querySelector(".remove-btn");
    removeBtn.addEventListener("click", async () => {
      const confirmDelete = confirm(
        "Are you sure you want to delete this order?"
      );
      if (confirmDelete) {
        try {
          await http.DELETE(`orders/${order.id}`);
          li.remove();
        } catch (error) {
          console.error("Failed to delete order:", error);
        }
      }
    });
  return li;
};

document.addEventListener("DOMContentLoaded", initApp);
