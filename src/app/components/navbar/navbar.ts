import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth-service.service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {

  isLoggedIn: boolean = false;
  role: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // 🔥 Subscribe to login state
    this.authService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
    });

    this.authService.role$.subscribe(role => {
      this.role = role;
    });
    
  }


  logout() {
    this.authService.logout();
  }
}
