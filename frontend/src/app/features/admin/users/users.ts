import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsersService, User } from '../../../core/services/users.service';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './users.html',
  styleUrls: ['./users.css']
})
export class AdminUsersComponent implements OnInit {
  private usersService = inject(UsersService);
  private cdr = inject(ChangeDetectorRef);

  users: User[] = [];
  isLoading = true;

  // For Edit Modal
  selectedUser: Partial<User> | null = null;
  isSaving = false;

  roles = ['USER', 'EXECUTIVE', 'ASSESSOR', 'ADMIN'];

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.isLoading = true;
    this.usersService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Failed to load users:', err);
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  openEditModal(user?: User) {
    if (user) {
      this.selectedUser = { ...user };
    } else {
      // Setup empty user for creation
      this.selectedUser = {
        email: '',
        username: '',
        password: '',
        role: 'USER',
        is_active: true
      };
    }
  }

  closeEditModal() {
    this.selectedUser = null;
  }

  saveUser() {
    if (!this.selectedUser) return;
    this.isSaving = true;

    if (this.selectedUser.id) {
      // Update existing
      this.usersService.updateUser(this.selectedUser.id, this.selectedUser).subscribe({
        next: () => {
          alert('บันทึกข้อมูลสำเร็จ');
          this.isSaving = false;
          this.closeEditModal();
          this.loadUsers();
        },
        error: (err) => {
          console.error('Failed to update user:', err);
          alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
          this.isSaving = false;
        }
      });
    } else {
      // Create new
      this.usersService.createUser(this.selectedUser).subscribe({
        next: () => {
          alert('เพิ่มผู้ใช้งานสำเร็จ');
          this.isSaving = false;
          this.closeEditModal();
          this.loadUsers();
        },
        error: (err) => {
          console.error('Failed to create user:', err);
          alert('เกิดข้อผิดพลาดในการเพิ่มผู้ใช้งาน');
          this.isSaving = false;
        }
      });
    }
  }

  suspendUser(user: User) {
    const action = user.is_active ? 'ระงับ' : 'เปิดใช้งาน';
    if (!confirm(`ยืนยันการ${action}บัญชีผู้ใช้นี้ใช่หรือไม่?`)) return;

    this.usersService.updateUser(user.id, { is_active: !user.is_active }).subscribe({
      next: () => {
        alert(`${action}บัญชีเรียบร้อยแล้ว`);
        this.loadUsers();
      },
      error: (err) => {
        console.error('Failed to toggle active status:', err);
        alert('เกิดข้อผิดพลาดในการดำเนินการ');
      }
    });
  }
}
