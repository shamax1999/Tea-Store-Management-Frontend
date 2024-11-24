import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-supplier',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent {
  currentView: string = 'supplierList';

  public suppliers: any[] = [];  
  public filteredSuppliers: any[] = [];  
  public supplier: any = {  
    supplierId: "",
    name: "",
    email: "",
    address: "",
    phoneNumber: "",
    contactPerson: "",
  };
  public searchTerm: string = '';  

  constructor(private http: HttpClient) {}

  addSupplier() {
    this.http.post("http://localhost:8080/supplier/add-supplier", this.supplier).subscribe(() => {
      alert("Supplier Added!");
      this.getSuppliers();
      this.resetForm();
      this.currentView = 'supplierList';
    });
  }

  getSuppliers() {
    this.http.get<any[]>("http://localhost:8080/supplier/get-all").subscribe(data => {
      this.suppliers = data;
      this.filteredSuppliers = this.sortSuppliers(data);  
    });
  }

  sortSuppliers(suppliers: any[]) {
    return suppliers.sort((a, b) => {
      return b.supplierId - a.supplierId;  
    });
  }

  getSupplierById(supplierId: number) {
    this.http.get<any>(`http://localhost:8080/supplier/get-supplier-by-Id/${supplierId}`).subscribe(data => {
      this.supplier = data[0];
    });
  }

  updateSupplier() {
    this.http.put("http://localhost:8080/supplier/update", this.supplier).subscribe(() => {
      alert("Supplier Updated!");
      this.getSuppliers();
      this.resetForm();
      this.currentView = 'supplierList';
    });
  }

  deleteSupplier(supplierId: number) {
    this.http.delete(`http://localhost:8080/supplier/delete-by-id/${supplierId}`).subscribe(() => {
      alert("Supplier Deleted!");
      this.getSuppliers();
    });
  }

  filterSuppliers() {
    if (!this.searchTerm) {
      this.filteredSuppliers = this.suppliers;  
    } else {
      this.filteredSuppliers = this.suppliers.filter(supplier => 
        supplier.supplierId.toString().includes(this.searchTerm) || 
        supplier.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  resetForm() {
    this.supplier = {
      supplierId: "",
      name: "",
      email: "",
      address: "",
      phoneNumber: "",
      contactPerson: "",
    };
  }

  ngOnInit() {
    this.getSuppliers();
  }
}
