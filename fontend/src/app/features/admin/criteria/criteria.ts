import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GreenCriteriaService, GreenCriteria } from '../../../core/services/green-criteria.service';

@Component({
  selector: 'app-admin-criteria',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './criteria.html',
  styleUrls: ['./criteria.css']
})
export class AdminCriteriaComponent implements OnInit {
  private criteriaService = inject(GreenCriteriaService);
  private cdr = inject(ChangeDetectorRef);

  criteriaList: GreenCriteria[] = [];
  isLoading = true;
  isSaving = false;
  
  selectedCriteria: Partial<GreenCriteria> | null = null;

  ngOnInit() {
    this.loadCriteria();
  }

  loadCriteria() {
    this.isLoading = true;
    this.criteriaService.getCriteriaList().subscribe({
      next: (data) => {
        this.criteriaList = data;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Failed to load criteria:', err);
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  openModal(item?: GreenCriteria) {
    if (item) {
      this.selectedCriteria = { ...item };
    } else {
      this.selectedCriteria = {
        category_number: 1,
        criteria_code: '',
        criteria_name: '',
        max_score: 5,
        description: '',
        year_version: new Date().getFullYear()
      };
    }
  }

  closeModal() {
    this.selectedCriteria = null;
  }

  saveCriteria() {
    if (!this.selectedCriteria) return;
    this.isSaving = true;

    if (this.selectedCriteria.id) {
      this.criteriaService.updateCriteria(this.selectedCriteria.id, this.selectedCriteria).subscribe({
        next: () => {
          alert('บันทึกข้อมูลสำเร็จ');
          this.closeModal();
          this.loadCriteria();
          this.isSaving = false;
        },
        error: (err) => {
          console.error(err);
          alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
          this.isSaving = false;
        }
      });
    } else {
      this.criteriaService.createCriteria(this.selectedCriteria).subscribe({
        next: () => {
          alert('เพิ่มเกณฑ์การประเมินสำเร็จ');
          this.closeModal();
          this.loadCriteria();
          this.isSaving = false;
        },
        error: (err) => {
          console.error(err);
          alert('เกิดข้อผิดพลาดในการเพิ่มข้อมูล');
          this.isSaving = false;
        }
      });
    }
  }

  deleteCriteria(id: number) {
    if (confirm('คุณแน่ใจหรือไม่ที่จะลบเกณฑ์นี้? ข้อมูลการประเมินที่ผูกไว้อาจได้รับผลกระทบ')) {
      this.criteriaService.deleteCriteria(id).subscribe({
        next: () => {
          this.loadCriteria();
        },
        error: (err) => {
          console.error(err);
          alert('เกิดข้อผิดพลาดในการลบ');
        }
      });
    }
  }
}
