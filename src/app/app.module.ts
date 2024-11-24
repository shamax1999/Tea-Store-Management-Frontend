import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ManagerComponent } from './page/manager/manager.component';
import { EmployeeComponent } from './page/employee/employee.component';
import { CustomerComponent } from './page/customer/customer.component';
import { SupplierComponent } from './page/supplier/supplier.component';
import { ItemComponent } from './page/item/item.component';
import { TeaCollectionComponent } from './page/tea-collection/tea-collection.component';
import { OrderComponent } from './page/order/order.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './page/login/login.component';
import { FeedbackComponent } from './page/feedback/feedback.component';
import { AdminnavComponent } from './common/adminnav/adminnav.component';
import { ManagernavComponent } from './common/managernav/managernav.component';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { ReportComponent } from './page/report/report.component';
import { HomeComponent } from './page/home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminnavComponent,
    ManagernavComponent,
    ManagerComponent,
    EmployeeComponent,
    CustomerComponent,
    SupplierComponent,
    ItemComponent,
    TeaCollectionComponent,
    OrderComponent,
    FeedbackComponent,
    ReportComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
