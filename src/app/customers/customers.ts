import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.html',
  styleUrl: './customers.css',
  imports: [
    RouterLink
  ]
})
export class Customers implements OnInit {
  customersData: any;
  baseUrl: string = 'http://localhost:8085/';

  constructor(public httpClient: HttpClient) {
  }

  ngOnInit() {
    this.fetchCustomers();
  }

  fetchCustomers() {
    this.httpClient.get(this.baseUrl + "customers").subscribe({
      next: data => {
        this.customersData = data;
      },
      error: error => {
        console.log(error);
      }
    })
  }

  deleteCustomer(id: string) {
    this.httpClient.delete(this.baseUrl + "customers/" + id).subscribe({
      next: data => {
        this.fetchCustomers();
        console.log("Customer deleted successfully.");
      },
      error: error => {
        console.log(error);
      }
    })
  }
}
