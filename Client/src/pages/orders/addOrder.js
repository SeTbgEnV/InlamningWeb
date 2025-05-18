import * as http from "../../lib/helpers/httpClient.js";


const form = document.querySelector("#add-order");
const cancelButton = document.querySelector("#cancel-button");

const initApp = () => {
    cancelButton.addEventListener("click", (event) => {
        event.preventDefault();
        window.location.href = "../orders/orders.html";
    });
    dropDownCustomer();
    dropDownProduct();
};

const dropDownCustomer = async () => {
  const customerlist = document.querySelector("#customerlist");
  const result = await http.get("Customers");
  result.data.$values.forEach((customer) => {
    const option = document.createElement("option");
    option.value = customer.id;
    option.textContent = customer.firstName + " " + customer.lastName;
    customerlist.appendChild(option);
  });
};

const dropDownProduct = async () => {
  const productlist = document.querySelector("#productlist");
  const result = await http.get("Products");
  result.data.$values.forEach((product) => {
    const option = document.createElement("option");
    option.value = product.id;
    option.textContent = product.productName;
    productlist.appendChild(option);
  });
};

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const orderData = {
    CustomerName: document.querySelector("#customerlist option:checked").textContent,
    CustomerId: parseInt(document.getElementById("customerlist").value),
    Products: [
        {
            ProductId: parseInt(document.querySelector("#productlist").value),
            ProductName: document.querySelector("#productlist option:checked").textContent,
            Price: parseFloat(document.getElementById("price").value),
            Quantity: parseInt(document.getElementById("quantity").value),
        },
    ],
  };

  console.log(orderData);

  try {
    const response = await http.post("Orders", orderData);
    alert("Order added successfully!");
  } catch (error) {
    alert("Error while adding order!!");
  }
});

document.addEventListener("DOMContentLoaded", initApp);