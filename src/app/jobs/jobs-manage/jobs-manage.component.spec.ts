import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsManageComponent } from './jobs-manage.component';

describe('JobsManageComponent', () => {
  let component: JobsManageComponent;
  let fixture: ComponentFixture<JobsManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobsManageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobsManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
