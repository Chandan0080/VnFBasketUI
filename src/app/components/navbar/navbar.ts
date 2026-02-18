import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth-service.service';
import { MatDialog } from '@angular/material/dialog';
import { Login } from '../login/login';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {

  isLoggedIn: boolean = false;

  constructor(private authService: AuthService, private router: Router, private dialog: MatDialog) {}

  ngOnInit(): void {
    // 🔥 Subscribe to login state
    this.authService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
    });
    console.log('Navbar initialized. Current login status:', this.isLoggedIn);
  }

    openLoginModal(): void {
    this.dialog.open(Login, {
      width: '500px',
      disableClose: false, // click outside to close
      panelClass: 'custom-dialog'
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
