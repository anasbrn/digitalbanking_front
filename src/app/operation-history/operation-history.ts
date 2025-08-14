import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {NgClass, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-bank-accounts',
  imports: [
    NgIf,
    NgClass,
    NgForOf
  ],
  templateUrl: './operation-history.html',
  styleUrl: './operation-history.css'
})
export class OperationHistory implements OnInit {

  bankAccountId!: string;
  customerName!: string;
  balance!: number;
  operationDTOs: any[] = [];

  // Pagination
  currentPage: number = 0;
  pageSize: number = 2;
  totalPages: number = 0;

  baseUrl: string = 'http://localhost:8085'
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.bankAccountId = id;
        this.fetchBankAccountData(this.currentPage);
      }
    });
  }

  fetchBankAccountData(page: number): void {
    const url = `${this.baseUrl}/bankAccounts/${this.bankAccountId}/operations/history?page=${page}&size=${this.pageSize}`;

    this.http.get<any>(url).subscribe({
      next: (data) => {
        this.customerName = data.customerName;
        this.balance = data.balance;
        this.operationDTOs = data.operationDTOs;
        this.currentPage = data.currentPage;
        this.totalPages = data.totalPages;
      },
      error: (err) => {
        console.error('Failed to fetch bank account data:', err);
      }
    });
  }

  goToPage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.fetchBankAccountData(page);
    }
  }
}
