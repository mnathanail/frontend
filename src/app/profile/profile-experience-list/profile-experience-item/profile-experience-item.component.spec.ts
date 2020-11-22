import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileExperienceItemComponent } from './profile-experience-item.component';

describe('ProfileExperienceItemComponent', () => {
  let component: ProfileExperienceItemComponent;
  let fixture: ComponentFixture<ProfileExperienceItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileExperienceItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileExperienceItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
