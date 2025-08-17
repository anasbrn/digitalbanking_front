import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {CurrencyPipe, DatePipe, NgForOf} from '@angular/common';

@Component({
  selector: 'app-bank-account-infos',
  imports: [
    NgForOf,
    DatePipe,
    CurrencyPipe,
    RouterLink
  ],
  templateUrl: './customer-bank-account-infos.html',
  styleUrl: './customer-bank-account-infos.css'
})
export class CustomerBankAccountInfos implements OnInit {
  bankAccounts?: any ;
  customerId?: String | null;
  customer?: any;
  errorMessage?: string;

  private baseUrl = 'http://localhost:8085/bankAccounts'; // replace with your API

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.customerId = id;
        this.fetchBankAccounts();
      }
    });
  }

  fetchBankAccounts(): void {
    this.http.get<any[]>(`${this.baseUrl}/customer/${this.customerId}`).subscribe({
      next: (data) => {
        this.bankAccounts = data;
        this.customer = data[0].customer;
      },
      error: (err) => {
        console.error('Error fetching bank account:', err);
        this.errorMessage = 'Failed to load bank account data.';
      }
    });
  }
}
