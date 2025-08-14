import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Customers} from '../customers/customers';
import {ActivatedRoute, Router} from '@angular/router';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.css',
  imports: [
    ReactiveFormsModule,
    NgClass
  ]
})
export class CustomerForm implements OnInit {
  form: FormGroup;
  baseUrl: string = 'http://localhost:8085/';
  customerId: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this
      .form = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
    })
  }

  ngOnInit() {
    this.customerId = this.route.snapshot.paramMap.get('id');
    if (this.customerId) {
      this.httpClient.get(this.baseUrl + 'customers/' + this.customerId).subscribe({
        next: (data: any) => {
          this.form.patchValue({
            name: data.name,
            email: data.email,
          });
        },
        error: (err) => {
          console.error('Error fetching customer', err);
        }
      });
    }
  }

  onSubmit() {
    const formData = this.form.value;
    if (this.form.valid) {
      if (this.customerId) {
        this.httpClient.put(this.baseUrl + 'customers/' + this.customerId, formData).subscribe({
          next: () => this.router.navigateByUrl('/customers'),
          error: (err) => console.error('Update failed', err),
        });
      } else {
        this.httpClient.post(this.baseUrl + 'customers', formData).subscribe({
          next: () => this.router.navigateByUrl('/customers'),
          error: (err) => console.error('Creation failed', err),
        });
      }
    }
  }
}
