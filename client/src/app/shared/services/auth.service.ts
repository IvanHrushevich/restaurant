import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { User } from '../models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private token: string | null;

  constructor(private readonly httpClient: HttpClient) {}

  public register(): any {
    //
  }

  public login(user: User): Observable<{ token: string }> {
    return this.httpClient
      .post<{ token: string }>('/api/auth/login', user)
      .pipe(
        tap(({ token }) => {
          localStorage.setItem('auth-token', token);
          this.setToken(token);
        })
      );
  }

  public setToken(token: string | null): void {
    this.token = token;
  }

  public getToken(): string | null {
    return this.token;
  }

  public isAuthenticated(): boolean {
    return !!this.token;
  }

  public logout(): void {
    this.setToken(null);
    localStorage.clear();
  }
}
