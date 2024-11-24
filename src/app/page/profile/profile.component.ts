import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userName: string = '';
  userEmail: string = '';
  userRole: string = '';
  userId: string = '';
  userPhone: string = '';
  userAddress: string = '';
  isEditing: boolean = false;  

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {
    
    this.userRole = this.authService.getUserRole() || 'Guest';
    this.userId = this.authService.getUserId() || 'N/A';
    
    
    if (this.userRole === 'ADMIN') {
      this.fetchAdminDetails();
    } else if (this.userRole === 'MANAGER') {
      this.fetchManagerDetails();
    }
  }

  fetchAdminDetails(): void {
    this.http.get<any>(`http://localhost:8080/admin/get-admin-by-Id/${this.userId}`).subscribe(
      (response) => {
        if (response) {
          this.userName = response[0]?.name || 'N/A';
          this.userEmail = response[0]?.email || 'N/A';
          this.userPhone = response[0]?.phoneNumber || 'N/A';
          this.userAddress = response[0]?.address || 'N/A';
        }
      },
      (error) => {
        console.error('Error fetching admin details:', error);
      }
    );
  }

  fetchManagerDetails(): void {
    this.http.get<any>(`http://localhost:8080/manager/get-manager-by-Id/${this.userId}`).subscribe(
      (response) => {
        if (response) {
          this.userName = response[0]?.name || 'N/A';
          this.userEmail = response[0]?.email || 'N/A';
          this.userPhone = response[0]?.phoneNumber || 'N/A';
          this.userAddress = response[0]?.address || 'N/A';
        }
      },
      (error) => {
        console.error('Error fetching manager details:', error);
      }
    );
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing; 
  }

  updateProfile(): void {
    const updatedProfile = {
      id: this.userId, 
      name: this.userName,
      email: this.userEmail,
      phoneNumber: this.userPhone,
      address: this.userAddress
    };
  
    if (this.userRole === 'ADMIN') {
      this.http.put<any>(`http://localhost:8080/admin/update`, updatedProfile).subscribe(
        () => {
          alert('Profile updated successfully!');
          this.toggleEdit(); 
        },
        (error) => {
          console.error('Error updating admin profile:', error);
        }
      );
    } else if (this.userRole === 'MANAGER') {
      this.http.put<any>(`http://localhost:8080/manager/update`, updatedProfile).subscribe(
        () => {
          alert('Profile updated successfully!');
          this.toggleEdit(); 
        },
        (error) => {
          console.error('Error updating manager profile:', error);
        }
      );
    }
  }
  
}
