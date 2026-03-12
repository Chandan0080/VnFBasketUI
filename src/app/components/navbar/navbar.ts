import { Component, HostListener } from '@angular/core';
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
  isAccountOpen = false;

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
    this.router.navigate(['/']);
  }

  toggleAccountMenu(event: Event) {
  event.stopPropagation(); // prevent document click closing immediately
  this.isAccountOpen = !this.isAccountOpen;
}

@HostListener('document:click')
closeMenu() {
  this.isAccountOpen = false;
}
}
