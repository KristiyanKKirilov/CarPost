import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { LoaderComponent } from '../shared/loader/loader.component';

@Component({
  selector: 'app-authenticated',
  standalone: true,
  imports: [LoaderComponent],
  templateUrl: './authenticated.component.html',
  styleUrl: './authenticated.component.css'
})
export class AuthenticatedComponent implements OnInit {
  isAuthenticating = true;

  constructor(private userService: UserService){}

  ngOnInit(): void {
    this.userService.getProfile().subscribe({
      next: () => {
        this.isAuthenticating = false;
      },
      error: () => {
        this.isAuthenticating = false;
      },
      complete: () => {
        this.isAuthenticating = false;
      }
    })
  }
}
