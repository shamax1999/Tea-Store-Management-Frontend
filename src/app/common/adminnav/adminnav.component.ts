import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-adminnav',
  standalone: true,
  imports: [RouterModule, RouterOutlet],
  templateUrl: './adminnav.component.html',
  styleUrls: ['./adminnav.component.css']
})
export class AdminnavComponent implements OnInit  {
  adminId: string | null;
  currentDateTime: string = '';

  ngOnInit() {
    this.updateDateTime();
    setInterval(() => {
      this.updateDateTime();
    }, 1000); 
  }

  updateDateTime() {
    const current = new Date();
    this.currentDateTime = current.toLocaleString(); 
  }

  constructor(private authService: AuthService, private router: Router) {
    this.adminId = this.authService.getAdminId(); 
  }

  toggleSidebar() {
    const sidebar = document.querySelector('.nav');
    sidebar?.classList.toggle('active');
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
