import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent {

  hero = {
    title: 'แพลตฟอร์มบริหารจัดการคาร์บอน สำหรับองค์กรไทย',
    subtitle: 'ลดความซับซ้อนในการจัดทำ Carbon Footprint, Green Office และ ESG ด้วยระบบ SaaS ที่ออกแบบมาเพื่อบริบทขององค์กรไทย',
    primaryCta: 'เริ่มใช้งานระบบ',
    secondaryCta: 'ติดต่อขอข้อมูล'
  };

  problems = [
    'การจัดเก็บข้อมูลพลังงานและเอกสารยังแยกหลายระบบ',
    'การคำนวณ Carbon Footprint ใช้เวลานานและเสี่ยงต่อความผิดพลาด',
    'ขาดเครื่องมือที่สอดคล้องกับมาตรฐาน Green Office และ ESG ของไทย',
    'การจัดทำรายงานเพื่อผู้บริหารและหน่วยงานกำกับดูแลทำได้ยาก'
  ];

  solutions = [
    'รวมข้อมูลด้านพลังงานและสิ่งแวดล้อมไว้ในระบบเดียว',
    'ใช้ AI ช่วยสแกนเอกสารและคำนวณคาร์บอนอัตโนมัติ',
    'ออกแบบกระบวนการให้สอดคล้องกับมาตรฐานประเทศไทย',
    'สร้างรายงานและ Dashboard ที่ผู้บริหารเข้าใจง่าย'
  ];

  features = [
    {
      icon: 'fa-robot',
      title: 'AI Bill & Document Scan',
      description: 'สแกนบิลค่าไฟ น้ำมัน และเอกสารพลังงานด้วย AI ลดงาน manual และเพิ่มความแม่นยำในการคำนวณ Carbon Footprint'
    },
    {
      icon: 'fa-chart-line',
      title: 'Carbon Analytics Dashboard',
      description: 'แดชบอร์ดวิเคราะห์การปล่อยก๊าซเรือนกระจกแบบ real-time พร้อมกราฟและรายงานเชิงผู้บริหาร'
    },
    {
      icon: 'fa-building',
      title: 'Green Office & ESG',
      description: 'รองรับการประเมิน Green Office และการเตรียมข้อมูลด้าน ESG สำหรับองค์กรไทย'
    },
    {
      icon: 'fa-shield-halved',
      title: 'Enterprise-grade Security',
      description: 'รองรับหลายองค์กร (Multi-Organization) กำหนดสิทธิ์ผู้ใช้งาน และจัดการข้อมูลอย่างปลอดภัย'
    }
  ];

  targetUsers = [
    'หน่วยงานราชการและรัฐวิสาหกิจ',
    'องค์กรเอกชนและบริษัทขนาดใหญ่',
    'มหาวิทยาลัยและสถาบันการศึกษา',
    'องค์กรที่ต้องเตรียมความพร้อมด้าน ESG'
  ];

}
