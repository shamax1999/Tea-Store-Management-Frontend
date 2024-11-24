import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule,RouterOutlet,RouterModule],
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent {
  currentView: string = 'customerList';

  public customers: any[] = [];  
  public filteredCustomers: any[] = [];  
  public customer: any = {  
    name: "",
    email: "",
    address: "",
    phoneNumber: "",
    gender: "",
    dateOfBirth: "",
    dateOfJoin: ""
  };
  public searchTerm: string = '';  

  constructor(private http: HttpClient) {}

  addCustomer() {
    this.http.post("http://localhost:8080/customer/add-customer", this.customer).subscribe(() => {
      alert("Customer Added!");
      this.getCustomers();
      this.resetForm();
      this.currentView = 'customerList';
    });
  }

  getCustomers() {
    this.http.get<any[]>("http://localhost:8080/customer/get-all").subscribe(data => {
      this.customers = data;
      this.filteredCustomers = this.sortCustomers(data);  
    });
  }

  sortCustomers(customers: any[]) {
    return customers.sort((a, b) => b.customerId - a.customerId);  
  }

  getCustomerById(customerId: number) {
    this.http.get<any>(`http://localhost:8080/customer/get-customer-by-Id/${customerId}`).subscribe(data => {
      this.customer = data[0];
    });
  }

  updateCustomer() {
    this.http.put("http://localhost:8080/customer/update", this.customer).subscribe(() => {
      alert("Customer Updated!");
      this.getCustomers();
      this.resetForm();
      this.currentView = 'customerList';
    });
  }

  deleteCustomer(customerId: number) {
    this.http.delete(`http://localhost:8080/customer/delete-by-id/${customerId}`).subscribe(() => {
      alert("Customer Deleted!");
      this.getCustomers();
    });
  }

  filterCustomers() {
    if (!this.searchTerm) {
      this.filteredCustomers = this.customers;  
    } else {
      this.filteredCustomers = this.customers.filter(customer => 
        customer.customerId.toString().includes(this.searchTerm) || 
        customer.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  resetForm() {
    this.customer = {
      customerId: "",
      name: "",
      email: "",
      address: "",
      phoneNumber: "",
      gender: "",  
      dateOfBirth: "",
      dateOfJoin: ""
    };
  }

  ngOnInit() {
    this.getCustomers();
  }
}
