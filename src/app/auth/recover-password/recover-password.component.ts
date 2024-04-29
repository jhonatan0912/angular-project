import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { UserService } from '@core/services';
import { NavbarComponent } from '@shared/components';

@Component({
  selector: 'app-recover-password',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, NavbarComponent],
  templateUrl: './recover-password.component.html',
})
export class RecoverPasswordComponent implements OnInit {
  onToggle: boolean = false;
  loading: boolean = false;
  alertForm: boolean = false;
  recoverPasswordForm!: FormGroup;
  uid: string | null = null;
  token: string | null = null;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.recoverPasswordForm = this.formBuilder.group({
      userpassword: ['', [Validators.required]],
    });

    this.route.queryParams.subscribe((params) => {
      this.uid = params['uid'];
      this.token = params['token'];
    });
  }

  get f() {
    return this.recoverPasswordForm.controls;
  }

  recoverPassword() {
    this.loading = true;

    if (this.recoverPasswordForm.invalid || this.uid === null || this.token === null) {
      return;
    }

    const passwordValue = this.f['userpassword'].value;

    const formData = {
      userpassword: passwordValue,
    };

    this.userService.recoverPassword(this.uid, this.token, formData).subscribe({
      next: () => {
        this.loading = false;
        this.recoverPasswordForm.reset();
      },
      error: (error) => {
        console.error('recoverPassword: Error durante la recuperación', error);
        this.loading = false;
      },
    });
  }

  toggle() {
    this.onToggle = !this.onToggle;
  }
}
