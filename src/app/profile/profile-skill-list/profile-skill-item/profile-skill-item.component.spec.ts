import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSkillItemComponent } from './profile-skill-item.component';

describe('ProfileSkillItemComponent', () => {
  let component: ProfileSkillItemComponent;
  let fixture: ComponentFixture<ProfileSkillItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileSkillItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileSkillItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
