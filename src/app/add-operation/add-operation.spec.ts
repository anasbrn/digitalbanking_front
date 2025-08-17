import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOperation } from './add-operation';

describe('AddOperation', () => {
  let component: AddOperation;
  let fixture: ComponentFixture<AddOperation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddOperation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOperation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
