import { HttpClient } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
     private token: string | null = null;
     private isLoggedIn = signal(false);

     constructor(private http: HttpClient){}

     public apiUrl: string = 'http://localhost:8080/api';

     login(details: any): Observable<any> {
      // const headers = { 'Content-Type': 'application/json' };

        return this.http.post(this.apiUrl+ '/user/login', details);
     }

     register(details: any): Observable<any> {
         
        return this.http.post(this.apiUrl + '/register', details);

     }

     saveToken(token: string): void {
        this.token = token;
        this.isLoggedIn.set(true);
        // Optionally, save the token to localStorage or cookies for persistence
        localStorage.setItem('token', token);
     }

     setRole(role: any){
        localStorage.setItem('role', role);
     }

     get Role(){
        return localStorage.getItem('role');
     }

     setUserId(userId: any){
        localStorage.setItem('userId', userId);
     }

     get UserId(){
        return localStorage.getItem('userId');
     }

     setEmail(email: any){
        localStorage.setItem('email', email);
     }

     get Email(){
        return localStorage.getItem('email');
     }

     get LoginStatus(): boolean {
         
        return !!localStorage.getItem('token');
     }

     get Token(): string | null {
        this.token = localStorage.getItem('token');
        return this.token;
     }

     logout(){
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('userId');
        localStorage.removeItem('email');
        this.token = null;
        this.isLoggedIn.set(false);
     }

     checkEmailExists(email: string): Observable<boolean> {
        return this.http.get<boolean>(this.apiUrl + '/checkUserExists?username=' + email);
     }
}
    
