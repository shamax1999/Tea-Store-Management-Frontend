import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() {}

  login(role: string, userId: string) {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userRole', role);
    localStorage.setItem('userId', userId); 
    if (role === 'ADMIN') {
      localStorage.setItem('adminId', userId); 
    } else if (role === 'MANAGER') {
      localStorage.setItem('managerId', userId); 
    }
  }

  logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
    localStorage.removeItem('adminId');
    localStorage.removeItem('managerId'); 
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  getUserRole(): string | null {
    return localStorage.getItem('userRole');
  }

  getUserId(): string | null {
    return localStorage.getItem('userId');
  }

  getAdminId(): string | null {
    return localStorage.getItem('adminId');
  }

  getManagerId(): string | null {
    return localStorage.getItem('managerId');
  }
}
