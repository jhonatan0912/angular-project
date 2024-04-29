import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService, ErrorService } from '@core/services';
import { NavbarComponent } from '@shared/components';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NavbarComponent, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  onToggle: boolean = false;
  authForm!: FormGroup;
  errorMessage: string | null = null;
  alerForm: boolean = false;

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder, private errorService: ErrorService) { }

  ngOnInit(): void {
    this.authForm = this.formBuilder.group({
      useremail: ['', [Validators.required, Validators.email]],
      userpassword: ['', Validators.required],
    });

    this.errorService.error$.subscribe((errorMessage) => {
      this.errorMessage = errorMessage;
      setTimeout(() => {
        this.errorMessage = null;
      }, 4000);
    });
  }

  get f() {
    return this.authForm.controls;
  }

  validateAuth() {
    if (this.authForm.invalid) {
      this.alerForm = true;

      setTimeout(() => {
        this.alerForm = false;
      }, 4000);
      return;
    }

    const authData = {
      ['useremail']: this.f['useremail'].value,
      ['userpassword']: this.f['userpassword'].value,
    };

    this.authService.validateAuth(authData).subscribe({
      next: (response: any) => {
        const token = response.token;
        const role = response.roles;

        this.authService.saveTokenStorage(token);
        this.authService.redirectRol(role);
      },
      error: (error: any) => {
        throw new Error(error);
      },
    });
  }

  toggle() {
    this.onToggle = !this.onToggle;
  }
}
