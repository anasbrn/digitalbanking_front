import {Component, NgIterable, OnInit} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-add-operation',
  imports: [
    NgForOf,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './add-operation.html',
  styleUrl: './add-operation.css'
})
export class AddOperation implements OnInit {
  form!: FormGroup;
  bankAccounts?: any[] | null;
  private baseUrl: string = "http://localhost:8085";

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      bankAccountId: [null, Validators.required],
      type: ['credit', Validators.required],
      recipientBankAccountId: [null],
      amount: [null, [Validators.required, Validators.min(0)]],
    })

    this.form.get('type')?.valueChanges.subscribe(type => {
      const recipientBankAccountId = this.form.get('recipientBankAccountId');

      if (type === 'transfer') {
        recipientBankAccountId?.setValidators(Validators.required);
      } else {
        recipientBankAccountId?.clearValidators();
        recipientBankAccountId?.setValue(null);
      }
      recipientBankAccountId?.updateValueAndValidity();
    })
    this.loadBankAccounts();
  }

  loadBankAccounts(): void {
    this.http.get<any[]>(`${this.baseUrl}/bankAccounts`).subscribe({
      next: (data) => this.bankAccounts = data,
      error: (err) => console.error('Failed to load bank accounts:', err)
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    const {type, recipientBankAccountId, ...formData} = this.form.value;

    if (type === 'transfer') {
      formData['recipientBankAccountId'] = recipientBankAccountId;
    }

    this.http.post<any[]>(`${this.baseUrl}/operations/${type}`, formData).subscribe({
      next: () => this.router.navigate(['/bankAccounts']),
      error: (err) => console.error('Failed to create operation:', err)
    })
  }
}
