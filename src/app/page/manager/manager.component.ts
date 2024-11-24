import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-manager',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule,RouterModule,RouterOutlet],
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent {
  currentView: string = 'managerList';

  public managers: any[] = [];  
  public filteredManagers: any[] = [];  
  public manager: any = {  
    managerId: "",
    name: "",
    email: "",
    password:"",
    address: "",
    phoneNumber: "",
    gender: "", 
    dateOfBirth: "",
    dateOfJoin: ""
  };
  public searchTerm: string = '';  

  constructor(private http: HttpClient) {}

  addManager() {
    this.http.post("http://localhost:8080/manager/add-manager", this.manager).subscribe(() => {
      alert("Manager Added!");
      this.getManagers();
      this.resetForm();
      this.currentView = 'managerList';
    });
  }

  getManagers() {
    this.http.get<any[]>("http://localhost:8080/manager/get-all").subscribe(data => {
      this.managers = data;
      this.filteredManagers = this.sortManagers(data); 
    });
  }

  sortManagers(managers: any[]) {
    return managers.sort((a, b) => {
      return b.managerId - a.managerId;  
    });
  }

  getManagerById(managerId: number) {
    this.http.get<any>(`http://localhost:8080/manager/get-manager-by-Id/${managerId}`).subscribe(data => {
      this.manager = data[0];
    });
  }

  updateManager() {
    this.http.put("http://localhost:8080/manager/update", this.manager).subscribe(() => {
      alert("Manager Updated!");
      this.getManagers();
      this.resetForm();
      this.currentView = 'managerList';
    });
  }

  deleteManager(managerId: number) {
    this.http.delete(`http://localhost:8080/manager/delete-by-id/${managerId}`).subscribe(() => {
      alert("Manager Deleted!");
      this.getManagers();
    });
  }

  showPassword = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  filterManagers() {
    if (!this.searchTerm) {
      this.filteredManagers = this.managers;  
    } else {
      this.filteredManagers = this.managers.filter(manager => 
        manager.managerId.toString().includes(this.searchTerm) || 
        manager.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  resetForm() {
    this.manager = {
      managerId: "",
      name: "",
      email: "",
      password:"",
      address: "",
      phoneNumber: "",
      gender: "",  
      dateOfBirth: "",
      dateOfJoin: ""
    };
  }

  ngOnInit() {
    this.getManagers();
  }
}
