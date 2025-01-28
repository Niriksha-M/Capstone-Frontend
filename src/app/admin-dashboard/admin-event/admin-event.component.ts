import { Component } from '@angular/core';
import { EventService } from '../../event.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-event',
  imports: [CommonModule],
  templateUrl: './admin-event.component.html',
  styleUrl: './admin-event.component.css'
})
export class AdminEventComponent {
  eventRequests: any[] = [];

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.loadEventRequests();
  }

  loadEventRequests(): void {
    this.eventService.getEventRequests().subscribe((events) => {
      this.eventRequests = events;
    });
  }

  approveEvent(event: any): void {
    this.eventService.approveEvent(event.id).subscribe(() => {
      alert('Event approved successfully!');
      this.loadEventRequests();
    });
  }

  rejectEvent(eventId: string): void {
    this.eventService.rejectEvent(eventId).subscribe(() => {
      alert('Event rejected successfully!');
      this.loadEventRequests();
    });
  }

}
