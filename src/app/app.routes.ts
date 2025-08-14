import {Routes} from '@angular/router';
import {LoginComponent} from './login-component/login-component';
import {Customers} from './customers/customers';
import {CustomerForm} from './customer-form/customer-form.component';

export const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'customers', component: Customers},
  {path: 'customers/add', component: CustomerForm},
  {path: 'customers/edit/:id', component: CustomerForm},
];
