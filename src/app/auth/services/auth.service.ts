import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.inteface';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseURL = "";
  private user?: User;

  private users: User[] = [
    { id: 1, email: 'churro@gmail.com', password: '1234' }
  ];

  constructor() { }

  get currentUser(): User | undefined {
    if (!this.user) return undefined;
    return structuredClone(this.user);
  }

  login(email: string, password: string): Observable<User | null> {
    const user = this.users.find(u => u.email === email && u.password === password);
    if (user) {
      this.user = user;
      localStorage.setItem('token', user.id.toString());
      return of(user);
    } else {
      return of(null);
    }
  }

  logout(): void {
    this.user = undefined;
    localStorage.clear();
  }

  checkAuthenticacion(): Observable<boolean> {
    const token = localStorage.getItem('token');
    if (!token) return of(false);

    const user = this.users.find(u => u.id.toString() === token);
    if (user) {
      this.user = user;
      return of(true);
    } else {
      return of(false);
    }
  }

  register(username: string, password: string): Observable<User> {
    const newUser: User = {
      id: this.users.length + 1,
      email: username,
      password: password
    };
    this.users.push(newUser);
    return of(newUser);
  }
}
