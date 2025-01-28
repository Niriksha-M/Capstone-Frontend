import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule, CommonModule,RouterModule],
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  loginError: string | null = null;
  selectedRole: string | null = null;
  formData = {
    username: '',
    password: '',
    role:'',
   
  };

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      role: ['', [Validators.required]],
    });
  }

  onLogin() {
    // Clear previous error messages
    this.loginError = null;

  if (this.loginForm.invalid) {
    this.loginError = 'Please fill in all fields.';
    return;
  }

  // Extract form values
  const { username, password, role } = this.loginForm.value;

  // Simulate login validation (replace with actual authentication logic)
  if (
    role === 'user' &&
    username === 'user@example.com' &&
    password === 'password123'
  ) {
    this.router.navigate(['/home-page']); // Redirect to user home page
  } else if (
    role === 'admin' &&
    username === 'admin@example.com' &&
    password === 'admin123'
  ) {
    this.router.navigate(['/admin-dashboard']); // Redirect to admin home page
  }
   else {
    this.loginError = 'Invalid username, password, or role selection.';
  }
}
onRedirectToRegister() {
  const role = this.loginForm.get('role')?.value;
  if (role === 'user') {
    this.router.navigate(['/register'], { queryParams: { role: 'user' } });
  } else if (role === 'admin') {
    this.router.navigate(['/register'], { queryParams: { role: 'admin' } }); //Must change the path 
  }
}
}

