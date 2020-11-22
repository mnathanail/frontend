import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileEditSummaryComponent } from './profile-edit-summary.component';

describe('ProfileEditSummaryComponent', () => {
  let component: ProfileEditSummaryComponent;
  let fixture: ComponentFixture<ProfileEditSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileEditSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileEditSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
