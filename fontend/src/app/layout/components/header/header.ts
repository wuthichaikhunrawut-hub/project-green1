import { Component, inject, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class HeaderComponent {
  authService = inject(AuthService);
  router = inject(Router);

  @Output() toggleSidebarEvent = new EventEmitter<void>();

  // Fetch User data from Service (or default)
  user = this.authService.getUser();
  username = this.user?.username || 'Guest';
  role = this.user?.role || 'Visitor';

  toggleSidebar() {
    this.toggleSidebarEvent.emit();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
