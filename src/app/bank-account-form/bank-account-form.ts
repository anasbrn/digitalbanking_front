import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-bank-account-form',
  templateUrl: './bank-account-form.html',
  imports: [
    ReactiveFormsModule,
    NgForOf,
    NgIf
  ],
  styleUrls: ['./bank-account-form.css']
})
export class BankAccountForm implements OnInit {
  form!: FormGroup;
  customers: any = [];
  baseUrl = 'http://localhost:8085';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      customerId: ['', Validators.required],
      balance: [null, [Validators.required, Validators.min(0)]],
      currency: ['', Validators.required],
      type: ['sa', Validators.required],
      interestRate: [null],
      overdraft: [null]
    });

    this.loadCustomers();
    this.setupTypeListener();
  }

  loadCustomers(): void {
    this.http.get(`${this.baseUrl}/customers`).subscribe({
      next: (data) => this.customers = data,
      error: (err) => console.error('Failed to load customers:', err)
    });
  }

  setupTypeListener(): void {
    this.form.get('type')?.valueChanges.subscribe((type) => {
      const interestRate = this.form.get('interestRate');
      const overdraft = this.form.get('overdraft');

      interestRate?.clearValidators();
      overdraft?.clearValidators();

      if (type === 'sa') {
        interestRate?.setValidators([Validators.required, Validators.min(0)]);
        overdraft?.patchValue(null);
      } else if (type === 'ca') {
        overdraft?.setValidators([Validators.required, Validators.min(0)]);
        interestRate?.patchValue(null);
      }

      interestRate?.updateValueAndValidity();
      overdraft?.updateValueAndValidity();
    console.log('Account type changed:', type);
    });

  }

  onSubmit(): void {
    if (this.form.valid) {
      const formData = { ...this.form.value };

      // Remove unused field from payload
      if (formData.type === 'sa') {
        delete formData.overdraft;
      } else if (formData.type === 'ca') {
        delete formData.interestRate;
      }

      this.http.post(`${this.baseUrl}/bankAccounts/save`, formData).subscribe({
        next: () => this.router.navigate(['/customers']),
        error: (err) => console.error('Failed to create bank account:', err)
      });
    }
  }
}
