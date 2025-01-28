import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-request',
  imports: [CommonModule],
  template: `
    <div class="container">
      <div class="event-request-container">
        <button class="create-event-btn" (click)="createEvent()">CREATE EVENT REQUEST </button>
        <button class="participate-btn" (click)="participateInEvent()">PARTICIPATE IN AN EVENT</button>
      </div>
      <button class="back-btn" (click)="goBack()">BACK</button>
      
      <!-- Image container -->
      <div *ngIf="showImage" class="image-container">
        <img src="/assets/13.png" alt="Event Request Image" class="event-image">
      </div>
    </div>
  `,
  styles: [
    `
      /* Full page container */
      .container {
        background-image: url('/assets/events.jpg'); /* Replace with actual path */
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px;
        position: relative;
      }

      /* Event request container */
      .event-request-container {
        background: linear-gradient(90deg, rgba(205, 255, 216, 0.9), rgba(148, 185, 255, 0.9));
        padding: 30px;
        border-radius: 25px;
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 320px;
        text-align: center;
      }

      /* Buttons inside the container */
      .create-event-btn,
      .participate-btn {
        width: 100%;
        margin: 10px 0;
        padding: 15px 20px;
        background-color: rgba(0, 0, 0, 0.8); /* Semi-transparent black */
        border: none;
        border-radius: 10px;
        color: white;
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
        transition: transform 0.3s, box-shadow 0.3s;
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
      }

      .create-event-btn:hover,
      .participate-btn:hover {
        transform: scale(1.05);
        box-shadow: 0 6px 14px rgba(0, 0, 0, 0.5);
      }

      /* Back button styling */
      .back-btn {
        position: absolute;
        bottom: 20px;
        right: 20px;
        width: 150px; /* Increased width for oval shape */
        height: 50px; /* Adjusted height */
        background: black;
        border: 3px solid #98D8EF; /* Border is initially transparent */
        border-radius: 25px; /* High border radius to make the button oval */
        background-clip: padding-box; /* Ensures the background doesn't overlap the border */
        color: white;
        font-size: 14px;
        font-weight: bold;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: transform 0.3s, box-shadow 0.3s, background-color 0.3s;
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
      }

      .back-btn:hover {
        transform: scale(1.1);
        background: linear-gradient(90deg, #cdffd8, #94b9ff);
        color: black;
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.6);
      }

      .back-btn:active {
        transform: scale(1.05);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
      }

      /* Image container styling */
      .image-container {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(255, 255, 255, 0.9);
        padding: 20px;
        border-radius: 15px;
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
      }

      .event-image {
        max-width: 100%;
        height: auto;
        border-radius: 10px;
      }
    `,
  ],
})
export class EventRequestComponent {
  showImage = false;

  constructor(private router: Router) {}

  createEvent() {
    this.showImage = true;
    console.log('Create Event Request');
    this.router.navigate(['/create-event-request']);

  }

  participateInEvent() {
    console.log('Participate in an Event');
    this.router.navigate(['/participate-in-event']);
  }

  goBack() {
    this.router.navigate(['/']); // Redirects to the home page
  }
}