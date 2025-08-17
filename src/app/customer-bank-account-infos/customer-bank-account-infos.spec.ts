import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerBankAccountInfos } from './customer-bank-account-infos';

describe('CustomerBankAccountInfos', () => {
  let component: CustomerBankAccountInfos;
  let fixture: ComponentFixture<CustomerBankAccountInfos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerBankAccountInfos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerBankAccountInfos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
