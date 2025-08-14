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
  templateUrl: './bank-account-infos.html',
  styleUrl: './bank-account-infos.css'
})
export class BankAccountInfos implements OnInit {
  bankAccounts?: any ;
  customerId?: String | null;
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
    this.http.get(`${this.baseUrl}/customer/${this.customerId}`).subscribe({
      next: (data) => (this.bankAccounts = data),
      error: (err) => {
        console.error('Error fetching bank account:', err);
        this.errorMessage = 'Failed to load bank account data.';
      }
    });
  }
}
