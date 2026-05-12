import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, FormSubmittedEvent, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { emailValidator } from '../../utils/email.validator';
import { EMAILS } from '../../constants';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: '../authentication/authentication.component.css'
})
export class RegisterComponent {
  emails: string[] = EMAILS;
  isLoading: boolean = false;
  errorMessage: string = '';

  form = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    email: new FormControl('', [
      Validators.required,
      emailValidator(this.emails)
    ]),
    phoneNumber: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5)
    ])
  });

  constructor(private userService: UserService, private router: Router) { }

  register(): void {
    if (this.form.invalid) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    console.log(this.form.value);
    const {
      username,
      email,
      phoneNumber,
      password
    } = this.form.value;

    this.userService.register(username!, email!, phoneNumber!, password!)
      .subscribe({
        next: () => {
          this.isLoading = false;
          this.router.navigate(['/cars']);
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMessage = err.error?.message || 'Registration failed. Please try again.';
          console.error('Registration error:', err);
        }
      })
  }
}
