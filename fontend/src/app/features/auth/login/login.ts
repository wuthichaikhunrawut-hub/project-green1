import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router ,RouterLink} from '@angular/router';
import { AuthService, AuthResponse } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  // Using username as email field for simplicity in UI right now
  username = '';
  password = '';
  errorMessage = '';
  isLoading = false;

  onLogin() {
    this.isLoading = true;
    this.errorMessage = '';

    const credentials = {
      email: this.username,
      password: this.password
    };

    this.authService.login(credentials).subscribe({
      next: (response: AuthResponse) => {
        this.isLoading = false;
        if (response && response.access_token) {
          if (response.user.role === 'ASSESSOR') {
            this.router.navigate(['/requests']);
          } else if (response.user.role === 'ADMIN') {
            this.router.navigate(['/admin/dashboard']);
          } else {
            this.router.navigate(['/dashboard']);
          }
        }
      },
      error: (err: any) => {
        this.isLoading = false;
        if (err.status === 401) {
          this.errorMessage = 'ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง';
        } else {
          this.errorMessage = 'ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้';
        }
      }
    });
  }
}