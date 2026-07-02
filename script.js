console.log("Script Loaded");
const menu = [
    { name: "Pizza", price: 250 },
    { name: "Burger", price: 120 },
    { name: "Pasta", price: 180 },
    { name: "French Fries", price: 100 },
    { name: "Soft Drink", price: 60 }
];

function renderMenu() {
    const menuBody = document.getElementById("menuBody");
    if (!menuBody) return;

    menuBody.innerHTML = menu
        .map((item, index) => `
            <tr>
                <td>${item.name}</td>
                <td>${item.price}</td>
                <td>
                    <input type="number" id="qty${index}" min="0" value="0">
                </td>
            </tr>`)
        .join("");
}

function generateBill() {

    let subtotal = 0;
    let billHTML = "<h2>Bill Summary</h2>";

    menu.forEach((item, index) => {

        let qtyInput = document.getElementById(`qty${index}`);
        let qty = qtyInput ? Number(qtyInput.value) : 0;

        if (qty > 0) {
            let amount = qty * item.price;
            subtotal += amount;

            billHTML += `
            <p>
            ${item.name} × ${qty} = ₹${amount}
            </p>
            `;
        }

    });

    let gst = subtotal * 0.05;
    let total = subtotal + gst;

    billHTML += `<hr>`;
    billHTML += `<p><strong>Subtotal :</strong> ₹${subtotal.toFixed(2)}</p>`;
    billHTML += `<p><strong>GST (5%) :</strong> ₹${gst.toFixed(2)}</p>`;
    billHTML += `<h3>Total Bill : ₹${total.toFixed(2)}</h3>`;

    document.getElementById("bill").innerHTML = billHTML;
}

renderMenu();

const generateButton = document.getElementById("generateBtn");
if (generateButton) {
    generateButton.addEventListener("click", generateBill);
}

console.log("Menu rendered and button listener attached.");
