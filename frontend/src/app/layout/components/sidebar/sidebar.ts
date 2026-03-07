import { Component, inject, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, UpperCasePipe } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, UpperCasePipe],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css']
})
export class SidebarComponent implements OnInit, OnDestroy {
  authService = inject(AuthService);
  router = inject(Router);

  @Input() isCollapsed = false;

  user: any = null;
  private subscription: Subscription = new Subscription();

  // Dropdown open states
  carbonOpen = true;
  aiOpen = false;
  assessmentOpen = false;
  orgOpen = false;

  ngOnInit() {
    this.subscription.add(
      this.authService.currentUser$.subscribe(user => {
        this.user = user;
      })
    );
    // Auto-expand sections based on active route
    const url = this.router.url;
    if (url.includes('/carbon')) this.carbonOpen = true;
    if (url.includes('/ai-scan')) this.aiOpen = true;
    if (url.includes('/green-office')) this.assessmentOpen = true;
    if (url.includes('/org') || url.includes('/assessor/profile') || url.includes('/subscription')) this.orgOpen = true;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  hasRole(roles: string[]): boolean {
    return this.user?.role ? roles.includes(this.user.role) : false;
  }

  toggle(section: 'carbon' | 'ai' | 'assessment' | 'org') {
    if (section === 'carbon') this.carbonOpen = !this.carbonOpen;
    else if (section === 'ai') this.aiOpen = !this.aiOpen;
    else if (section === 'assessment') this.assessmentOpen = !this.assessmentOpen;
    else if (section === 'org') this.orgOpen = !this.orgOpen;
  }
}
