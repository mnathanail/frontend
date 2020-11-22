import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileEditWorkExperienceComponent } from './profile-edit-work-experience.component';

describe('ProfileEditWorkExperienceComponent', () => {
  let component: ProfileEditWorkExperienceComponent;
  let fixture: ComponentFixture<ProfileEditWorkExperienceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileEditWorkExperienceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileEditWorkExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
