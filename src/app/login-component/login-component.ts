import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {AuthService} from '../services/auth-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-component',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: this.formBuilder.control(""),
      password: this.formBuilder.control(""),
    })
  }

  handleLogin() {
    let username = this.form.value.username;
    let password = this.form.value.password;
    this.authService.login(username, password).subscribe({
      next: (result) => {
        this.authService.loadProfile(result);
        this.router.navigateByUrl('/');
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
