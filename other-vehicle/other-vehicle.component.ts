import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HeaderParkingComponent } from "../header-parking/header-parking.component";

interface ParkingSlot {
  row: string;
  column: number;
  occupied: boolean;
  category: 'auto' | 'other';
}

@Component({
  selector: 'app-other-vehicle',
  imports: [CommonModule, ReactiveFormsModule, HeaderParkingComponent],
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
    // Add validation for form fields
    this.bookingForm = this.fb.group({
      employeeId: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9]+$')]], // Alphanumeric only
      hours: [0, [Validators.required, Validators.min(1), Validators.max(24)]], // 1-24 hours
      minutes: [0, [Validators.required, Validators.min(0), Validators.max(59)]], // 0-59 minutes
      category: ['', Validators.required], // Category is required
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

    this.totalPages = Math.ceil(this.parkingSlots.length / this.slotsPerPage);
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
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  onSlotClick(slot: ParkingSlot) {
    if (!slot.occupied) {
      this.selectedSlot = slot;
      console.log(`Slot selected: ${slot.row}${slot.column}, Category: ${slot.category}`);
    } else {
      alert(`Slot ${slot.row}${slot.column} is already occupied.`);
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
    if (this.bookingForm.valid && this.selectedSlot) {
      const formValues = this.bookingForm.value;
      this.selectedSlot.occupied = true;
      this.selectedSlot.category = formValues.category;

      alert(
        `Slot ${this.selectedSlot.row}${this.selectedSlot.column} (Category: ${formValues.category}) booked successfully!`
      );

      this.selectedSlot = null;
      this.bookingForm.reset();
    } else {
      // Highlight form errors
      Object.keys(this.bookingForm.controls).forEach((field) => {
        const control = this.bookingForm.get(field);
        control?.markAsTouched({ onlySelf: true });
      });

      alert('Please fill out all required fields correctly.');
    }
  }

  closeDialog() {
    this.selectedSlot = null;
    this.bookingForm.reset();
  }
}
