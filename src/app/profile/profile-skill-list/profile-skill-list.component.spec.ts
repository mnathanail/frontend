import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSkillListComponent } from './profile-skill-list.component';

describe('ProfileSkillListComponent', () => {
  let component: ProfileSkillListComponent;
  let fixture: ComponentFixture<ProfileSkillListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileSkillListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileSkillListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
