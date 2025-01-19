import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAmountFormComponent } from './student-amount-form.component';

describe('StudentAmountFormComponent', () => {
  let component: StudentAmountFormComponent;
  let fixture: ComponentFixture<StudentAmountFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentAmountFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentAmountFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
