import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManagerdashboardService {
  private baseUrl = 'http://localhost:8080'; 

  constructor(private http: HttpClient) {}


  getEmployees(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/employee/get-all`);
  }

  getSuppliers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/supplier/get-all`);
  }

  getItems(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/item/get-all`);
  }

  getOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/order/get-all`);
  }

  getTotalOrderPrice(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/order/get-total-price`);
  }
}
