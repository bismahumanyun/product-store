import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(this.getToken());
  isLoggedIn = this.tokenSubject.asObservable();

  constructor(private http: HttpClient) { }

  private getToken(): string | null {
    return typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  }

  login(username: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>('https://fakestoreapi.com/auth/login', { username, password });
  }

  logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      this.tokenSubject.next(null);
    }
  }
}
