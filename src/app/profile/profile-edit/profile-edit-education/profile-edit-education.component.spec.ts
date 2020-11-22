import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileEditEducationComponent } from './profile-edit-education.component';

describe('ProfileEditEducationComponent', () => {
  let component: ProfileEditEducationComponent;
  let fixture: ComponentFixture<ProfileEditEducationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileEditEducationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileEditEducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
