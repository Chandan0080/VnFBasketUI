import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth-service.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {

  loginForm:FormGroup;
  errorMsg:any;

  constructor(private fb:FormBuilder, private authService:AuthService) { 
    this.loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,16}$')]]
  });
  }

  ngOnInit(): void {
  }

  login(){
    if(this.loginForm.valid){
      const form = this.loginForm.value;
      const payload = { username: form.email, password: form.password };
      console.log('Login payload (sent):', payload);

      this.authService.login(payload).subscribe(resp => {
        console.log('Login response (full):', resp);
        const body = resp?.body ?? resp;
        this.authService.saveToken(body.token);
        this.authService.setRole(body.role);
        this.authService.setEmail(body.email);
        this.authService.setUserId(body.userId);
      }, (error:any) => {
        console.error('Login failed', error);
        this.errorMsg = error.error?.message || error.error || 'Login failed';
      });
    }
  }

}
