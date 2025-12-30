import { useState } from "react";

function Appointment() {
  const [appointments, setAppointments] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // Open modal
  const openAppointments = () => {
    setShowModal(true);
  };

  // Close modal
  const closeAppointments = () => {
    setShowModal(false);
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;

    const newAppointment = {
      petName: form["pet-name"].value,
      petType: form["pet-type"].value,
      ownerName: form["owner-name"].value,
      phone: form["owner-phone"].value,
      email: form["owner-email"].value,
      service: form["service-type"].value,
      date: form["preferred-date"].value,
      time: form["preferred-time"].value,
      notes: form["special-requests"].value,
    };

    setAppointments([...appointments, newAppointment]);
    form.reset();
  };

  return (
    <section className="section appointment-section" id="appointment">
      <div className="container">
        <div className="section-title">
          <h2>Book an Appointment</h2>
          <p>Fill out the form below to schedule your pet's appointment</p>
        </div>

        {/* view appointments */}
        <button className="view-btn" onClick={openAppointments}>
          <i className="fas fa-eye"></i> View Appointments
        </button>

        {/* model */}
        {showModal && (
          <div className="modal" style={{ display: "block" }}>
            <div className="modal-content">
              <span className="close-btn" onClick={closeAppointments}>
                &times;
              </span>

              <h3>Booked Appointments</h3>

              {appointments.length === 0 ? (
                <p>No appointments booked yet.</p>
              ) : (
                appointments.map((item, index) => (
                  <div key={index} style={{ marginBottom: "10px" }}>
                    <strong>{item.petName}</strong> ({item.petType}) <br />
                    {item.service} on {item.date} ({item.time}) <br />
                    Owner: {item.ownerName} – {item.phone}
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        <div className="form-container">
          <form id="appointment-form" onSubmit={handleSubmit}>
            <h3>
              <i className="fas fa-paw"></i> Pet Information
            </h3>

            <div className="form-row">
              <div className="form-group icon-input">
                <i className="fas fa-dog"></i>
                <input
                  type="text"
                  name="pet-name"
                  required
                  placeholder="Pet Name"
                />
              </div>

              <div className="form-group icon-input">
                <i className="fas fa-list"></i>
                <select name="pet-type" required>
                  <option value="">Pet Type</option>
                  <option>Dog</option>
                  <option>Cat</option>
                  <option>Bird</option>
                  <option>Rabbit</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            <h3>
              <i className="fas fa-user"></i> Owner Information
            </h3>

            <div className="form-row">
              <div className="form-group icon-input">
                <i className="fas fa-id-card"></i>
                <input
                  type="text"
                  name="owner-name"
                  required
                  placeholder="Full Name"
                />
              </div>

              <div className="form-group icon-input">
                <i className="fas fa-phone"></i>
                <input
                  type="tel"
                  name="owner-phone"
                  required
                  placeholder="Phone Number"
                />
              </div>
            </div>

            <div className="form-group icon-input">
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                name="owner-email"
                required
                placeholder="Email Address"
              />
            </div>

            <h3>
              <i className="fas fa-calendar-check"></i> Service Details
            </h3>

            <div className="form-group icon-input">
              <i className="fas fa-briefcase-medical"></i>
              <select name="service-type" required>
                <option value="">Select Service</option>
                <option>Grooming</option>
                <option>Veterinary Check-up</option>
                <option>Boarding</option>
                <option>Training</option>
                <option>Emergency</option>
              </select>
            </div>

            <div className="form-row">
              <div className="form-group icon-input">
                <i className="fas fa-calendar-day"></i>
                <input type="date" name="preferred-date" required />
              </div>

              <div className="form-group icon-input">
                <i className="fas fa-clock"></i>
                <select name="preferred-time">
                  <option value="">Preferred Time</option>
                  <option>Morning</option>
                  <option>Afternoon</option>
                  <option>Evening</option>
                </select>
              </div>
            </div>

            <div className="form-group icon-input">
              <i className="fas fa-note-sticky"></i>
              <textarea
                name="special-requests"
                rows="4"
                placeholder="Special Notes"
              ></textarea>
            </div>

            <button type="submit" className="submit-btn">
              <i className="fas fa-paper-plane"></i> Book Appointment
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Appointment;
