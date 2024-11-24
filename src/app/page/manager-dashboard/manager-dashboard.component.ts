import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ManagerdashboardService } from './managerdashboard.service';

@Component({
  selector: 'app-manager-dashboard',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  providers: [ManagerdashboardService],
  templateUrl: './manager-dashboard.component.html',
  styleUrl: './manager-dashboard.component.css'
})
export class ManagerDashboardComponent implements OnInit{
  
  employeesCount: number = 0;
  suppliersCount: number = 0;
  itemsCount: number = 0;
  ordersCount: number = 0;
  totalOrderValue: number = 0; 
  totalProfits: number = 0;

  constructor(private dashboardService: ManagerdashboardService) {}

  ngOnInit(): void {
    this.fetchCounts();
    this.fetchTotalOrderValue(); 
  }

  fetchCounts() {
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
