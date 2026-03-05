import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-subscription',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './subscription.html',
  styleUrl: './subscription.css'
})
export class SubscriptionComponent {
  currentPlan = 'Pro';
  billingCycle = 'yearly'; // 'monthly' | 'yearly'
  
  plans = [
    { 
      id: 'Free',
      name: 'Starter (ฟรี)', 
      monthlyPrice: 0,
      yearlyPrice: 0,
      description: 'เหมาะสำหรับองค์กรขนาดเล็กที่เพิ่งเริ่มต้น',
      features: [
        { text: 'ผู้ใช้งานสูงสุด 5 คน', included: true },
        { text: 'บันทึกข้อมูลก๊าซเรือนกระจกรายเดือน', included: true },
        { text: 'AI สแกนบิลอัตโนมัติ 5 ครั้ง/เดือน', included: true },
        { text: 'แบบประเมิน Green Office พื้นฐาน', included: true },
        { text: 'พื้นที่เก็บไฟล์หลักฐาน 1 GB', included: true },
        { text: 'รายงานสรุปผลรายปี', included: false },
        { text: 'ส่งออกข้อมูลเป็น Excel/PDF', included: false }
      ]
    },
    { 
      id: 'Pro',
      name: 'Professional', 
      monthlyPrice: 1500,
      yearlyPrice: 15000,
      description: 'เหมาะสำหรับ SME ที่ต้องการระบบครบวงจร',
      features: [
        { text: 'ผู้ใช้งานสูงสุด 20 คน', included: true },
        { text: 'บันทึกข้อมูลแบบเรียลไทม์', included: true },
        { text: 'AI สแกนบิลอัตโนมัติ 100 ครั้ง/เดือน', included: true },
        { text: 'แบบประเมิน Green Office ขั้นสูง', included: true },
        { text: 'พื้นที่เก็บไฟล์หลักฐาน 20 GB', included: true },
        { text: 'รายงานสรุปผลรายเดือนและเชิงลึก', included: true },
        { text: 'ส่งออกข้อมูลเป็น Excel/PDF', included: true }
      ],
      popular: true
    },
    { 
      id: 'Enterprise',
      name: 'Enterprise', 
      monthlyPrice: 5000,
      yearlyPrice: 50000,
      description: 'เหมาะสำหรับองค์กรขนาดใหญ่ที่มีหลายสาขา',
      features: [
        { text: 'ผู้ใช้งานไม่จำกัด', included: true },
        { text: 'จัดการข้อมูลแยกตามสาขา/อาคาร', included: true },
        { text: 'AI สแกนบิลอัตโนมัติไม่จำกัด', included: true },
        { text: 'มีที่ปรึกษาเฉพาะทางคอยช่วยเหลือ', included: true },
        { text: 'พื้นที่เก็บไฟล์หลักฐานไม่จำกัด', included: true },
        { text: 'แดชบอร์ดปรับแต่งได้อิสระ', included: true },
        { text: 'เชื่อมต่อ API กับระบบ ERP ภายใน', included: true }
      ]
    }
  ];

  toggleBillingCycle() {
    this.billingCycle = this.billingCycle === 'monthly' ? 'yearly' : 'monthly';
  }

  selectPlan(plan: any) {
    if (this.currentPlan === plan.id) {
      alert('คุณกำลังใช้งานแพ็กเกจนี้อยู่แล้ว');
      return;
    }
    
    const price = this.billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
    const confirmMessage = `ยืนยันการสมัครแพ็กเกจ ${plan.name}\nรอบบิล: ${this.billingCycle === 'monthly' ? 'รายเดือน' : 'รายปี'}\nราคา: ฿${price.toLocaleString()} / ${this.billingCycle === 'monthly' ? 'เดือน' : 'ปี'}`;
    
    if (confirm(confirmMessage)) {
      this.currentPlan = plan.id;
      alert(`อัปเกรดเป็นแพ็กเกจ ${plan.name} สำเร็จ!`);
    }
  }
}
