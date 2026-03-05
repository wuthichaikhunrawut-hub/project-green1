import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssessorsAdminService, AssessorUser } from '../../../core/services/assessors-admin.service';

@Component({
  selector: 'app-admin-assessors',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './assessors.html',
  styleUrls: ['./assessors.css']
})
export class AdminAssessorsComponent implements OnInit {
  private svc = inject(AssessorsAdminService);
  private cdr = inject(ChangeDetectorRef);

  assessors: AssessorUser[] = [];
  isLoading = true;

  ngOnInit() { this.loadAssessors(); }

  loadAssessors() {
    this.isLoading = true;
    this.svc.getAssessors().subscribe({
      next: (data) => { this.assessors = data; this.isLoading = false; this.cdr.detectChanges(); },
      error: () => { this.isLoading = false; this.cdr.detectChanges(); }
    });
  }

  verify(user: AssessorUser) {
    const action = user.assessor_verified ? 'เพิกถอนการยืนยัน' : 'ยืนยัน';
    if (!confirm(`ต้องการ${action}สถานะผู้ตรวจประเมิน ${user.username} หรือไม่?`)) return;
    this.svc.verifyAssessor(user.id, !user.assessor_verified).subscribe({ next: () => this.loadAssessors() });
  }
}
