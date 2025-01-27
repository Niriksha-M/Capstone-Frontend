import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderParkingComponent } from "../header-parking/header-parking.component"; 

interface ParkingSlot {
  row: string;
  column: number;
  occupied: boolean;
}

@Component({
  selector: 'app-bike-parking',
  templateUrl: './bike-parking.component.html',
  imports: [CommonModule, ReactiveFormsModule, HeaderParkingComponent],
  standalone: true,
  styleUrls: ['./bike-parking.component.css'],
})
export class BikeParkingComponent {
  parkingSlots: ParkingSlot[] = [];
  currentPage = 1;
  slotsPerPage = 18;
  bookingForm: FormGroup;
  selectedSlot: ParkingSlot | null = null;

  constructor(private fb: FormBuilder) {
    this.initializeSlots();
    this.bookingForm = this.fb.group({
      employeeId: ['', Validators.required],
      hours: [0, [Validators.required, Validators.min(1)]], // Minimum 1 hour
      minutes: [0, [Validators.required, Validators.min(0), Validators.max(59)]],
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
          occupied: false,
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
      this.selectedSlot = slot;
      console.log(`Slot selected: ${slot.row}${slot.column}`);
      const dialog = document.getElementById('bookingDialog');
      if (dialog) {
        dialog.style.display = 'block';
      }
    } else {
      alert(`Slot ${slot.row}${slot.column} is already occupied!`);
    }
  }

  bookSlot() {
    if (this.bookingForm.valid && this.selectedSlot) {
      const employeeId = this.bookingForm.value.employeeId;
      const hours = this.bookingForm.value.hours;
      const minutes = this.bookingForm.value.minutes;

      console.log(
        `Booking confirmed for Employee ID: ${employeeId}, Slot: ${this.selectedSlot.row}${this.selectedSlot.column}, Duration: ${hours}h ${minutes}m`
      );
      this.selectedSlot.occupied = true;

      alert(
        `Slot booked successfully for Employee ID: ${employeeId}, Slot: ${this.selectedSlot.row}${this.selectedSlot.column}, Duration: ${hours}h ${minutes}m`
      );

      this.closeDialog();
    } else {
      alert('Please fill in all required fields before booking the slot.');
    }
  }

  closeDialog() {
    const dialog = document.getElementById('bookingDialog');
    if (dialog) {
      dialog.style.display = 'none';
    }
    this.selectedSlot = null;
    this.bookingForm.reset({
      employeeId: '',
      hours: 0,
      minutes: 0,
    });
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
}
