import * as http from "../../lib/helpers/httpClient.js";

const customerlist = document.querySelector("#customers");

const initApp = () => {
  loadCustomers();
};

const loadCustomers = async () => {
  const result = await http.get("Customers");
  result.data.$values.forEach((customer) => {
    customerlist.appendChild(createHtml(customer));
  });
};

const createHtml = (customer) => {
  const li = document.createElement("li");
  li.classList.add("card");

  let html = `
    <h2>Customer ID: <span>${customer.id}</span></h2>
    <p>Customer: <span>${
      customer.firstName + " " + customer.lastName
    }</span></p>
    <p>Description: <span>${customer.email}</span></p>
    <p>Phone: <span>${customer.phone}</span></p>
    <div class="buttons">
      <button class="remove-btn">Remove</button>
    </div>
  `;

  li.innerHTML = html;

  const removeBtn = li.querySelector(".remove-btn");
  removeBtn.addEventListener("click", async () => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this customer?"
    );
    if (confirmDelete) {
      try {
        await http.DELETE(`customers/${customer.id}`);
        li.remove();
      } catch (error) {
        console.error("Failed to delete customer:", error);
      }
    }
  });
  return li;
};

document.addEventListener("DOMContentLoaded", initApp);
