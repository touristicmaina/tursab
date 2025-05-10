import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityanalysisComponent } from './activityanalysis.component';

describe('ActivityanalysisComponent', () => {
  let component: ActivityanalysisComponent;
  let fixture: ComponentFixture<ActivityanalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivityanalysisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityanalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
