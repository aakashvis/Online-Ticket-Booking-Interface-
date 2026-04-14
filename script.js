const form = document.getElementById("bookingForm");
const receipt = document.getElementById("receipt");
const classSelect = document.getElementById("class");

const cities = [
  "Mumbai", "Delhi", "Pune", "Bangalore", "Hyderabad",
  "Chennai", "Kolkata", "Ahmedabad", "Jaipur", "Goa"
];

function setupAutoSuggest(inputId) {
  const input = document.getElementById(inputId);

  const suggestionBox = document.createElement("div");
  suggestionBox.classList.add("suggestions");
  input.parentNode.appendChild(suggestionBox);

  input.addEventListener("input", () => {
    const value = input.value.toLowerCase();
    suggestionBox.innerHTML = "";

    if (!value) return;

    const filtered = cities.filter(city =>
      city.toLowerCase().includes(value)
    );

    filtered.forEach(city => {
      const div = document.createElement("div");
      div.textContent = city;

      div.onclick = () => {
        input.value = city;
        suggestionBox.innerHTML = "";
      };

      suggestionBox.appendChild(div);
    });
  });
}

// Apply to From & To fields
setupAutoSuggest("from");
setupAutoSuggest("to");


// Load class options based on type
function updateOptions() {
  const type = document.getElementById("type").value;
  classSelect.innerHTML = "";

  let options = [];

  if (type === "Flight") {
    options = ["Economy", "Business", "First Class"];
  } else {
    options = ["Sleeper", "AC 3 Tier", "AC 2 Tier", "General"];
  }

  options.forEach(opt => {
    const option = document.createElement("option");
    option.textContent = opt;
    classSelect.appendChild(option);
  });
}

// Initial load
updateOptions();

// Submit form
form.addEventListener("submit", function(e) {
  e.preventDefault();

  const data = {
    type: document.getElementById("type").value,
    name: document.getElementById("name").value,
    from: document.getElementById("from").value,
    to: document.getElementById("to").value,
    date: document.getElementById("date").value,
    travelClass: classSelect.value
  };

  localStorage.setItem("booking", JSON.stringify(data));

  displayReceipt(data);
});

// Show receipt
function displayReceipt(data) {
  receipt.innerHTML = `
    <h2>🧾 Ticket Receipt</h2>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Type:</strong> ${data.type}</p>
    <p><strong>From:</strong> ${data.from}</p>
    <p><strong>To:</strong> ${data.to}</p>
    <p><strong>Date:</strong> ${data.date}</p>
    <p><strong>Class:</strong> ${data.travelClass}</p>
  `;
}

// Reset
function resetForm() {
  form.reset();
  receipt.innerHTML = "";
  localStorage.removeItem("booking");
  updateOptions();
}

// Load saved data
window.onload = function() {
  const saved = JSON.parse(localStorage.getItem("booking"));
  if (saved) displayReceipt(saved);
};