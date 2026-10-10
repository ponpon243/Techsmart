import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  email: string = '';
  password: string = '';
  
  isLoading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private router: Router) {}

  onSubmit(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.email || !this.email.trim()) {
      this.errorMessage = 'Please enter your username or email.';
      return;
    }

    if (!this.password || !this.password.trim()) {
      this.errorMessage = 'Please enter your password.';
      return;
    }

    this.isLoading = true;

    // Simulate authentication process
    setTimeout(() => {
      this.isLoading = false;
      this.successMessage = 'Sign in successful! Redirecting...';
      
      // TODO(security): Connect to backend authentication service with HTTPS and secure HttpOnly cookie session management.
      setTimeout(() => {
        this.router.navigate(['/products']);
      }, 1000);
    }, 800);
  }
}
