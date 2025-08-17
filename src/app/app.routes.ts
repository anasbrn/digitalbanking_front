import {Routes} from '@angular/router';
import {LoginComponent} from './login-component/login-component';
import {Customers} from './customers/customers';
import {CustomerForm} from './customer-form/customer-form.component';
import {OperationHistory} from './operation-history/operation-history';
import {CustomerBankAccountInfos} from './customer-bank-account-infos/customer-bank-account-infos';
import {BankAccountForm} from './bank-account-form/bank-account-form';
import {BankAccounts} from './bank-accounts/bank-accounts';
import {AddOperation} from './add-operation/add-operation';

export const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'customers', component: Customers},
  {path: 'customers/add', component: CustomerForm},
  {path: 'customers/edit/:id', component: CustomerForm},
  {path: 'bankAccounts/:id/operations/history', component: OperationHistory},
  {path: 'bankAccounts', component: BankAccounts},
  {path: 'bankAccounts/customer/:id', component: CustomerBankAccountInfos},
  {path: 'bankAccounts/add', component: BankAccountForm},
  {path: 'operations/add', component: AddOperation},
];
