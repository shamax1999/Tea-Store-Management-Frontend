import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})

export class OrderComponent {
  currentView: string = 'orderList';
  public orders: any[] = [];
  public filteredOrders: any[] = [];
  public order: any = {
    orderId: "",
    customerId: "",
    itemId: "",
    itemName: "",
    paymentMethod: "",
    orderDate: "", 
    totalPrice: 0,
    quantity: 1,
    status: "",
    price: 0, 
  };
  public searchTerm: string = '';
  public customers: any[] = [];
  public items: any[] = [];
  public selectedItem: any = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getOrders();
    this.getCustomers();
    this.getItems();
  }

  getCustomers() {
    this.http.get<any[]>("http://localhost:8080/customer/get-all").subscribe(data => {
      this.customers = data;
    });
  }

  getItems() {
    this.http.get<any[]>("http://localhost:8080/item/get-all").subscribe(data => {
      this.items = data;
    });
  }

  onItemSelect(item: any) {
    this.order.itemId = item.itemId;
    this.order.itemName = item.itemName;
    this.order.price = item.price; 
    this.calculateTotalPrice();
  }

  calculateTotalPrice() {
    this.order.totalPrice = this.order.price * this.order.quantity;
  }

  addOrder() {
    this.http.post("http://localhost:8080/order/add-order", this.order).subscribe(() => {
      alert("Order Added!");
      this.getOrders();
      this.resetForm();
    });
  }

  getOrders() {
    this.http.get<any[]>("http://localhost:8080/order/get-all").subscribe(data => {
      this.orders = data;
      this.filteredOrders = data;
    });
  }

  getOrderById(orderId: number) {
    this.http.get<any>(`http://localhost:8080/order/get-order-by-id/${orderId}`).subscribe(data => {
      this.order = data[0];
      this.currentView = 'updateOrder';
    });
  }

  updateOrder() {
    this.http.put("http://localhost:8080/order/update", this.order).subscribe(() => {
      alert("Order Updated!");
      this.getOrders();
      this.resetForm();
      this.currentView = 'orderList';
    });
  }

  deleteOrder(orderId: number) {
    this.http.delete(`http://localhost:8080/order/delete-by-id/${orderId}`).subscribe(() => {
      alert("Order Deleted!");
      this.getOrders();
    });
  }

  filterOrders() {
    if (!this.searchTerm) {
      this.filteredOrders = this.orders;
    } else {
      this.filteredOrders = this.orders.filter(order => 
        order.orderId.toString().includes(this.searchTerm) || 
        order.itemName.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  resetForm() {
    this.order = {
      orderId: "",
      customerId: "",
      itemId: "",
      itemName: "",
      paymentMethod: "",
      orderDate: "", 
      totalPrice: 0,
      quantity: 1,
      status: "",
      price: 0
    };
    this.currentView = 'orderList';
    this.selectedItem = null;
  }
}
