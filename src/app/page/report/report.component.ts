import { Component, OnInit } from '@angular/core';
import { ReportService } from './report.service';
import { Report } from './report.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  providers: [ReportService],
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  currentView: string = 'reportList';
  reports: Report[] = [];
  newReport: Report = {
    reportName: '',
    date: new Date().toISOString().split('T')[0], 
    adminId: 0,
    managerId: 0,
    reportType: 'Sales'
  };

  selectedReport: any = {
    reportName: '',
    date: '',
    adminId: '',
    managerId: '',
    reportType: ''
};

  selectedFile: File | null = null;
  searchTerm: string = '';
  filteredReports: Report[] = [];
  

  constructor(private reportService: ReportService) {}

  ngOnInit(): void {
    this.getReports();
  }

  getReports(): void {
    this.reportService.getReports().subscribe(
      (data) => {
        this.reports = data;
        this.filteredReports = data;
      },
      (error) => {
        console.error('Error fetching reports!', error);
      }
    );
  }

  handleFileInput(event: any): void {
    const file = event.target.files[0];
    this.selectedFile = file ? file : null;
  }

  addReport(): void {
    if (!this.selectedFile) {
      alert('Please select a PDF file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('report', JSON.stringify(this.newReport));
    formData.append('file', this.selectedFile);

    this.reportService.addReport(formData).subscribe(
      () => {
        this.getReports();
        alert('Report added successfully');
        this.currentView = 'reportList';
      },
      (error) => {
        console.error('Error adding report', error);
        alert('Error adding report, please try again later.');
      }
    );
  }

  updateReport(report: Report): void {
    this.selectedReport = { ...report }; 
    this.currentView = 'updateReport';
  }

  submitUpdatedReport(): void {
    if (!this.selectedReport || !this.selectedReport.reportId) {
      alert('No report selected for update.');
      return;
    }

    const formData = new FormData();
    formData.append('report', JSON.stringify(this.selectedReport));
    if (this.selectedFile) {
      formData.append('file', this.selectedFile);
    }

    this.reportService.updateReport(this.selectedReport.reportId, formData).subscribe(
      () => {
        this.getReports();
        alert('Report updated successfully');
        this.currentView = 'reportList';
      },
      (error) => {
        console.error('Error updating report', error);
        alert('Error updating report, please try again later.');
      }
    );
  }

  deleteReport(reportId: number): void {
    this.reportService.deleteReport(reportId).subscribe(
      () => {
        this.getReports();
        alert('Report deleted successfully');
      },
      (error) => {
        console.error('Error deleting report', error);
        alert('Error deleting report, please try again later.');
      }
    );
  }

  downloadFile(reportId: number): void {
    this.reportService.downloadFile(reportId).subscribe(
      (blob) => {
        const link = document.createElement('a');
        const url = window.URL.createObjectURL(blob);
        link.href = url;
        link.download = `report-${reportId}.pdf`;
        link.click();
        window.URL.revokeObjectURL(url);
        alert('File downloaded successfully');
      },
      (error) => {
        console.error('Error downloading file', error);
        alert('Error downloading the file.');
      }
    );
  }

  filterReports(): void {
    this.filteredReports = this.reports.filter(report =>
      report.reportName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      report.reportType.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
