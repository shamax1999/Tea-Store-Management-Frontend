import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ManagerService {
  private apiUrl = 'http://localhost:8080/manager';

  constructor(private http: HttpClient) {}

  getManagers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/get-all`);
  }

  getManagerById(managerId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/get-manager-by-Id/${managerId}`);
  }

  getManagerByName(name: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/get-manager-by-name/${name}`);
  }

  addManager(manager: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/add-manager`, manager);
  }

  updateManager(manager: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/update`, manager);
  }

  deleteManager(managerId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete-by-id/${managerId}`);
  }
}
