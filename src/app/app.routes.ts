import { Routes } from '@angular/router';
import { LoginComponent } from './page/login/login.component';
import { AdminnavComponent } from './common/adminnav/adminnav.component';
import { ManagerComponent } from './page/manager/manager.component';
import { EmployeeComponent } from './page/employee/employee.component';
import { CustomerComponent } from './page/customer/customer.component';
import { SupplierComponent } from './page/supplier/supplier.component';
import { ItemComponent } from './page/item/item.component';
import { TeaCollectionComponent } from './page/tea-collection/tea-collection.component';
import { OrderComponent } from './page/order/order.component';
import { FeedbackComponent } from './page/feedback/feedback.component';
import { ManagernavComponent } from './common/managernav/managernav.component';
import { AuthGuard } from './auth.guard';
import { ProfileComponent } from './page/profile/profile.component';
import { AdminDashboardComponent } from './page/admin-dashboard/admin-dashboard.component';
import { ManagerDashboardComponent } from './page/manager-dashboard/manager-dashboard.component';
import { ReportComponent } from './page/report/report.component';
import { HomeComponent } from './page/home/home.component';


export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent},
  
  {
    path: 'admin', component: AdminnavComponent,canActivate: [AuthGuard], data: { role: 'ADMIN' }, children: [
      { path: 'admin', component: AdminDashboardComponent},
      { path: 'reports', component: ReportComponent },
      { path: 'manager', component: ManagerComponent },
      { path: 'employee', component: EmployeeComponent },
      { path: 'customer', component: CustomerComponent },
      { path: 'supplier', component: SupplierComponent },
      { path: 'item', component: ItemComponent },
      { path: 'tea-collection', component: TeaCollectionComponent },
      { path: 'order', component: OrderComponent },
      { path: 'feedback', component: FeedbackComponent },
      { path: 'profile', component: ProfileComponent},
    ]
  },

  { path: 'logout', component: LoginComponent },  
  
  {
    path: 'manager', component: ManagernavComponent,canActivate: [AuthGuard],data: { role: 'MANAGER' }, children: [
      { path: 'manager', component: ManagerDashboardComponent},
      { path: 'customer', component: CustomerComponent },
      { path: 'supplier', component: SupplierComponent },
      { path: 'item', component: ItemComponent },
      { path: 'tea-collection', component: TeaCollectionComponent },
      { path: 'order', component: OrderComponent },
      { path: 'feedback', component: FeedbackComponent },
      { path: 'reports', component: ReportComponent },
      { path: 'profile', component: ProfileComponent},
    ]
  },

];
