import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-assessor-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './assessor-register.html',
  styleUrls: ['./assessor-register.css']
})
export class AssessorRegisterComponent {
  step = 1;
  isLoading = false;
  errorMessage = '';

  userData = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  profileData = {
    license_number: '',
    years_experience: 0,
    education_background: '',
    expertise_tags: '',
    bank_name: '',
    bank_account_no: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  nextStep() {
    if (this.step === 1) {
      if (!this.userData.email || !this.userData.password || this.userData.password !== this.userData.confirmPassword) {
        this.errorMessage = 'กรุณากรอกข้อมูลให้ครบถ้วนและรหัสผ่านต้องตรงกัน';
        return;
      }
    }
    this.errorMessage = '';
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  async onRegister() {
    this.isLoading = true;
    this.errorMessage = '';

    try {
      const response: any = await this.authService.registerAssessor({
        userData: {
          username: this.userData.username || this.userData.email.split('@')[0],
          email: this.userData.email,
          password: this.userData.password
        },
        profileData: this.profileData
      }).toPromise();

      // Store token and redirect
      if (response && response.access_token) {
        localStorage.setItem('access_token', response.access_token);
        localStorage.setItem('user', JSON.stringify(response.user));
        this.router.navigate(['/dashboard']);
      }
    } catch (error: any) {
      this.errorMessage = error.error?.message || 'เกิดข้อผิดพลาดในการลงทะเบียน';
    } finally {
      this.isLoading = false;
    }
  }
}
