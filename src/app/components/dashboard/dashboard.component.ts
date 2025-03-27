import { Component, OnInit, OnDestroy, inject, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

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
  errorMessage: string | null = null; // To display error feedback

  private authService = inject(AuthService);
  private userService = inject(UserService);
  private router = inject(Router);

  private authSubscription!: Subscription;
  isLoggedIn = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit() {
    // Subscribing to the isLoggedIn observable to track the login state
    this.authSubscription = this.authService.isLoggedIn.subscribe((token) => {
      this.isLoggedIn = token !== null;

      if (!this.isLoggedIn) {
        // Redirecting to the login page if user is not logged in
        if (isPlatformBrowser(this.platformId)) {
          this.router.navigate(['/login']); // Only navigate in browser
        }
        return;
      }

      // If logged in, fetching users
      if (isPlatformBrowser(this.platformId)) {
        // Only fetch data in browser, not during prerendering
        this.userService.getUsers().subscribe({
          next: (users) => {
            this.users = users;
            this.isLoading = false;
          },
          error: (error) => {
            this.isLoading = false;
            this.errorMessage = 'Failed to load users: ' + error.message;
          }
        });
      } else {
        // During prerendering, skip API call and show placeholder or empty state
        this.isLoading = false;
        this.users = []; // Empty state for prerendered page
      }
    });
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}