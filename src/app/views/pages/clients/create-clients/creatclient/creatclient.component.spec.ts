import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatclientComponent } from './creatclient.component';

describe('CreatclientComponent', () => {
  let component: CreatclientComponent;
  let fixture: ComponentFixture<CreatclientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatclientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatclientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
