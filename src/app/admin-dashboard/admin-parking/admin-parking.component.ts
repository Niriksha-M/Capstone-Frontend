import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-parking',
  imports: [CommonModule],
  templateUrl: './admin-parking.component.html',
  styleUrl: './admin-parking.component.css'
})
export class AdminParkingComponent {
  parkingSlots = [
    { id: 1, name: 'A1', status: 'Booked' },
    { id: 2, name: 'A2', status: 'Available' },
    { id: 3, name: 'A3', status: 'Booked' },
  ];

  constructor() {}

  ngOnInit(): void {}

  // Add functions to handle updates, deletions, etc.
  updateStatus(slotId: number, newStatus: string) {
    const slot = this.parkingSlots.find(slot => slot.id === slotId);
    if (slot) {
      slot.status = newStatus;
    }
  }

  // Example: delete a parking slot
  deleteSlot(slotId: number) {
    this.parkingSlots = this.parkingSlots.filter(slot => slot.id !== slotId);
  }
}
