import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet], // <--- ต้องมีอันนี้
  templateUrl: './app.html', // <--- เช็คชื่อไฟล์ดีๆ ว่าตรงกับไฟล์จริงไหม
  styleUrl: './app.css'
})
export class App {
  title = 'green-office-app';
}