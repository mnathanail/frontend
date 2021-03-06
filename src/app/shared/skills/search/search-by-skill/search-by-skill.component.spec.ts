import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBySkillComponent } from './search-by-skill.component';

describe('SearchBySkillComponent', () => {
  let component: SearchBySkillComponent;
  let fixture: ComponentFixture<SearchBySkillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchBySkillComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBySkillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
