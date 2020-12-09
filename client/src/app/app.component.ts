import { Component, OnInit } from '@angular/core';

import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  constructor(private readonly authService: AuthService) {}

  public ngOnInit(): void {
    this.checkTokenInLocalStorage();
  }

  private checkTokenInLocalStorage(): void {
    const token: string | null = localStorage.getItem('auth-token');

    if (token) {
      this.authService.setToken(token);
    }
  }
}
