import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationHistory } from './operation-history';

describe('OperationHistory', () => {
  let component: OperationHistory;
  let fixture: ComponentFixture<OperationHistory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OperationHistory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperationHistory);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
