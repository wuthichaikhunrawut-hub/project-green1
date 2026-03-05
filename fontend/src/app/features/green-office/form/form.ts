import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-green-office-form',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './form.html',
  styleUrl: './form.css'
})
export class GreenOfficeFormComponent {
  // Mock categories for the assessment
  categories = [
    { id: 1, title: 'หมวดที่ 1 การกำหนดนโยบาย การวางแผน (25 คะแนน)', progress: 0, status: 'pending', totalScore: 25 },
    { id: 2, title: 'หมวดที่ 2 การสื่อสารและสร้างจิตสำนึก (15 คะแนน)', progress: 0, status: 'pending', totalScore: 15 },
    { id: 3, title: 'หมวดที่ 3 การใช้ทรัพยากรและพลังงาน (15 คะแนน)', progress: 0, status: 'pending', totalScore: 15 },
    { id: 4, title: 'หมวดที่ 4 การจัดการของเสีย (15 คะแนน)', progress: 0, status: 'pending', totalScore: 15 },
    { id: 5, title: 'หมวดที่ 5 สภาพแวดล้อมและความปลอดภัย (15 คะแนน)', progress: 0, status: 'pending', totalScore: 15 },
    { id: 6, title: 'หมวดที่ 6 การจัดซื้อจัดจ้างที่เป็นมิตรกับสิ่งแวดล้อม (15 คะแนน)', progress: 0, status: 'pending', totalScore: 15 }
  ];

  activeCategory = 1;

  get activeCategoryTitle(): string {
    const category = this.categories.find(c => c.id === this.activeCategory);
    return category ? category.title : '';
  }

