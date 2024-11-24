import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.css'
})
export class FeedbackComponent {
  currentView: string = 'feedbackList';

  public feedbacks: any[] = [];
  public filteredFeedbacks: any[] = [];
  public feedback: any = { feedbackId: "", description: "", customerId: "",name:"" };
  public searchTerm: string = '';

  constructor(private http: HttpClient) {}

  addFeedback() {
    this.http.post("http://localhost:8080/feedback/add-feedback", this.feedback).subscribe(() => {
      alert("Feedback Added!");
      this.getFeedbacks();
      this.resetForm();
      this.currentView = 'feedbackList';

    });
  }

  getFeedbacks() {
    this.http.get<any[]>("http://localhost:8080/feedback/get-all").subscribe(data => {
      this.feedbacks = data;
      this.filteredFeedbacks = data;
    });
  }

  getFeedbackById(feedbackId: number) {
    this.http.get<any>(`http://localhost:8080/feedback/get-feedback-by-Id/${feedbackId}`).subscribe(data => {
      this.feedback = data[0];
    });
  }

  updateFeedback() {
    this.http.put("http://localhost:8080/feedback/update", this.feedback).subscribe(() => {
      alert("Feedback Updated!");
      this.getFeedbacks();
      this.resetForm();
      this.currentView = 'feedbackList';
    });
  }

  deleteFeedback(feedbackId: number) {
    this.http.delete(`http://localhost:8080/feedback/delete-by-id/${feedbackId}`).subscribe(() => {
      alert("Feedback Deleted!");
      this.getFeedbacks();
    });
  }

  filterFeedbacks() {
    if (!this.searchTerm) {
      this.filteredFeedbacks = this.feedbacks;
    } else {
      this.filteredFeedbacks = this.feedbacks.filter(feedback =>
        feedback.feedbackId.toString().includes(this.searchTerm) ||
        feedback.description.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  resetForm() {
    this.feedback = { feedbackId: "", description: "", customerId: "", name:"" };
  }

  ngOnInit() {
    this.getFeedbacks();
  }

}
