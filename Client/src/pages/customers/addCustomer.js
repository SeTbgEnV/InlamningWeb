import * as http from "../../lib/helpers/httpClient.js";

const form = document.querySelector("#add-customer");
const cancelButton = document.querySelector("#cancel-button");

const initApp = () => {};

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const customerData = {
        FirstName: document.getElementById("firstName").value,
        LastName: document.getElementById("lastName").value,
        Email: document.getElementById("email").value,
        Phone: document.getElementById("phone").value,
        Addresses: [{
        AddressLine: document.getElementById("addressLine").value,
        PostalCode: document.getElementById("postalCode").value,
        City: document.getElementById("city").value,
        AddressType: parseInt(document.getElementById("addressType").value),
        },],
    };

    try {
        const response = await http.post("Customers", customerData);

     
        alert("Customer added successfully!");
        form.reset();
        window.location.href = "../customers/customers.html";
    } catch (error) {
        alert("Error while adding customer!!");
    }
});
cancelButton.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.href = "../customers/customers.html";
});

document.addEventListener("DOMContentLoaded", initApp);