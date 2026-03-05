import { Component, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface ChatMessage {
  role: 'user' | 'bot';
  text: string;
  time: Date;
}

@Component({
  selector: 'app-ai-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ai-chat.html',
  styleUrls: ['./ai-chat.css']
})
export class AiChatComponent {
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);

  isOpen = false;
  isLoading = false;
  inputMessage = '';
  messages: ChatMessage[] = [
    {
      role: 'bot',
      text: 'สวัสดีครับ! ผม GreenBot ผู้ช่วย AI ด้านสำนักงานสีเขียวและ Carbon Footprint 🌿 ถามอะไรก็ได้เลยครับ',
      time: new Date()
    }
  ];

  toggleChat() {
    this.isOpen = !this.isOpen;
  }

  sendMessage() {
    const text = this.inputMessage.trim();
    if (!text || this.isLoading) return;

    this.messages.push({ role: 'user', text, time: new Date() });
    this.inputMessage = '';
    this.isLoading = true;

    this.http.post<{ reply: string }>(
      'http://localhost:3001/gemini/chat',
      { message: text },
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    ).subscribe({
      next: (res) => {
        this.messages.push({ role: 'bot', text: res.reply, time: new Date() });
        this.isLoading = false;
        this.scrollToBottom();
      },
      error: (err) => {
        const isApiKeyError = err?.error?.message?.includes('GEMINI_API_KEY');
        const errorText = isApiKeyError
          ? '⚠️ ยังไม่ได้ตั้งค่า GEMINI_API_KEY ในระบบ กรุณาแจ้งผู้ดูแลระบบ'
          : '❌ ไม่สามารถเชื่อมต่อ AI ได้ในขณะนี้ กรุณาลองใหม่อีกครั้ง';
        this.messages.push({ role: 'bot', text: errorText, time: new Date() });
        this.isLoading = false;
        this.scrollToBottom();
      }
    });

    this.scrollToBottom();
  }

  onKeyEnter(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  clearChat() {
    this.messages = [
      { role: 'bot', text: 'สวัสดีครับ! ผม GreenBot ผู้ช่วย AI ด้านสำนักงานสีเขียวและ Carbon Footprint 🌿 ถามอะไรก็ได้เลยครับ', time: new Date() }
    ];
  }

  private scrollToBottom() {
    if (!isPlatformBrowser(this.platformId)) return;
    setTimeout(() => {
      const el = document.querySelector('.chat-messages');
      if (el) el.scrollTop = el.scrollHeight;
    }, 50);
  }
}
