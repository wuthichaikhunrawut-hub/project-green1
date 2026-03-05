import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmissionFactorsService, EmissionFactor } from '../../../core/services/emission-factors.service';

@Component({
  selector: 'app-admin-emission-factors',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './emission-factors.html',
  styleUrls: ['./emission-factors.css']
})
export class AdminEmissionFactorsComponent implements OnInit {
  private factorsService = inject(EmissionFactorsService);
  private cdr = inject(ChangeDetectorRef);

  factors: EmissionFactor[] = [];
  isLoading = true;
  isSaving = false;
  
  selectedFactor: Partial<EmissionFactor> | null = null;

  categories = [
    'ไฟฟ้า (Electricity)',
    'เชื้อเพลิง (Fuel)',
    'น้ำประปา (Water)',
    'ขยะ (Waste)',
    'กระดาษ (Paper)',
    'การเดินทาง (Travel)'
  ];

  ngOnInit() {
    this.loadFactors();
  }

  loadFactors() {
    this.isLoading = true;
    this.factorsService.getFactors().subscribe({
      next: (data) => {
        this.factors = data;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Failed to load emission factors:', err);
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  openModal(item?: EmissionFactor) {
    if (item) {
      this.selectedFactor = { ...item };
    } else {
      this.selectedFactor = {
        category: 'ไฟฟ้า (Electricity)',
        type_name: '',
        unit: 'kWh',
        factor_value: 0.0,
        gwp_version: 'IPCC AR6',
        is_active: true
      };
    }
  }

  closeModal() {
    this.selectedFactor = null;
  }

  saveFactor() {
    if (!this.selectedFactor) return;
    this.isSaving = true;

    if (this.selectedFactor.id) {
      this.factorsService.updateFactor(this.selectedFactor.id, this.selectedFactor).subscribe({
        next: () => {
          alert('บันทึกข้อมูลสำเร็จ');
          this.closeModal();
          this.loadFactors();
          this.isSaving = false;
        },
        error: (err) => {
          console.error(err);
          alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
          this.isSaving = false;
        }
      });
    } else {
      this.factorsService.createFactor(this.selectedFactor).subscribe({
        next: () => {
          alert('เพิ่มค่าสัมประสิทธิ์สำเร็จ');
          this.closeModal();
          this.loadFactors();
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

  deleteFactor(id: string) {
    if (confirm('คุณแน่ใจหรือไม่ที่จะลบรายการนี้? ถ้ายังใช้งานอยู่ให้ปรับสถานะเป็น "ระงับ" แทนการลบเพื่อป้องกันข้อมูลเก่าผิดพลาด')) {
      this.factorsService.deleteFactor(id).subscribe({
        next: () => {
          this.loadFactors();
        },
        error: (err) => {
          console.error(err);
          alert('เกิดข้อผิดพลาดในการลบ');
        }
      });
    }
  }
}
