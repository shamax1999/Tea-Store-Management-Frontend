import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Report } from './report.model';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private apiUrl = 'http://localhost:8080/report';

  constructor(private http: HttpClient) {}

  getReports(): Observable<Report[]> {
    return this.http.get<Report[]>(`${this.apiUrl}/get-all`);
  }

  addReport(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/add-report`, formData);
  }

  updateReport(reportId: number, formData: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/update-report/${reportId}`, formData);
  }

  deleteReport(reportId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete-by-id/${reportId}`);
  }

  downloadFile(reportId: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/get-file/${reportId}`, { responseType: 'blob' });
  }
}
