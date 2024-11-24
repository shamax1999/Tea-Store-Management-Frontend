import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLinkWithHref, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule,RouterModule,RouterOutlet],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  role: string = ''; 

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {}

  onSubmit() {
    const params = new HttpParams()
      .set('email', this.email)
      .set('password', this.password)
      .set('role', this.role);
  
    this.http.post<any>('http://localhost:8080/login', null, { params }).subscribe(
      (response) => {
        console.log('Backend response:', response); 
        if (response?.role) {
          this.authService.login(response.role, response.userId);  
          const route = response.role === 'ADMIN' ? '/admin/admin' : '/manager/manager';
          this.router.navigate([route]);

          

        } else {
          alert('Invalid credentials. Please try again.');
        }
      },
      (error) => {
        console.error('Login failed:', error);
        alert('Invalid email, password, or role. Please try again.');
      }
    );
  }
  
}
