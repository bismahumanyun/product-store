import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatProgressSpinnerModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  users: any[] = [];
  displayedColumns = ['id', 'username', 'email'];
  isLoading = true;

  private authService = inject(AuthService);
  private userService = inject(UserService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  private authSubscription!: Subscription;
  isLoggedIn = false;

  ngOnInit() {
    // Subscribing to the isLoggedIn observable to track the login state
    this.authSubscription = this.authService.isLoggedIn.subscribe((token) => {
      this.isLoggedIn = token !== null;

      if (!this.isLoggedIn) {
        // Redirecting to the login page if user is not logged in
        this.router.navigate(['/login']);
        return;
      }

      // If logged in, fetching users
      this.userService.getUsers().subscribe({
        next: (users) => {
          this.users = users;
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
          this.snackBar.open('Failed to load users', 'Close', { duration: 3000 });
        }
      });
    });
  }

  ngOnDestroy() {

    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
