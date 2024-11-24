import { Component } from '@angular/core';
import { RouterLinkWithHref, RouterModule, RouterOutlet } from '@angular/router';
import { ManagerComponent } from './page/manager/manager.component';
import { EmployeeComponent } from './page/employee/employee.component';
import { CustomerComponent } from './page/customer/customer.component';
import { SupplierComponent } from './page/supplier/supplier.component';
import { ItemComponent } from './page/item/item.component';
import { TeaCollectionComponent } from './page/tea-collection/tea-collection.component';
import { OrderComponent } from './page/order/order.component';
import { FeedbackComponent } from './page/feedback/feedback.component';
import { LoginComponent } from './page/login/login.component';
import { AdminnavComponent } from './common/adminnav/adminnav.component';
import { ManagernavComponent } from './common/managernav/managernav.component';
import { LogoutComponent } from './page/logout/logout.component';
import { ProfileComponent } from './page/profile/profile.component';
import { AdminDashboardComponent } from './page/admin-dashboard/admin-dashboard.component';
import { ManagerDashboardComponent } from './page/manager-dashboard/manager-dashboard.component';
import { ReportComponent } from './page/report/report.component';
import { HomeComponent } from './page/home/home.component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
           RouterModule,
           ManagerComponent,
           EmployeeComponent,
           CustomerComponent,
           SupplierComponent,
           ItemComponent,
           TeaCollectionComponent,
           OrderComponent,
           FeedbackComponent,
           LoginComponent,
           AdminnavComponent,
           ManagernavComponent,
           LogoutComponent,
           ProfileComponent,
           AdminDashboardComponent,
           ManagerDashboardComponent,
           ReportComponent,
           HomeComponent
           
          ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Tea-Store-Management-frontend';
}
