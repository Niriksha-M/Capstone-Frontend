import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';

interface ParkingSlot {
  row: string;
  column: number;
  occupied: boolean;
  category: 'auto' | 'other';
}

@Component({
  selector: 'app-other-vehicle',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './other-vehicle.component.html',
  styleUrl: './other-vehicle.component.css'
})
export class OtherVehicleComponent {
  parkingSlots: ParkingSlot[] = [];
  bookingForm: FormGroup;
  selectedSlot: ParkingSlot | null = null;
  currentPage = 1;
  slotsPerPage = 12;
  totalPages = 1;

  constructor(private fb: FormBuilder) {
    this.bookingForm = this.fb.group({
      employeeId: [''],
      hours: [''],
      minutes: [''],
    });
    this.initializeParkingSlots();
  }

  initializeParkingSlots() {
    const rows = ['A', 'B', 'C', 'D'];
    const columns = 4;
    this.parkingSlots = [];

    rows.forEach((row) => {
      for (let col = 1; col <= columns; col++) {
        this.parkingSlots.push({
          row,
          column: col,
          occupied: false,
          category: Math.random() > 0.5 ? 'auto' : 'other',
        });
      }
    });
  }

  get paginatedSlots() {
    const start = (this.currentPage - 1) * this.slotsPerPage;
    const end = this.currentPage * this.slotsPerPage;
    return this.parkingSlots.slice(start, end);
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    const totalPages = Math.ceil(this.parkingSlots.length / this.slotsPerPage);
    if (this.currentPage < totalPages) {
      this.currentPage++;
    }
  }

  onSlotClick(slot: ParkingSlot) {
    if (!slot.occupied) {
      this.selectedSlot = slot;
      console.log(`Slot selected: ${slot.row}${slot.column}, Category: ${slot.category}`);
    }
  }

  setDefaultTime(event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.bookingForm.patchValue({ hours: 12, minutes: 0 });
    } else {
      this.bookingForm.patchValue({ hours: '', minutes: '' });
    }
  }

  bookSlot() {
    if (this.selectedSlot) {
      this.selectedSlot.occupied = true;
      alert(
        `Slot ${this.selectedSlot.row}${this.selectedSlot.column} (Category: ${this.selectedSlot.category}) booked successfully!`
      );
      this.selectedSlot = null;
      this.bookingForm.reset();
    }
  }

  closeDialog() {
    this.selectedSlot = null;
    this.bookingForm.reset();
  }
}
