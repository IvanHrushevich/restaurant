import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService, MaterialService } from '../../services';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.scss'],
})
export class SiteLayoutComponent implements AfterViewInit {
  public links: Array<{ url: string; name: string }> = [
    { url: '/overview', name: 'Overview' },
    { url: '/analytics', name: 'Analytics' },
    { url: '/history', name: 'History' },
    { url: '/order', name: 'Order' },
    { url: '/categories', name: 'Categories' },
  ];

  @ViewChild('floatingButton') floatingButton: ElementRef;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  ngAfterViewInit(): void {
    MaterialService.initializeFloatingButton(this.floatingButton.nativeElement);
  }

  public logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
