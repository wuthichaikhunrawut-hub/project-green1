import { Injectable } from '@angular/core';
import { of, Observable, delay } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AiChatService {

  // จำลองส่งข้อความหา AI
  sendMessage(message: string): Observable<string> {
    console.log('Sending to AI:', message);
    
    // Logic การตอบกลับแบบสุ่ม (เพื่อให้ดูฉลาดนิดนึงตอน Demo)
    let reply = 'ขออภัยครับ ผมไม่เข้าใจคำถาม';
    
    if (message.includes('สวัสดี')) {
      reply = 'สวัสดีครับ! มีเรื่อง Green Office หรือ Carbon Footprint ให้ผมช่วยไหมครับ?';
    } else if (message.includes('เกณฑ์') || message.includes('หมวด')) {
      reply = 'เกณฑ์สำนักงานสีเขียวมีทั้งหมด 6 หมวดครับ ได้แก่... (ข้อมูลตัวอย่าง)';
    } else if (message.includes('ไฟฟ้า') || message.includes('หน่วย')) {
      reply = 'การคำนวณไฟฟ้าใช้สูตร: หน่วย kWh x ค่า Emission Factor ครับ';
    }

    // จำลองเวลาคิด 1.5 วินาที
    return of(reply).pipe(delay(1500));
  }
}