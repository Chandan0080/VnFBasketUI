import { Component, inject, signal } from '@angular/core';
import { UserService } from '../../services/user-profile';
import { Address } from '../../models/address.model';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-address',
  imports: [
    MatIconModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule
  ],
  templateUrl: './address.html',
  styleUrl: './address.css',
})
export class UserAddress {
  userService = inject(UserService);
  private fb = inject(FormBuilder);

  getAllAddress = signal<Address[]>([]);
  isFormOpen = signal(false);
  isEditMode = signal(false);
  selectedAddressId = signal<number | null>(null);

  addressForm: FormGroup = this.fb.group({
    address: ['', [Validators.required]],
    street: ['', [Validators.required]],
    city: ['', [Validators.required]],
    state: ['', [Validators.required]],
    pinCode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
    isDefault: [false, [Validators.required]]
  });

  ngOnInit(): void {
    this.getAllAddresses();

    if (!this.userService.userProfile()) {
      this.userService.loadUserProfile();
    }
  }

  getAllAddresses() {
    this.userService.getAllAddresses().subscribe((response) => {
      this.getAllAddress.set(this.sortAddresses(response));
      console.log('All addresses retrieved successfully', response);
    });
  }

  openAddAddressForm() {
    this.isFormOpen.set(true);
    this.isEditMode.set(false);
    this.selectedAddressId.set(null);

    this.addressForm.reset({
      address: '',
      street: '',
      city: '',
      state: '',
      pinCode: '',
      isDefault: false
    });

    this.addressForm.markAsPristine();
    this.addressForm.markAsUntouched();
  }

  cancelAddressForm() {
    this.isFormOpen.set(false);
    this.isEditMode.set(false);
    this.selectedAddressId.set(null);

    this.addressForm.reset({
      address: '',
      street: '',
      city: '',
      state: '',
      pinCode: '',
      isDefault: false
    });
  }

  saveAddress() {
    if (this.addressForm.invalid) return;

    if (this.isEditMode()) {
      const updatePayload: Address = {
        addressId: this.selectedAddressId()!,
        address: this.addressForm.value.address,
        street: this.addressForm.value.street,
        city: this.addressForm.value.city,
        state: this.addressForm.value.state,
        pinCode: this.addressForm.value.pinCode,
        isDefault: this.addressForm.value.isDefault
      };

      this.userService.updateAddress(updatePayload).subscribe({
        next: (response: Address) => {
          this.getAllAddress.update(addresses =>
            addresses.map(a =>
              a.addressId === response.addressId ? response : a
            )
          );

          if (response.isDefault) {
            this.getAllAddress.update(addresses =>
              this.sortAddresses(
                addresses.map(a =>
                  a.addressId === response.addressId ? response : a
                )
              )
            );
          }

          this.cancelAddressForm();
          console.log('Address updated successfully', response);
        },
        error: (err) => {
          console.error('Update address failed', err);
        }
      });

      return;
    }

    const payload: Address = {
      address: this.addressForm.value.address,
      street: this.addressForm.value.street,
      city: this.addressForm.value.city,
      state: this.addressForm.value.state,
      pinCode: this.addressForm.value.pinCode,
      isDefault: this.addressForm.value.isDefault
    };

    this.userService.addAddress(payload).subscribe({
      next: (response: Address) => {
        if (response.isDefault) {
          this.getAllAddress.update(addresses =>
            this.sortAddresses(
              addresses.map(a =>
                a.addressId !== response.addressId ? { ...a, isDefault: false } : a
              )
            )
          );
        }

        this.getAllAddress.update(addresses =>
          this.sortAddresses([...addresses, response])
        );
        this.cancelAddressForm();
        console.log('Address added successfully', response);
      },
      error: (err) => {
        console.error('Add address failed', err);
      }
    });
  }

  editAddress(address: Address) {
    if (address.addressId == null) return;
    this.isFormOpen.set(true);
    this.isEditMode.set(true);
    this.selectedAddressId.set(address.addressId);

    this.addressForm.patchValue({
      address: address.address,
      street: address.street,
      city: address.city,
      state: address.state,
      pinCode: address.pinCode,
      isDefault: address.isDefault
    });

    this.addressForm.markAsPristine();
    this.addressForm.markAsUntouched();
  }

  deleteAddress(addressId: number) {
    if (!addressId) return;

    if (confirm('Are you sure you want to delete this address?')) {
      this.userService.deleteAddress(addressId).subscribe({
        next: () => {
          console.log('Deleted address ID:', addressId);
          this.getAllAddress.update(addresses =>
            addresses.filter(a => a.addressId !== addressId)
          );
        },
        error: (err) => {
          console.error('Delete failed', err);
        }
      });
    }
  }

  private sortAddresses(addresses: Address[]): Address[] {
    return [...addresses].sort((a, b) => Number(b.isDefault) - Number(a.isDefault));
  }
}