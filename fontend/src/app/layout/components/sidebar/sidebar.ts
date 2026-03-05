import { Component, inject, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css']
})
export class SidebarComponent implements OnInit, OnDestroy {
  authService = inject(AuthService);

  @Input() isCollapsed = false;

  user: any = null;
  private subscription: Subscription = new Subscription();

  ngOnInit() {
    this.subscription.add(
      this.authService.currentUser$.subscribe(user => {
        this.user = user;
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  hasRole(roles: string[]): boolean {
    return this.user?.role ? roles.includes(this.user.role) : false;
  }
}
