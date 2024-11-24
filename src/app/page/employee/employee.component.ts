import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent {
  currentView: string = 'employeeList';

  public employees: any[] = [];  
  public filteredEmployees: any[] = [];  
  public employee: any = {  
    employeeId: "",
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

  addEmployee() {
    this.http.post("http://localhost:8080/employee/add-employee", this.employee).subscribe(() => {
      alert("Employee Added!");
      this.getEmployees();
      this.resetForm();
      this.currentView = 'employeeList';
    });
  }

  getEmployees() {
    this.http.get<any[]>("http://localhost:8080/employee/get-all").subscribe(data => {
      this.employees = data;
      this.filteredEmployees = this.sortEmployees(data);  
    });
  }

  sortEmployees(employees: any[]) {
    return employees.sort((a, b) => {
      return b.employeeId - a.employeeId;  
    });
  }

  getEmployeeById(employeeId: number) {
    this.http.get<any>(`http://localhost:8080/employee/get-employee-by-Id/${employeeId}`).subscribe(data => {
      this.employee = data[0];
    });
  }

  updateEmployee() {
    this.http.put("http://localhost:8080/employee/update", this.employee).subscribe(() => {
      alert("Employee Updated!");
      this.getEmployees();
      this.resetForm();
      this.currentView = 'employeeList';
    });
  }

  deleteEmployee(employeeId: number) {
    this.http.delete(`http://localhost:8080/employee/delete-by-id/${employeeId}`).subscribe(() => {
      alert("Employee Deleted!");
      this.getEmployees();
    });
  }

  filterEmployees() {
    if (!this.searchTerm) {
      this.filteredEmployees = this.employees;  
    } else {
      this.filteredEmployees = this.employees.filter(employee => 
        employee.employeeId.toString().includes(this.searchTerm) || 
        employee.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  resetForm() {
    this.employee = {
      employeeId: "",
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
    this.getEmployees();
  }
}
