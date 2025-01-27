import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HeaderParkingComponent } from "../header-parking/header-parking.component";

interface ParkingSlot {
  row: string;
  column: number;
  occupied: boolean;
}

@Component({
  selector: 'app-car-parking',
  templateUrl: './car-parking.component.html',
  imports: [CommonModule, ReactiveFormsModule, HeaderParkingComponent],
  standalone: true,
  styleUrls: ['./car-parking.component.css'],
})
export class CarParkingComponent implements OnInit {
  parkingSlots: ParkingSlot[] = [];
  currentPageSlots: ParkingSlot[] = [];
  currentPage = 1;
  slotsPerPage = 15;
  totalPages = 1;

  selectedSlot: ParkingSlot | null = null;
  bookingForm: FormGroup;

  constructor(private fb: FormBuilder) {
    // Add validators for each form field
    this.bookingForm = this.fb.group({
      employeeId: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9]+$')]], // Alphanumeric ID required
      hours: [0, [Validators.required, Validators.min(1), Validators.max(24)]], // Min 1, max 24 hours
      minutes: [0, [Validators.required, Validators.min(0), Validators.max(59)]], // Min 0, max 59 minutes
    });
  }

  ngOnInit(): void {
    this.generateSlots();
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
          occupied: Math.random() > 0.7,
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
    if (this.bookingForm.valid && this.selectedSlot) {
      const { employeeId, hours, minutes } = this.bookingForm.value;
      this.selectedSlot.occupied = true;

      alert(
        `Slot ${this.selectedSlot.row}${this.selectedSlot.column} booked successfully for Employee ID: ${employeeId} with duration ${hours}h ${minutes}m!`
      );

      this.closeDialog();
      this.updatePage();
    } else {
      // Highlight errors
      Object.keys(this.bookingForm.controls).forEach((field) => {
        const control = this.bookingForm.get(field);
        control?.markAsTouched({ onlySelf: true });
      });

      alert('Please fill out all required fields correctly.');
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
