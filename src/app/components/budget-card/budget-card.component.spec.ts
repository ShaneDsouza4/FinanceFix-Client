import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetCardComponent } from './budget-card.component';

describe('BudgetCardComponent', () => {
  let component: BudgetCardComponent;
  let fixture: ComponentFixture<BudgetCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BudgetCardComponent]
    });
    fixture = TestBed.createComponent(BudgetCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
