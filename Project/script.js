//Smooth Scroll 
document.querySelectorAll("nav a, .cta-btn").forEach((link) => {
  link.addEventListener("click", (e) => {
    if (link.getAttribute("href").startsWith("#")) {
      e.preventDefault();
      document
        .querySelector(link.getAttribute("href"))
        .scrollIntoView({ behavior: "smooth" });
    }
  });
});

//Prevent Past Date 
const dateInput = document.getElementById("preferred-date");
if (dateInput) {
  dateInput.min = new Date().toISOString().split("T")[0];
}

document
  .getElementById("appointment-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    // Get form values 
    const appointment = {
      petName: document.getElementById("pet-name").value,
      petType: document.getElementById("pet-type").value,

      ownerName: document.getElementById("owner-name").value,
      ownerEmail: document.getElementById("owner-email").value,
      ownerPhone: document.getElementById("owner-phone").value,

      service: document.getElementById("service-type").value,
      date: document.getElementById("preferred-date").value,
      time: document.getElementById("preferred-time").value,

      message: document.getElementById("special-requests").value,
    };

    try {
      // Fake API POST Request
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(appointment),
        }
      );

      const data = await response.json();
      console.log("APPOINTMENT FAKE API RESPONSE:", data);

      // Store in localStorage
      let appList = JSON.parse(localStorage.getItem("appointments")) || [];
      appList.push(appointment);
      localStorage.setItem("appointments", JSON.stringify(appList));

      alert("✔ Appointment Booked Successfully!");

      document.getElementById("appointment-form").reset();
    } catch (error) {
      alert("Appointment Failed!");
      console.log(error);
    }
  });
//Display Appointments 
function openAppointments() {
  displayAppointments();
  document.getElementById("appointment-modal").style.display = "block";
}

function closeAppointments() {
  document.getElementById("appointment-modal").style.display = "none";
}

//Render Appointment List 
function displayAppointments() {
  const list = document.getElementById("appointment-list");
  list.innerHTML = "";

  const appointments = JSON.parse(localStorage.getItem("appointments")) || [];

  if (appointments.length === 0) {
    list.innerHTML = "<p>No appointments found.</p>";
    return;
  }

  appointments.forEach((app, index) => {
    const div = document.createElement("div");
    div.className = "appointment-item";

    div.innerHTML = `
            <p><strong>Pet:</strong> ${app.petName} (${app.petType})</p>
            <p><strong>Owner:</strong> ${app.ownerName}</p>
            <p><strong>Service:</strong> ${app.service}</p>
            <p><strong>Date:</strong> ${app.date} | ${app.time}</p>
            <button onclick="deleteAppointment(${index})"> Delete</button>
            <hr>
        `;

    list.appendChild(div);
  });
}

//Delete Appointment 
function deleteAppointment(index) {
  let appointments = JSON.parse(localStorage.getItem("appointments")) || [];
  appointments.splice(index, 1);
  localStorage.setItem("appointments", JSON.stringify(appointments));
  displayAppointments();
}

//Sign-in Popup
document.querySelector(".popup-form").addEventListener("submit", (e) => {
  e.preventDefault(); 
  alert("Sign-in successful!");
  window.location.hash = "";
});

//Close Popup on Outside Click
document.getElementById("signin-popup").addEventListener("click", (e) => {
  if (e.target.id === "signin-popup") {
    window.location.hash = "";
  }
});
