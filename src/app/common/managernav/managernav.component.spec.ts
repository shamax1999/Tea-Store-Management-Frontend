import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagernavComponent } from './managernav.component';

describe('ManagernavComponent', () => {
  let component: ManagernavComponent;
  let fixture: ComponentFixture<ManagernavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagernavComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagernavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
