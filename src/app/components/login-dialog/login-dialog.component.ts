// src/app/components/login-dialog/login-dialog.component.ts
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  template: `
    <h2 mat-dialog-title>Login</h2>
    <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" mat-dialog-content>
      <mat-form-field>
        <mat-label>Username</mat-label>
        <input matInput formControlName="username" required>
      </mat-form-field>
      <mat-form-field>
        <mat-label>Password</mat-label>
        <input matInput type="password" formControlName="password" required>
      </mat-form-field>
      <div mat-dialog-actions>
        <button mat-button (click)="onCancel()">Cancel</button>
        <button mat-raised-button color="primary" type="submit" [disabled]="loginForm.invalid">
          Login
        </button>
      </div>
    </form>
  `,
  styles: [`
    mat-form-field {
      width: 100%;
      margin-bottom: 16px;
    }
    div[mat-dialog-actions] {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
    }
  `]
})
export class LoginDialogComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<LoginDialogComponent>
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.dialogRef.close(this.loginForm.value);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}