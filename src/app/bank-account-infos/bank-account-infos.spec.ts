import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankAccountInfos } from './bank-account-infos';

describe('BankAccountInfos', () => {
  let component: BankAccountInfos;
  let fixture: ComponentFixture<BankAccountInfos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BankAccountInfos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankAccountInfos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
