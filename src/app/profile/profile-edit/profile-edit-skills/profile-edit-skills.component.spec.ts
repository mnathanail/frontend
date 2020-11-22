import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileEditSkillsComponent } from './profile-edit-skills.component';

describe('ProfileEditSkillsComponent', () => {
  let component: ProfileEditSkillsComponent;
  let fixture: ComponentFixture<ProfileEditSkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileEditSkillsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileEditSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