  // Radar Chart Configuration
  public radarChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        angleLines: { color: 'rgba(0,0,0,0.1)' },
        grid: { color: 'rgba(0,0,0,0.1)' },
        pointLabels: {
          font: { family: "'Sarabun', 'Prompt', sans-serif", size: 10 },
          color: '#64748b'
        },
        ticks: { display: false, stepSize: 20 },
        suggestedMin: 0,
        suggestedMax: 100
      }
    },
    plugins: {
      legend: { display: false }
    }
  };

  public radarChartLabels: string[] = [
    'หมวด 1', 'หมวด 2', 'หมวด 3', 'หมวด 4', 'หมวด 5', 'หมวด 6'
  ];

  public radarChartData: ChartData<'radar'> = {
    labels: this.radarChartLabels,
    datasets: [
      {
        data: this.categories.map(c => c.progress),
        label: 'ความพร้อม (%)',
        backgroundColor: 'rgba(16, 185, 129, 0.2)', // emerald-500
        borderColor: '#10b981',
        pointBackgroundColor: '#10b981',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#10b981',
        borderWidth: 2,
      }
    ]
  };

  public radarChartType: ChartType = 'radar';
  
  questions: any[] = [
    { id: '1.1', text: 'มีการกำหนดนโยบายสิ่งแวดล้อมที่ครอบคลุมการใช้ทรัพยากร พลังงาน และการจัดการของเสีย', answer: null },
    { id: '1.2', text: 'มีการแต่งตั้งคณะทำงาน Green Office และกำหนดบทบาทหน้าที่ชัดเจน', answer: null },
    { id: '1.3', text: 'มีการระบุและประเมินปัญหาสิ่งแวดล้อมลักษณะปัญหาสิ่งแวดล้อม (Environmental Aspect)', answer: null },
    { id: '1.4', text: 'มีการกำหนดเป้าหมาย แผนงานโครงการ และวิธีดำเนินการอย่างชัดเจน', answer: null }
  ];

  selectCategory(id: number) {
    this.activeCategory = id;
    this.questions = this.getQuestionsForCategory(id);
  }

  getQuestionsForCategory(id: number): any[] {
    const defaultAnswer = null;
    switch(id) {
      case 1: return [
        { id: '1.1', text: 'มีการกำหนดนโยบายสิ่งแวดล้อมที่ครอบคลุมการใช้ทรัพยากร พลังงาน และการจัดการของเสีย', answer: defaultAnswer },
        { id: '1.2', text: 'มีการแต่งตั้งคณะทำงาน Green Office และกำหนดบทบาทหน้าที่ชัดเจน', answer: defaultAnswer },
        { id: '1.3', text: 'มีการระบุและประเมินปัญหาสิ่งแวดล้อมลักษณะปัญหาสิ่งแวดล้อม (Environmental Aspect)', answer: defaultAnswer },
        { id: '1.4', text: 'มีการกำหนดเป้าหมาย แผนงานโครงการ และวิธีดำเนินการอย่างชัดเจน', answer: defaultAnswer }
      ];
      case 2: return [
        { id: '2.1', text: 'มีการจัดอบรมให้ความรู้เรื่อง Green Office อย่างน้อยปีละ 1 ครั้ง', answer: defaultAnswer },
        { id: '2.2', text: 'มีการรณรงค์และสื่อสารนโยบายผ่านช่องทางต่างๆ อย่างสม่ำเสมอ', answer: defaultAnswer }
      ];
      case 3: return [
        { id: '3.1', text: 'มาตรการประหยัดพลังงานไฟฟ้า (ตัวอย่างเช่น เปลี่ยนหลอด LED, ปรับแอร์ 25 องศา)', answer: defaultAnswer },
        { id: '3.2', text: 'มาตรการประหยัดน้ำ (ตัวอย่างเช่น เปลี่ยนก๊อกประหยัดน้ำ, รณรงค์ใช้น้ำอย่างรู้คุณค่า)', answer: defaultAnswer }
      ];
      case 4: return [
        { id: '4.1', text: 'มีการคัดแยกขยะอย่างถูกต้องและมีถังรองรับที่เพียงพอ', answer: defaultAnswer },
        { id: '4.2', text: 'มีการประเมินปริมาณขยะและลดปริมาณขยะที่ส่งกำจัดฝังกลบ', answer: defaultAnswer }
      ];
      case 5: return [
        { id: '5.1', text: 'มีการจัดการอากาศและแสงสว่างในพื้นที่ทำงานอย่างเหมาะสมและปลอดภัย', answer: defaultAnswer },
        { id: '5.2', text: 'พื้นที่ทำงานมีความเป็นระเบียบเรียบร้อย (5ส) และพร้อมสำหรับเหตุฉุกเฉิน', answer: defaultAnswer }
      ];
      case 6: return [
        { id: '6.1', text: 'มีการจัดซื้อจัดจ้างสินค้าและบริการที่เป็นมิตรกับสิ่งแวดล้อม', answer: defaultAnswer },
        { id: '6.2', text: 'ร้อยละของมูลค่าการจัดซื้อจัดจ้างสินค้าและบริการที่เป็นมิตรกับสิ่งแวดล้อม มากกว่า 50%', answer: defaultAnswer }
      ];
      default: return [];
    }
  }

  answerQuestion(q: any, answer: string) {
    q.answer = answer;
    this.recalculateProgress();
  }

  recalculateProgress() {
    // 1. Calculate how many questions are answered in current category
    const answeredCount = this.questions.filter(q => q.answer !== null).length;
    const progress = Math.round((answeredCount / this.questions.length) * 100);
    
    // 2. Update category array
    const catIndex = this.categories.findIndex(c => c.id === this.activeCategory);
    if (catIndex > -1) {
      this.categories[catIndex].progress = progress;
      if (progress === 100) {
        this.categories[catIndex].status = 'completed';
      } else if (progress > 0) {
        this.categories[catIndex].status = 'in-progress';
      }
    }

    // 3. Force Chart.js to redraw with new data array reference
    this.radarChartData = {
      labels: this.radarChartLabels,
      datasets: [
        {
          data: this.categories.map(c => c.progress),
          label: 'ความพร้อม (%)',
          backgroundColor: 'rgba(16, 185, 129, 0.2)',
          borderColor: '#10b981',
          pointBackgroundColor: '#10b981',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: '#10b981',
          borderWidth: 2,
        }
      ]
    };
  }
  
  saveProgress() {
    alert('บันทึกความคืบหน้าเรียบร้อยแล้ว');
  }
  
  submitAssessment() {
    const isAllComplete = this.categories.every(c => c.progress === 100);
    if (isAllComplete) {
      alert('ส่งแบบประเมินเรียบร้อยแล้ว กรมการเปลี่ยนแปลงสภาพภูมิอากาศจะตรวจสอบข้อมูลต่อไป');
    } else {
      alert('โปรดทำแบบประเมินให้ครบทั้ง 6 หมวด ก่อนกดส่ง');
    }
  }
}
