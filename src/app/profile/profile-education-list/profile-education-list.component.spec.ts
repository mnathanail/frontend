import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileEducationListComponent } from './profile-education-list.component';

describe('ProfileEducationListComponent', () => {
  let component: ProfileEducationListComponent;
  let fixture: ComponentFixture<ProfileEducationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileEducationListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileEducationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
