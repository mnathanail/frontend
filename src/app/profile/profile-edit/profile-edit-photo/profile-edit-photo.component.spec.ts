import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileEditPhotoComponent } from './profile-edit-photo.component';

describe('ProfileEditPhotoComponent', () => {
  let component: ProfileEditPhotoComponent;
  let fixture: ComponentFixture<ProfileEditPhotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileEditPhotoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileEditPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
