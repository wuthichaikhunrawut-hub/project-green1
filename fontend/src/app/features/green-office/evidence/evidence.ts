import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-green-office-evidence',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './evidence.html',
  styleUrl: './evidence.css'
})
export class GreenOfficeEvidenceComponent {
  files = [
    { id: 1, name: 'รายงานการประชุม_มค_67.pdf', size: '2.4 MB', uploadDate: '15 ม.ค. 2567', category: 'หมวดที่ 1', status: 'approved' },
    { id: 2, name: 'ภาพถ่ายกิจกรรมรณรงค์คัดแยกขยะ.jpg', size: '4.1 MB', uploadDate: '10 ก.พ. 2567', category: 'หมวดที่ 2', status: 'pending' },
    { id: 3, name: 'ใบเสร็จค่าไฟ_ธค_66.pdf', size: '1.1 MB', uploadDate: '5 ก.พ. 2567', category: 'หมวดที่ 3', status: 'rejected' },
    { id: 4, name: 'แผนการจัดการของเสียปี2567.docx', size: '850 KB', uploadDate: '20 ธ.ค. 2566', category: 'หมวดที่ 4', status: 'approved' }
  ];

  isDragging = false;
  selectedPreviewFile: any = null;
  searchTerm = '';
  selectedCategory = '';

  get filteredFiles() {
    return this.files.filter(f => 
      f.name.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
      (this.selectedCategory ? f.category === this.selectedCategory : true)
    );
  }
  
  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragging = true;
  }
  
  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;
  }
  
  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;
    if (event.dataTransfer?.files?.length) {
      this.handleUpload(event.dataTransfer.files[0]);
    }
  }
  
  triggerFileInput() {
    document.getElementById('fileInput')?.click();
  }
  
  onFileSelect(event: any) {
    if (event.target.files?.length) {
      this.handleUpload(event.target.files[0]);
    }
  }

  handleUpload(file: File) {
    // Generate a mock entry
    const newFile = {
      id: Date.now(),
      name: file.name,
      size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
      uploadDate: new Date().toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: 'numeric' }),
      category: this.selectedCategory || 'หมวดที่ยังไม่ระบุ',
      status: 'pending'
    };
    
    // Add to top of list
    this.files.unshift(newFile);
  }

  deleteFile(id: number) {
    if (confirm('คุณแน่ใจหรือไม่ว่าต้องการลบไฟล์นี้?')) {
      this.files = this.files.filter(f => f.id !== id);
    }
  }

  // Modal Controls
  openPreview(file: any) {
    this.selectedPreviewFile = file;
  }

  closePreview() {
    this.selectedPreviewFile = null;
  }
}
