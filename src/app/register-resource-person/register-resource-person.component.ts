import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register-resource-person',
  imports: [CommonModule, FormsModule,ReactiveFormsModule,HttpClientModule],
  standalone: true,
  providers: [AuthService],
  templateUrl: './register-resource-person.component.html',
  styleUrl: './register-resource-person.component.css'
})
export class RegisterResourcePersonComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      department: ['', Validators.required],
      password: ['', Validators.required],
      role: ['resource_person'] // Default value set
    });
  }

  register() {
    if (this.registerForm.valid) {
      this.authService.registerResourcePerson(this.registerForm.value).subscribe(
        () => this.router.navigate(['/login']),
        (error) => console.error('Registration failed', error)
      );
    }
  }
}

