import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserService } from '@core/services';
import { NavbarComponent } from '@shared/components';

@Component({
  selector: 'app-verify-email',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, NavbarComponent],
  templateUrl: './verify-email.component.html',
})
export class VerifyEmailComponent implements OnInit {
  loading: boolean = false;
  verifyAccountForm!: FormGroup;
  alertForm: boolean = false;

  constructor(private readonly userservice: UserService, private readonly formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.verifyAccountForm = this.formBuilder.group({
      useremail: ['', [Validators.required, Validators.email, Validators.minLength(5), Validators.maxLength(50)]],
    });
  }

  get f() {
    return this.verifyAccountForm.controls;
  }

  verifyAccount() {
    this.loading = true;

    if (this.verifyAccountForm.invalid) {
      this.loading = false;
      this.alertForm = true;
      return;
    }

    const formData = {
      ['useremail']: this.f['useremail'].value,
    };

    this.userservice.verifyEmail(formData).subscribe({
      next: () => {
        this.verifyAccountForm.reset();
        this.loading = false;
      },
      error: (error) => {
        console.error(error);
        this.loading = false;
      },
    });
  }
}
