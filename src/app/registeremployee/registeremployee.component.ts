import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registeremployee',
  imports: [CommonModule, FormsModule,ReactiveFormsModule,HttpClientModule],
    standalone: true,
    providers: [AuthService],
  templateUrl: './registeremployee.component.html',
  styleUrl: './registeremployee.component.css'
})
export class RegisteremployeeComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      id: ['',Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      projectId: ['', Validators.required],
      vehicleType: ['', Validators.required],
      password: ['', Validators.required],
      role: ['employee'] // Default value set
    });
  }

  register() {
    if (this.registerForm.valid) {
      this.authService.registerEmployee(this.registerForm.value).subscribe(
        () => this.router.navigate(['/login']),
        (error) => console.error('Registration failed', error)
      );
    }
  }
}

