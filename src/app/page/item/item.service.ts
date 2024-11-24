import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private baseUrl = 'http://localhost:8080/item';

  constructor(private http: HttpClient) {}

  addItem(item: any, image: File): Observable<any> {
    const formData = new FormData();
    formData.append('item', new Blob([JSON.stringify(item)], { type: 'application/json' }));
    formData.append('image', image);
  
    return this.http.post(`${this.baseUrl}/add-item`, formData).pipe(
      switchMap(response => {
        return this.http.get<any[]>(`${this.baseUrl}/get-all`);
      })
    );
  }
  
  
  

  getAllItems(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/get-all`);
  }
}