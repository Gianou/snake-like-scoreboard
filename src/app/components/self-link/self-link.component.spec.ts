import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfLinkComponent } from './self-link.component';

describe('SelfLinkComponent', () => {
  let component: SelfLinkComponent;
  let fixture: ComponentFixture<SelfLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelfLinkComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelfLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
