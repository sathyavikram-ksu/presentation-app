import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  message = '';
  email: string;
  password: string;

  constructor(private userService: UserService, private router: Router) { }

  async login() {
    this.message = '';
    if (!this.email || this.email.length < 0) {
      this.message = 'Please enter valid email';
    } else if (!this.password || this.password.length < 0) {
      this.message = 'Please enter valid password';
    } else {
      try {
        await this.userService.
          signIn(this.email, this.password);
        this.router.navigate(['dashboard']);
      } catch (error) {
        this.message = 'Incorrect Email or Password.';
      }
    }
  }
}
