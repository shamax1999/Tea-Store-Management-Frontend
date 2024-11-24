import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-tea-collection',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './tea-collection.component.html',
  styleUrls: ['./tea-collection.component.css']
})
export class TeaCollectionComponent implements OnInit {
  currentView: string = 'collectionList';
  
  public teaCollections: any[] = [];
  public filteredTeaCollections: any[] = [];
  public teaCollection: any = {
    collectionId: "",
    supplierId: "",
    adminId: "",
    managerId: "",
    date: "",
    time: "",
    teaType: "",
    teaQuantity: ""
  };
  public suppliers: any[] = []; 
  public searchTerm: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getTeaCollections();
    this.getSuppliers(); 
  }

  getTeaCollections() {
    this.http.get<any[]>("http://localhost:8080/collection/get-all").subscribe(data => {
      this.teaCollections = data;
      this.filteredTeaCollections = this.sortTeaCollections(data);
    });
  }

  
  getSuppliers() {
    this.http.get<any[]>("http://localhost:8080/supplier/get-all").subscribe(data => {
      this.suppliers = data; 
    });
  }

 
  sortTeaCollections(teaCollections: any[]) {
    return teaCollections.sort((a, b) => b.collectionId - a.collectionId);
  }

  
  addTeaCollection() {
    this.http.post("http://localhost:8080/collection/add-collection", this.teaCollection).subscribe(() => {
      alert("Tea Collection Added!");
      this.getTeaCollections();
      this.resetForm();
    });
  }

  getTeaCollectionById(collectionId: number) {
    this.http.get<any>(`http://localhost:8080/collection/get-collection-by-Id/${collectionId}`).subscribe(data => {
      this.teaCollection = data[0];
    });
  }

  updateTeaCollection() {
    this.http.put("http://localhost:8080/collection/update", this.teaCollection).subscribe(() => {
      alert("Tea Collection Updated!");
      this.getTeaCollections();
      this.resetForm();
    });
  }

  deleteTeaCollection(collectionId: number) {
    this.http.delete(`http://localhost:8080/collection/delete-by-id/${collectionId}`).subscribe(() => {
      alert("Tea Collection Deleted!");
      this.getTeaCollections();
    });
  }

  

  resetForm() {
    this.teaCollection = {
      collectionId: "",
      supplierId: "",
      adminId: "",
      managerId: "",
      date: "",
      time: "",
      teaType: "",
      teaQuantity: ""
    };
  }

  filterTeaCollections() {
    if (!this.searchTerm) {
      this.filteredTeaCollections = this.teaCollections;
    } else {
      this.filteredTeaCollections = this.teaCollections.filter(item => 
        item.collectionId.toString().includes(this.searchTerm) || 
        item.teaType.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }
}
