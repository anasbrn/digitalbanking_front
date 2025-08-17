import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router, RouterLink} from '@angular/router';
import {CurrencyPipe, DatePipe, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-bank-accounts',
  imports: [
    CurrencyPipe,
    DatePipe,
    NgForOf,
    RouterLink,
    NgIf
  ],
  templateUrl: './bank-accounts.html',
  styleUrl: './bank-accounts.css'
})
export class BankAccounts implements OnInit {
  protected bankAccounts: any;
  private baseUrl: string = 'http://localhost:8085';
    constructor(
      private http: HttpClient,
    ) {
    }

    ngOnInit(): void {
        this.fetchBankAccounts();
    }

  private fetchBankAccounts() {
    this.http.get(`${this.baseUrl}/bankAccounts`).subscribe({
      next: data => {
        this.bankAccounts = data;
      },
      error: err => {
        console.error(err);
      }
    })
  }
}
