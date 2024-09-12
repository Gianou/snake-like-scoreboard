import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkedInQrComponent } from './linked-in-qr.component';

describe('LinkedInQrComponent', () => {
  let component: LinkedInQrComponent;
  let fixture: ComponentFixture<LinkedInQrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LinkedInQrComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LinkedInQrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
