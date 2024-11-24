import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  providers: [DashboardService],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  managersCount: number = 0;
  employeesCount: number = 0;
  suppliersCount: number = 0;
  itemsCount: number = 0;
  ordersCount: number = 0;
  totalOrderValue: number = 0; 
  totalProfits: number = 0;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.fetchCounts();
    this.fetchTotalOrderValue(); 
  }

  fetchCounts() {
    this.dashboardService.getManagers().subscribe(data => this.managersCount = data.length);
    this.dashboardService.getEmployees().subscribe(data => this.employeesCount = data.length);
    this.dashboardService.getSuppliers().subscribe(data => this.suppliersCount = data.length);
    this.dashboardService.getItems().subscribe(data => this.itemsCount = data.length);
    this.dashboardService.getOrders().subscribe(data => {
      this.ordersCount = data.length;

      let totalProfits = 0;
      data.forEach(order => {
        totalProfits += order.profit || 0; 
      });
      this.totalProfits = totalProfits;
    });
  }

  fetchTotalOrderValue() {
    this.dashboardService.getTotalOrderPrice().subscribe(
      totalPrice => this.totalOrderValue = totalPrice,
      error => console.error('Failed to fetch total order price', error)
    );
  }
}
