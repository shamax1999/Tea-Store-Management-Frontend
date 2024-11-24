import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-managernav',
  standalone: true,
  imports: [RouterModule,RouterOutlet],
  templateUrl: './managernav.component.html',
  styleUrl: './managernav.component.css'
})
export class ManagernavComponent implements OnInit{
  managerId: string | null;
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
    this.managerId = this.authService.getManagerId();
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