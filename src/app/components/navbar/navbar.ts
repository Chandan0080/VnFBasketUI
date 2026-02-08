import { Component, signal } from '@angular/core';
import { AuthService } from '../../services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {

  isLogin:boolean = false;
  constructor(private authService: AuthService, private router: Router) {
 
    this.isLogin = this.authService.LoginStatus;
    console.log('Navbar Login Status:', this.isLogin);
  }



    logout() {
    this.authService.logout();
    this.router.navigate(['/login']);


  }
}
