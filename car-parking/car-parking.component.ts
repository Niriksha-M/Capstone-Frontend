import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

interface ParkingSlot {
  row: string;
  column: number;
  occupied: boolean;
}

@Component({
  selector: 'app-car-parking',
  templateUrl: './car-parking.component.html',
  imports :[CommonModule,ReactiveFormsModule],
  standalone : true,
  styleUrls: ['./car-parking.component.css'],
})
export class CarParkingComponent implements OnInit {
  parkingSlots: ParkingSlot[] = [];
  currentPageSlots: ParkingSlot[] = [];
  currentPage = 1;
  slotsPerPage = 15; // Number of slots per page
  totalPages = 1;

  selectedSlot: ParkingSlot | null = null;
  bookingForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.bookingForm = this.fb.group({
      employeeId: [''],
      hours: [0],
      minutes: [0],
    });
  }

  ngOnInit(): void {
    this.generateSlots(); // Initialize parking slots
    this.updatePage();
  }

  generateSlots(): void {
    const rows = ['A', 'B', 'C', 'D', 'E'];
    const columns = 10;

    rows.forEach((row) => {
      for (let col = 1; col <= columns; col++) {
        this.parkingSlots.push({
          row,
          column: col,
          occupied: Math.random() > 0.7, // Random occupancy for demonstration
        });
      }
    });

    this.totalPages = Math.ceil(this.parkingSlots.length / this.slotsPerPage);
  }

  updatePage(): void {
    const startIndex = (this.currentPage - 1) * this.slotsPerPage;
    const endIndex = startIndex + this.slotsPerPage;
    this.currentPageSlots = this.parkingSlots.slice(startIndex, endIndex);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePage();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePage();
    }
  }

  onSlotClick(slot: ParkingSlot): void {
    if (!slot.occupied) {
      this.selectedSlot = slot;
      console.log(`Slot selected: ${slot.row}${slot.column}`);
      const dialog = document.getElementById('bookingDialog');
      if (dialog) dialog.style.display = 'block';
    } else {
      alert(`Slot ${slot.row}${slot.column} is already occupied!`);
    }
  }

  closeDialog(): void {
    const dialog = document.getElementById('bookingDialog');
    if (dialog) dialog.style.display = 'none';
    this.selectedSlot = null;
  }

  bookSlot(): void {
    if (this.selectedSlot) {
      this.selectedSlot.occupied = true;
      alert(
        `Slot ${this.selectedSlot.row}${this.selectedSlot.column} booked successfully!`
      );
      this.closeDialog();
      this.updatePage(); // Update the current page to reflect changes
    }
  }

  setDefaultTime(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.bookingForm.patchValue({ hours: 12, minutes: 0 });
    } else {
      this.bookingForm.patchValue({ hours: 0, minutes: 0 });
    }
  }
}
