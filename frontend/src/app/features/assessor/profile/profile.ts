import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-assessor-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class AssessorProfileComponent implements OnInit {
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  user: any = null;
  isLoading = true;
  isSaving = false;
  errorMessage = '';

  formData = {
    bio: '',
    bank_name: '',
    bank_account_name: '',
    bank_account_number: ''
  };

  ngOnInit() {
    this.loadProfile();
  }

  loadProfile() {
    this.isLoading = true;
    this.errorMessage = '';
    const currentUser = this.authService.currentUserValue;
    if (!currentUser || !currentUser.id) {
      this.errorMessage = 'ไม่พบข้อมูลผู้ใช้ กรุณาเข้าสู่ระบบใหม่';
      this.isLoading = false;
      return;
    }

    const userId = currentUser.id;

    this.http.get<any>('http://localhost:3001/users/profile/me', {
      headers: { 'x-user-id': userId }
    }).subscribe({
      next: (data) => {
        this.user = data || {
          username: currentUser.username || '',
          email: (currentUser as any).email || '',
          role: currentUser.role || 'ASSESSOR',
          assessor_verified: currentUser.assessor_verified || false
        };
        if (data) {
          this.formData.bio = data.bio || '';
          this.formData.bank_name = data.bank_name || '';
          this.formData.bank_account_name = data.bank_account_name || '';
          this.formData.bank_account_number = data.bank_account_number || '';
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load profile', err);
        this.user = {
          username: currentUser.username || '',
          email: (currentUser as any).email || '',
          role: currentUser.role || 'ASSESSOR',
          assessor_verified: currentUser.assessor_verified || false
        };
        this.isLoading = false;
      }
    });
  }

  saveProfile() {
    this.isSaving = true;
    const currentUser = this.authService.currentUserValue;
    if (!currentUser?.id) return;

    this.http.patch('http://localhost:3001/users/profile/me', this.formData, {
      headers: { 'x-user-id': currentUser.id }
    }).subscribe({
      next: () => {
        alert('อัปเดตข้อมูลสำเร็จ');
        this.isSaving = false;
      },
      error: (err) => {
        console.error('Failed to update profile', err);
        alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
        this.isSaving = false;
      }
    });
  }
}
