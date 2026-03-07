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
    titleEn: 'Decarbonize Your Organization with AI',
    titleTh: 'ยกระดับองค์กรสู่ Net Zero ด้วยพลัง AI',
    subtitleEn: 'The enterprise-grade ESG and Carbon Footprint platform for modern organizations. Built for compliance, designed for impact.',
    subtitleTh: 'แพลตฟอร์ม ESG และ Carbon Footprint ระดับ Enterprise สำหรับองค์กรยุคใหม่ ครบถ้วนตามมาตรฐาน สวยงาม และใช้งานง่ายที่สุด',
    primaryCta: 'เริ่มต้นใช้งานฟรี',
    secondaryCta: 'พอร์ทัลผู้ตรวจประเมิน'
  };

  problemPoints = [
    {
      title: 'ข้อมูลกระจัดกระจาย',
      desc: 'ข้อมูลพลังงานและเอกสารจัดเก็บแยกหลายระบบ ทำให้ยากต่อการรวบรวมและตรวจสอบ',
      icon: 'fa-box-archive'
    },
    {
      title: 'การคำนวณที่ล่าช้า',
      desc: 'การใช้วิธีคำนวณแบบเดิมมีความซับซ้อน ใช้เวลานาน และเสี่ยงต่อความผิดพลาด',
      icon: 'fa-calculator'
    },
    {
      title: 'มาตรฐานที่ซับซ้อน',
      desc: 'ข้อกำหนด Green Office และ ESG มีรายละเอียดมากและเปลี่ยนแปลงอยู่เสมอ',
      icon: 'fa-file-shield'
    }
  ];

  features = [
    {
      id: 'ai-ocr',
      icon: 'fa-wand-magic-sparkles',
      titleEn: 'AI Intelligence',
      titleTh: 'ระบบ AI อัจฉริยะ',
      descTh: 'สแกนเอกสารและบิลค่าพลังงานด้วย AI ความแม่นยำสูง ลดงาน Manual ได้มากกว่า 90%',
      color: 'emerald'
    },
    {
      id: 'analytics',
      icon: 'fa-chart-pie',
      titleEn: 'Real-time Analytics',
      titleTh: 'วิเคราะห์ข้อมูล Real-time',
      descTh: 'แดชบอร์ดสรุปผลการปล่อยก๊าซเรือนกระจกรายเดือน พร้อมระบบ AI แนะนำจุดที่ควรปรับปรุง',
      color: 'blue'
    },
    {
      id: 'reporting',
      icon: 'fa-file-export',
      titleEn: 'Smart Reporting',
      titleTh: 'รายงานมาตรฐานสากล',
      descTh: 'ส่งออกรายงานตามมาตรฐาน Green Office และ ESG ได้ทันทีเพียงคลิกเดียว',
      color: 'indigo'
    },
    {
      id: 'multitenant',
      icon: 'fa-users-gear',
      titleEn: 'Enterprise Ready',
      titleTh: 'พร้อมสำหรับทุกขนาดองค์กร',
      descTh: 'รองรับการจัดการหลายหน่วยงาน (Multi-Org) พร้อมระบบจัดการสิทธิ์ที่ปลอดภัยและละเอียด',
      color: 'slate'
    }
  ];

  howItWorks = [
    { step: '01', title: 'การนำเข้าข้อมูล', desc: 'เชื่อมต่อข้อมูลหรืออัปโหลดบิลผ่านระบบ AI อัจฉริยะ' },
    { step: '02', title: 'ประมวลผลด้วย AI', desc: 'ระบบคำนวณและวิเคราะห์ตามมาตรฐานสากลโดยอัตโนมัติ' },
    { step: '03', title: 'สรุปผลและรายงาน', desc: 'ตรวจสอบผลลัพธ์ผ่านแดชบอร์ดและส่งออกรายงานได้ทันที' }
  ];

  stats = [
    { number: '500+', label: 'องค์กร', icon: 'fa-building' },
    { number: '120k', label: 'กิโลกรัมคาร์บอนที่ลดได้', icon: 'fa-leaf' },
    { number: '99.9%', label: 'ความแม่นยำ AI', icon: 'fa-microchip' },
    { number: 'Premium', label: 'มาตรฐาน ESG', icon: 'fa-award' }
  ];

  partners = [
    'https://upload.wikimedia.org/wikipedia/commons/e/e0/GISTDA_Logo.png',
    'https://www.tei.or.th/greenoffice/images/logo-green-office.png',
    'https://d1.awsstatic.com/logos/amazon-aws-logo.svg'
  ];
}
