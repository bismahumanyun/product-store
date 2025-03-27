import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatButtonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    username = '';
    password = '';

    login() {
        console.log('Logging in with:', this.username, this.password);
    }
}
