import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchForCandidateComponent } from './search-for-candidate.component';

describe('SearchForCandidateComponent', () => {
  let component: SearchForCandidateComponent;
  let fixture: ComponentFixture<SearchForCandidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchForCandidateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchForCandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
