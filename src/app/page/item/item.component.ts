import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ItemService } from './item.service';
import { switchMap } from 'rxjs/operators';
import { CurrencyPipe } from '@angular/common';





@Component({
  selector: 'app-item',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  providers: [ItemService, CurrencyPipe],
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent {
  currentView: string = 'itemList';
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
  selectedImage: File | null = null;

  public searchTerm: string = '';
  public selectedTeaType: string = 'All';

  constructor(private itemService: ItemService, private http: HttpClient) { }



  getFullImageUrl(imageData: string): string {
    console.log('Base64 image data:', imageData);
    return `data:image/jpeg;base64,${imageData}`;
  }


  onImageSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedImage = fileInput.files[0];
    }
  }

  onSubmit() {
    if (this.selectedImage) {
      this.itemService.addItem(this.item, this.selectedImage).subscribe(response => {
        console.log('Item added successfully', response);
        alert('Item Added!');
        this.getItems();
        this.resetForm();
        this.currentView = 'itemList';
      });
    } else {
      alert('Please select an image.');
    }
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


  addItem(): void {
    const formData = new FormData();


    formData.append('item', new Blob([JSON.stringify(this.item)], { type: 'application/json' }));


    if (this.selectedImage) {
      formData.append('image', this.selectedImage);
    }


    this.http.post('http://localhost:8080/item/add-item', formData).subscribe({
      next: () => {
        alert('Item added successfully!');
        this.getItems();
        this.resetForm();
        this.currentView = 'itemList';
      },
      error: (error) => {
        console.error('Error adding item:', error);
        alert('Failed to add item. Please try again.');
      }
    });
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


  updateItem(): void {
    const formData = new FormData();

    formData.append('item', new Blob([JSON.stringify(this.item)], { type: 'application/json' }));

    if (this.selectedImage) {
      formData.append('image', this.selectedImage);
    }

    this.http.put(`http://localhost:8080/item/update-item/${this.item.itemId}`, formData).subscribe({
      next: () => {
        alert('Item updated successfully!');
        this.getItems();
        this.resetForm();
        this.currentView = 'itemList';
      },
      error: (error) => {
        console.error('Error updating item:', error);
        alert('Failed to update item. Please try again.');
      }
    });
  }


  deleteItem(itemId: number) {
    this.http.delete(`http://localhost:8080/item/delete-by-id/${itemId}`).subscribe(() => {
      alert('Item Deleted!');
      this.getItems();
    });
  }

  resetForm() {
    this.item = {
      itemId: '',
      itemName: '',
      teaType: 'All',
      price: '',
      quantity: '',
      manufactureDate: '',
      expireDate: '',
      ImageData: ''
    };
    this.selectedImage = null;
  }

  filterItemsByTeaType() {
    if (this.selectedTeaType === 'All') {
      this.filteredItems = this.items;
    } else {
      this.filteredItems = this.items.filter(item => item.teaType === this.selectedTeaType);
    }
  }
}