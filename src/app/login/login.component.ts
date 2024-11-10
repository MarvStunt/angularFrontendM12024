import { Component } from '@angular/core';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatFormField, MatInput, FormsModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  login: string;
  password: string;

  constructor(private AuthService: AuthService, private router: Router) {}

  onSubmit(event: Event) {
    this.AuthService.logIn(this.login, this.password);
    if(this.AuthService.isLogged()) {
      this.router.navigate(['/home']);
    } else {
      console.log('Erreur de connexion !');
    }
  }
}
