import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestrictionFormComponent } from './restriction-form.component';

describe('RestrictionFormComponent', () => {
  let component: RestrictionFormComponent;
  let fixture: ComponentFixture<RestrictionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestrictionFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestrictionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
