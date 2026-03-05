import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CarbonService, CarbonLog } from '../../core/services/carbon.service';

@Component({
  selector: 'app-carbon-logs',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './carbon-logs.html',
  styleUrl: './carbon-logs.css'
})
export class CarbonLogsComponent implements OnInit {
  private carbonService = inject(CarbonService);

  logs: CarbonLog[] = [];
  isLoading = false;

  newEntry = {
    activity_type: '',
    month: new Date().getMonth() + 1,
    year: 2024,
    usage_amount: 0,
    evidence_file: null as File | null
  };

  isScanning = false;

  ngOnInit() {
    this.fetchLogs();
  }

  fetchLogs() {
    this.isLoading = true;
    this.carbonService.getLogs().subscribe({
      next: (data) => {
        this.logs = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load logs', err);
        this.isLoading = false;
      }
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.isScanning = true;
      this.carbonService.scanBill(file).subscribe({
        next: (res) => {
          this.isScanning = false;
          if (res.amount) {
            this.newEntry.usage_amount = res.amount;
            this.newEntry.activity_type = 'Electricity'; // default assume PEA for now
            alert(`AI ตรวจพบ: หรือปริมาณ ${res.amount}`);
          }
        },
        error: (err) => {
          this.isScanning = false;
          alert('เกิดข้อผิดพลาดในการแปลผล AI');
        }
      });
    }
  }

  saveLog() {
    if (!this.newEntry.activity_type || !this.newEntry.usage_amount) {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }

    let unit = '';
    let factor = 0;
    
    if (this.newEntry.activity_type === 'Electricity') { unit = 'kWh'; factor = 0.5; } 
    else if (this.newEntry.activity_type === 'Water') { unit = 'm3'; factor = 0.3; } 
    else if (this.newEntry.activity_type === 'Gasoline') { unit = 'Litre'; factor = 2.3; }

    const calculatedEmission = this.newEntry.usage_amount * factor;

    const payload: CarbonLog = {
      date: `${this.newEntry.year}-${String(this.newEntry.month).padStart(2, '0')}-01`,
      type: this.newEntry.activity_type,
      amount: this.newEntry.usage_amount,
      unit: unit,
      emission: calculatedEmission,
      source: 'MANUAL'
    };

    this.carbonService.addLog(payload).subscribe({
      next: (res) => {
        alert('บันทึกข้อมูลเรียบร้อยแล้ว!');
        this.fetchLogs(); // refresh table
        // Reset Form
        this.newEntry = {
          activity_type: '',
          month: new Date().getMonth() + 1,
          year: 2024,
          usage_amount: 0,
          evidence_file: null
        };
        document.getElementById('closeModalBtn')?.click();
      },
      error: (err) => {
        alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
      }
    });
  }

  deleteLog(id: string | undefined) {
    if (!id) return;
    if (confirm('คุณแน่ใจหรือไม่ที่จะลบรายการนี้?')) {
      this.carbonService.deleteLog(id).subscribe({
        next: () => {
          this.fetchLogs(); // refresh table
        },
        error: (err) => {
          alert('เกิดข้อผิดพลาด ไม่สามารถลบข้อมูลได้');
        }
      });
    }
  }
}