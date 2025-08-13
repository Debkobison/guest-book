const events = [
  { name: "Moyin Wedding", date: "02/03/29", guests: 250, registrants: [] },
  { name: "Tega Naming", date: "02/05/29", guests: 50, registrants: [] },
  { name: "Femi Birthday", date: "12/08/29", guests: 80, registrants: [] },
];

const table = document.getElementById("eventsTable");
const modal = document.getElementById("reservationModal");
const closeModalBtn = document.getElementById("closeModal");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");
const confirmBtn = document.getElementById("confirmReserve");
const registrantsContent = document.getElementById("registrantsContent");

let selectedEventIndex = null;


function renderEvents() {
  table.innerHTML = `
    <tr>
      <th>Name</th>
      <th>Date</th>
      <th>Guests</th>
      <th>Action</th>
    </tr>
  `;
  
  events.forEach((event, index) => {
    table.innerHTML += `
      <tr>
        <td>${event.name}</td>
        <td>${event.date}</td>
        <td id="guests-${index}">${event.guests}</td>
        <td><button onclick="openReservation(${index})">Reserve Spot</button></td>
      </tr>
    `;
  });
  renderRegistrants();
}


function openReservation(index) {
  selectedEventIndex = index;
  modalTitle.textContent = `Reserve for ${events[index].name}`;
  modalText.textContent = `Event Date: ${events[index].date}`;
  document.getElementById("userName").value = "";
  document.getElementById("userEmail").value = "";
  modal.style.display = "block";
}


closeModalBtn.onclick = () => modal.style.display = "none";


confirmBtn.onclick = () => {
  const name = document.getElementById("userName").value.trim();
  const email = document.getElementById("userEmail").value.trim();

  if (!name || !email) {
    alert("Please enter both your name and email.");
    return;
  }

  if (selectedEventIndex !== null) {
    events[selectedEventIndex].guests += 1;
    events[selectedEventIndex].registrants.push({ name, email });

    document.getElementById(`guests-${selectedEventIndex}`).textContent = events[selectedEventIndex].guests;
    renderRegistrants();
  }

  modal.style.display = "none";
};

// Show registered people
function renderRegistrants() {
  let output = "";
  events.forEach(event => {
    if (event.registrants.length > 0) {
      output += `<h3>${event.name} (${event.registrants.length} people)</h3><ul>`;
      event.registrants.forEach(r => {
        output += `<li>${r.name} (${r.email})</li>`;
      });
      output += "</ul>";
    }
  });

  registrantsContent.innerHTML = output || "No registrations yet.";
}

renderEvents();
