import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; 

interface ParkingSlot {
  row: string;
  column: number;
  occupied: boolean;
}

@Component({
  selector: 'app-bike-parking',
  templateUrl: './bike-parking.component.html',
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
  styleUrls: ['./bike-parking.component.css'],
})
export class BikeParkingComponent {
  parkingSlots: ParkingSlot[] = []; // Explicitly define the type of parkingSlots
  currentPage = 1;
  slotsPerPage = 18; // Display 12 slots per page
  bookingForm: FormGroup;
  selectedSlot: ParkingSlot | null = null; // Track selected slot for booking

  constructor(private fb: FormBuilder) {
    this.initializeSlots();
    this.bookingForm = this.fb.group({
      employeeId: [''],
      hours: [''],
      minutes: [''],
    });
  }

  initializeSlots() {
    const rows = ['A', 'B', 'C', 'D', 'E'];
    const columns = [1, 2, 3, 4, 5, 6];
    for (let row of rows) {
      for (let column of columns) {
        this.parkingSlots.push({
          row,
          column,
          occupied: false//Math.random() < 0.5, // Randomly assign occupied/unoccupied
        });
      }
    }
  }

  get paginatedSlots(): ParkingSlot[] {
    const startIndex = (this.currentPage - 1) * this.slotsPerPage;
    return this.parkingSlots.slice(startIndex, startIndex + this.slotsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.parkingSlots.length / this.slotsPerPage);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  onSlotClick(slot: ParkingSlot) {
    if (!slot.occupied) {
      this.selectedSlot = slot; // Set selected slot
      console.log(`Slot selected: ${slot.row}${slot.column}`);
      const dialog = document.getElementById('bookingDialog');
      if (dialog) {
        dialog.style.display = 'block'; // Show the dialog
      }
    } else {
      alert(`Slot ${slot.row}${slot.column} is already occupied!`);
    }
  }
  
  setDefaultTime(event: any) {
    if (event.target.checked) {
      this.bookingForm.patchValue({
        hours: 12,
        minutes: 0,
      });
    } else {
      this.bookingForm.patchValue({
        hours: 0,
        minutes: 0,
      });
    }
  }
  bookSlot() {
    if (this.selectedSlot) {
      const employeeId = this.bookingForm.value.employeeId;
      const hours = this.bookingForm.value.hours;
      const minutes = this.bookingForm.value.minutes;
      console.log(
        `Booking confirmed for Employee ID: ${employeeId}, Slot: ${this.selectedSlot.row}${this.selectedSlot.column}, Duration: ${hours}h ${minutes}m`
      );
      this.selectedSlot.occupied = true;

      // Notify the backend (mocked as a comment)
      // Example backend logic to send QR code
      // this.notificationService.sendQRCode(employeeId);

      alert(`Slot booked successfully for Employee ID: ${employeeId}, Slot: ${this.selectedSlot.row}${this.selectedSlot.column}, Duration: ${hours}h ${minutes}m`);
      
      // Close the dialog
      this.closeDialog();
    }
  }

  closeDialog() {
    const dialog = document.getElementById('bookingDialog');
    if (dialog) {
      dialog.style.display = 'none'; // Hide the dialog
    }
    this.selectedSlot = null; // Clear the selected slot
  }
}