import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileExperienceListComponent } from './profile-experience-list.component';

describe('ProfileExperienceListComponent', () => {
  let component: ProfileExperienceListComponent;
  let fixture: ComponentFixture<ProfileExperienceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileExperienceListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileExperienceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
