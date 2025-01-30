import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule, CommonModule,RouterModule,HttpClientModule],
  providers: [AuthService],
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      userId: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        (response: any) => {
          this.authService.setSession(response.token, response.role);
          this.router.navigate(['/home']);
        },
        (error: HttpErrorResponse) => {
          console.error('Login failed', error);
        }
      );
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

