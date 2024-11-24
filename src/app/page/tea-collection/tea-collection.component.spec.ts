import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeaCollectionComponent } from './tea-collection.component';

describe('TeaCollectionComponent', () => {
  let component: TeaCollectionComponent;
  let fixture: ComponentFixture<TeaCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeaCollectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeaCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
