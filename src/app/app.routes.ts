import { Routes } from '@angular/router';
import { Registration } from './components/registration/registration';
import { Login } from './components/login/login';
import { Home } from './components/home/home';
import { AddProduct } from './components/add-product/add-product';

export const routes: Routes = [
  { path: '', component: Home},
  { path: 'login', component: Login },
  { path: 'registration', component: Registration },
  { path: 'add-product', component: AddProduct }
];
