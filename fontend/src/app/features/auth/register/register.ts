import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService, AuthResponse } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class RegisterComponent {
  private router = inject(Router);
  private authService = inject(AuthService);

  // ข้อมูลสำหรับ Table organizations
  orgData = {
    name: '',
    tax_id: '',
    industry_type: '',
    total_floor_area: 0
  };

  // ข้อมูลสำหรับ Table users
  userData = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  isLoading = false;

  onRegister() {
    if (this.userData.password !== this.userData.confirmPassword) {
      alert('รหัสผ่านไม่ตรงกัน');
      return;
    }

    this.isLoading = true;
    
    const payload = {
      orgData: this.orgData,
      userData: {
        username: this.userData.username,
        email: this.userData.email,
        password: this.userData.password
      }
    };

    this.authService.register(payload).subscribe({
      next: (res: AuthResponse) => {
        this.isLoading = false;
        alert('ลงทะเบียนสำเร็จ! เข้าสู่ระบบอัตโนมัติ');
        this.router.navigate(['/dashboard']);
      },
      error: (err: any) => {
        this.isLoading = false;
        alert(err.error?.message || 'เกิดข้อผิดพลาดในการลงทะเบียน');
      }
    });
  }
}