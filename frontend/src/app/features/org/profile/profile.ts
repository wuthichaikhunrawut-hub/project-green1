import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-org-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class OrgProfileComponent implements OnInit {
  orgForm!: FormGroup;
  isEditing = false;
  savedData: any;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.orgForm = this.fb.group({
      name: ['บริษัท กรีนคอร์ปอเรชั่น จำกัด', [Validators.required, Validators.minLength(5)]],
      taxId: ['0105559012345', [Validators.required, Validators.pattern('^[0-9]{13}$')]],
      type: ['บริษัทจำกัด', Validators.required],
      address: ['123 อาคารกรีนทาวเวอร์ ชั้น 15 ถนนรัชดาภิเษก แขวงดินแดง เขตดินแดง กรุงเทพมหานคร 10400', Validators.required],
      contactPerson: ['สมชาย รักโลก', Validators.required],
      phone: ['02-123-4567', Validators.required],
      email: ['contact@greencorp.co.th', [Validators.required, Validators.email]],
      website: ['www.greencorp.co.th'],
      numberOfEmployees: [50, [Validators.required, Validators.min(1)]],
      totalFloorArea: [1200, [Validators.required, Validators.min(1)]],
      workingHoursPerYear: [2080, [Validators.required, Validators.min(1)]],
      baseYear: [2566, Validators.required],
      targetReductionPercent: [5, [Validators.required, Validators.min(0), Validators.max(100)]]
    });

    this.orgForm.disable(); // Initially disabled
  }
  
  toggleEdit() {
    this.isEditing = !this.isEditing;
    if (this.isEditing) {
      this.orgForm.enable();
    } else {
      // Revert to original data if they cancel edit
      this.orgForm.patchValue(this.savedData);
      this.orgForm.disable();
    }
  }
  
  saveProfile() {
    if (this.orgForm.valid) {
      this.isEditing = false;
      this.savedData = { ...this.orgForm.value };
      this.orgForm.disable();
      alert('บันทึกข้อมูลหน่วยงานเรียบร้อยแล้ว');
    } else {
      // Mark all as touched to show validation errors
      Object.keys(this.orgForm.controls).forEach(key => {
        this.orgForm.get(key)?.markAsTouched();
      });
    }
  }

  onLogoUpload() {
    // Mock clicking a hidden file input
    const confirmUpload = confirm('คุณต้องการเลือกรูปภาพมาใช้เป็นโลโก้องค์กรใช่หรือไม่? (จำลอง)');
    if (confirmUpload) {
      alert('อัปโหลดและอัปเดตโลโก้เรียบร้อย');
    }
  }
}
