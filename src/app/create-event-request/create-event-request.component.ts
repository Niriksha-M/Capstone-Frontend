import { Component } from '@angular/core';

@Component({
  selector: 'app-create-event-request',
  template: `
    <div class="container">
      <div class="image-container">
        <img src="/assets/events.jpg" alt="Event Background" class="background-image"> 
      </div>

      <div class="form-container">
        <div class="form-row">
          <label for="employeeId">EMPLOYEE ID:</label>
          <input type="text" id="employeeId" placeholder="Enter Employee ID" style="background-color: black; color: white;">
        </div>
        <div class="form-row">
          <label for="eventName">EVENT NAME:</label>
          <input type="text" id="eventName" placeholder="Enter Event Name" style="background-color: black; color: white;">
        </div>
        <div class="form-row">
          <label for="description">DESCRIPTION:</label>
          <textarea id="description" placeholder="Enter Description" style="background-color: black; color: white;"></textarea>
        </div>
        <div class="form-row">
          <label for="capacity">CAPACITY:</label>
          <input type="number" id="capacity" placeholder="Enter Capacity" style="background-color: black; color: white;">
        </div>
        <div class="form-row">
          <label for="time">TIME:</label>
          <input type="time" id="time" style="background-color: black; color: white;">
        </div>
        <div class="form-row">
          <label for="date">DATE:</label>
          <input type="date" id="date" style="background-color: black; color: white;">
        </div>
        <button class="request-btn">REQUEST</button>
      </div>
    </div>
  `,
  styles: [`
    .container {
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative; /* Position for absolute positioning of image */
    }

    .image-container {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1; /* Place image behind the form */
    }

    .background-image {
      width: 100%;
      height: 100%;
      object-fit: cover; /* Ensure image covers the entire container */
    }

    .form-container {
      background: linear-gradient(90deg, rgba(205, 255, 216, 0.9), rgba(148, 185, 255, 0.9));
      padding: 30px;
      border-radius: 25px;
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
      width: 300px; /* Adjust width for better fit */ 
      max-width: 90%; /* Ensure it doesn't exceed 90% of viewport width */
    }

    .form-row {
      margin-bottom: 15px;
    }

    label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
      cursor: pointer; /* Make labels clickable */
    }

    input,
    textarea {
      width: 100%;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
      color: white; /* Set text color to white */
      background-color: black; /* Set background color to black */
    }

    .request-btn {
      background-color: #007bff;
      color: white;
      padding: 10px 20px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
  `]
})
export class CreateEventRequestComponent {
  // ... your component logic
}