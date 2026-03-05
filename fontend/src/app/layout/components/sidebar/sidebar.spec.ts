import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // สำคัญ! ต้องมีเพื่อให้คลิกเปลี่ยนหน้าได้

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="sidebar">
      <div class="logo">
        🌱 <span>Green Sync</span>
      </div>
      
      <nav class="menu">
        <a routerLink="/dashboard" routerLinkActive="active" class="menu-item">
          📊 แดชบอร์ด
        </a>
        <div class="divider">งานหลัก</div>
        <a routerLink="/green-office" routerLinkActive="active" class="menu-item">
          🏢 Green Office
        </a>
        <a routerLink="/carbon-footprint" routerLinkActive="active" class="menu-item">
          👣 Carbon Footprint
        </a>
        <div class="divider">เครื่องมือ</div>
        <a routerLink="/ai-assistant" routerLinkActive="active" class="menu-item ai-item">
          🤖 AI Assistant <span class="badge">New</span>
        </a>
      </nav>
    </div>
  `,
  styles: [`
    .sidebar { width: 250px; height: 100vh; background: #1e293b; color: white; display: flex; flex-direction: column; }
    .logo { padding: 20px; font-size: 1.5rem; font-weight: bold; border-bottom: 1px solid #334155; }
    .logo span { color: #4ade80; }
    .menu { flex: 1; padding: 20px 10px; display: flex; flex-direction: column; gap: 5px; }
    .divider { font-size: 0.75rem; color: #94a3b8; margin: 15px 10px 5px; text-transform: uppercase; font-weight: bold; }
    
    .menu-item { 
      padding: 12px 15px; 
      color: #cbd5e1; 
      text-decoration: none; 
      border-radius: 8px; 
      transition: 0.2s; 
      display: flex; 
      align-items: center; 
      gap: 10px;
    }
    .menu-item:hover { background: #334155; color: white; }
    .menu-item.active { background: #4ade80; color: #0f172a; font-weight: bold; }
    
    .ai-item { color: #60a5fa; } /* สีฟ้าให้ AI */
    .badge { background: #ef4444; color: white; font-size: 0.7rem; padding: 2px 6px; border-radius: 10px; margin-left: auto; }
  `]
})
export class SidebarComponent {}