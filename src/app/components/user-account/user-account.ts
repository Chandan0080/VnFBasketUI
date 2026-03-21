import { Component, signal } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user-profile';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Address } from '../../models/address.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-user-account',
  imports: [
    MatIconModule,
    MatDividerModule,
    MatCardModule,
    MatButtonModule,
    RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule
  ],
  templateUrl: './user-account.html',
  styleUrl: './user-account.css',
})
export class UserProfile {

  isProfileOpen = true;
  isEditMode = signal(false);
  profileForm: FormGroup;
  defaultAddress = signal<Address | null>(null);

  constructor(public userService: UserService, private router: Router, private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      FirstName: ['', [Validators.required]],
      Surname: ['', [Validators.required]],
      Mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      Email: ['', [Validators.required, Validators.email]]
    });

  }

  ngOnInit(): void {
    this.getUserProfile();
    this.getDefaultAddressDetails();
    
  }

  getUserProfile() {
   this.userService.loadUserProfile();
  }

  editProfile() {
    this.isEditMode.set(true);

  const user = this.userService.userProfile();
  if (user) {
    this.profileForm.patchValue({
      FirstName: user.firstName,
      Surname: user.lastName,
      Mobile: user.phoneNumber,
      Email: user.email
    });

    this.profileForm.markAsPristine();
    this.profileForm.markAsUntouched();
  }
  }

  cancelEdit() {
    this.isEditMode.set(false);
  }

  getDefaultAddressDetails(){
    this.userService.getDefaultAddress().subscribe(
      (response) => {
        this.defaultAddress.set(response);
        console.log('Default address retrieved successfully', response);
        
      });
  }

  saveProfile() {
  if (this.profileForm.invalid) return;

  const updatedUser = {
    firstName: this.profileForm.value.FirstName,
    lastName: this.profileForm.value.Surname,
    phoneNumber: this.profileForm.value.Mobile,
    email: this.profileForm.value.Email
  };
  this.userService.updateUserProfile(updatedUser).subscribe(
    (response) => {
      this.userService.userProfile.set(response);
      this.isEditMode.set(false);
      console.log('Profile updated successfully');
    },
    (err) => {
      console.error('Update failed', err);
    });
}

}
