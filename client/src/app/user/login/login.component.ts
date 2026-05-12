import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../user.service';
import { emailValidator } from '../../utils/email.validator';
import { EMAILS } from '../../constants';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    FormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: '../authentication/authentication.component.css'
})
export class LoginComponent {
  emails: string[] = EMAILS;
  isLoading: boolean = false;
  errorMessage: string = '';
  
  form = new FormGroup({
    email: new FormControl('', [
      Validators.required, 
      emailValidator(this.emails)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5)
    ])
  });

  constructor(private userService: UserService, private router: Router){}

  login():void{
    if(this.form.invalid){
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    const {email ,password} = this.form.value;
    console.log(this.form.value);
    this.userService.login(email!, password!)
    .subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/cars']);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.message || 'Login failed. Please try again.';
        console.error('Login error:', err);
      }
    })
  }
}
