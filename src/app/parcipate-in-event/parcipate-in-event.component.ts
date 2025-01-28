import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-participate-in-event',
  template: `
    <div class="container">
      <!-- Background Image -->
      <div class="image-container">
        <img src="/assets/event-background.jpg" alt="Event Background" class="background-image">
      </div>

      <!-- Event List and Show More Button -->
      <div class="content">
        <div class="event-list-container">
          <div class="event-item">
            <button class="event-btn">EVENT 1</button>
          </div>
          <div class="event-item">
            <button class="event-btn">EVENT 2</button>
          </div>
          <div class="event-item">
            <button class="event-btn">EVENT 3</button>
          </div>
          <div class="event-item">
            <button class="event-btn">EVENT 4</button>
          </div>
          <div class="event-item">
            <button class="event-btn">EVENT 5</button>
          </div>
          <div class="event-item">
            <button class="event-btn">EVENT 6</button>
          </div>
          <div class="event-item">
            <button class="event-btn">EVENT 7</button>
          </div>
        </div>

        <div class="button-container">
          <button class="show-more-btn">SHOW MORE</button>
        </div>
      </div>

      <!-- Back Button -->
      <button class="back-btn" (click)="goBack()">BACK</button>
    </div>
  `,
  styles: [`
    /* Container */
    .container {
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      background-image: url('/assets/events.jpg');
      background-size: cover;
      background-position: center;
    }

    /* Background Image */
    .image-container {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
    }

    .background-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    /* Content Wrapper */
    .content {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: linear-gradient(90deg, rgba(205, 255, 216, 0.9), rgba(148, 185, 255, 0.9));
      padding: 30px;
      border-radius: 25px;
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
      width: 350px;
      max-width: 90%;
    }

    /* Event List */
    .event-list-container {
      width: 100%;
      text-align: center;
    }

    .event-item {
      margin-bottom: 15px;
    }

    /* Event Buttons */
    .event-btn {
      width: 100%;
      padding: 10px 20px;
      background-color: #333;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      transition: transform 0.3s, box-shadow 0.3s;
    }

    .event-btn:hover {
      transform: scale(1.05);
      box-shadow: 0 6px 14px rgba(0, 0, 0, 0.5);
    }

    /* Show More Button */
    .button-container {
      margin-top: 20px;
    }

    .show-more-btn {
      background-color: black;
      color: white;
      padding: 10px 20px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      transition: transform 0.3s, box-shadow 0.3s;
    }

    .show-more-btn:hover {
      transform: scale(1.05);
      box-shadow: 0 6px 14px rgba(0, 0, 0, 0.5);
    }

    /* Back Button */
    .back-btn {
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 150px;
      height: 50px;
      background: black;
      border: 3px solid #98D8EF;
      border-radius: 25px;
      background-clip: padding-box;
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
  `]
})
export class ParcipateInEventComponent {
  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/event-request']); // Navigate back to the homepage
  }
}