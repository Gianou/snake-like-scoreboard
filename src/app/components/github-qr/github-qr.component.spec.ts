import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GithubQrComponent } from './github-qr.component';

describe('GithubQrComponent', () => {
  let component: GithubQrComponent;
  let fixture: ComponentFixture<GithubQrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GithubQrComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GithubQrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
