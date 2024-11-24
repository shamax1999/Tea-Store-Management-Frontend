import { CommonModule, CurrencyPipe } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ItemService } from '../item/item.service';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule, RouterOutlet, RouterModule],
  providers: [ItemService, CurrencyPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'

})
export class HomeComponent implements AfterViewInit {
  currentView: string = 'feedbackList';


  public feedbacks: any[] = [];
  public feedback: any = { feedbackId: "", description: "", name: "" };
  public searchTerm: string = '';

  constructor(private http: HttpClient, private itemService: ItemService) { }

  addFeedback() {
    if (this.feedback.name && this.feedback.description) {
      this.http.post("http://localhost:8080/feedback/add-feedback", this.feedback).subscribe(() => {
        alert("Feedback Added!");
        this.resetForm();
        this.currentView = 'feedbackList';
      });
    } else {
      alert("Please fill in all required fields.");
    }
  }


  resetForm() {
    this.feedback = { feedbackId: "", description: "", customerId: "" };
  }



  @ViewChild('home2')
  home2!: ElementRef;
  @ViewChild('about')
  about!: ElementRef;
  @ViewChild('menu')
  menu!: ElementRef;
  @ViewChild('services')
  services!: ElementRef;
  @ViewChild('contact')
  contact!: ElementRef;



  ngAfterViewInit(): void {
    if (this.home2 && this.about && this.menu && this.services && this.contact) {
      console.log(this.home2, this.about, this.menu, this.services, this.contact);
    }
  }


  scrollToSection(section: string): void {
    switch (section) {
      case 'home2':
        this.home2?.nativeElement.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'about':
        this.about?.nativeElement.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'menu':
        this.menu?.nativeElement.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'services':
        this.services?.nativeElement.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'contact':
        this.contact?.nativeElement.scrollIntoView({ behavior: 'smooth' });
        break;
    }
  }



  public items: any[] = [];
  public filteredItems: any[] = [];
  public item: any = {
    itemId: '',
    itemName: '',
    teaType: 'All',
    price: '',
    quantity: '',
    manufactureDate: '',
    expireDate: '',
    ImageData: ''

  };

  public selectedTeaType: string = 'All';




  getFullImageUrl(imageData: string): string {
    console.log('Base64 image data:', imageData);
    return `data:image/jpeg;base64,${imageData}`;
  }


  ngOnInit() {
    this.getItems();
    this.filterItemsByTeaType();
  }


  getItems() {
    this.http.get<any[]>('http://localhost:8080/item/get-all').subscribe(data => {
      this.items = data;
      this.filteredItems = data;
    });
  }

  onImageError(event: Event) {
    console.error('Image failed to load', event);
    alert('The image could not be loaded.');
  }


  getItemById(itemId: number) {
    this.http.get<any>(`http://localhost:8080/item/get-item-by-id/${itemId}`).subscribe({
      next: (data) => {
        if (data) {
          this.item = data;
          this.currentView = 'updateItem';
        } else {
          alert('Item not found');
        }
      },
      error: (error) => {
        console.error('Error fetching item by ID:', error);
        alert('Failed to fetch item for update');
      }
    });
  }


  filterItemsByTeaType() {
    if (this.selectedTeaType === 'All') {
      this.filteredItems = this.items;
    } else {
      this.filteredItems = this.items.filter(item => item.teaType === this.selectedTeaType);
    }
  }


}