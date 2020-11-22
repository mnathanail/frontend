import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileEducationItemComponent } from './profile-education-item.component';

describe('ProfileEducationItemComponent', () => {
  let component: ProfileEducationItemComponent;
  let fixture: ComponentFixture<ProfileEducationItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileEducationItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileEducationItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
