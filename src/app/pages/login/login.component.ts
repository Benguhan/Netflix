declare var google: any;
import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  private router = inject(Router);
  ngOnInit(): void {
    google.accounts.id.initialize({
      client_id: '594781362975-ikthhvmh19him174rhbfci1rt9jieh68.apps.googleusercontent.com',
      callback: (response: any) => this.handleGoogleLogin(response)
    });
 
    google.accounts.id.renderButton(document.getElementById('google-button'), {
      theme: 'filled_black',
      size: 'large',
      width: 350,
      logo_alignment: 'left',
      shape: 'circular',
    })
  }

  private decodeToken(token: string) {
    return JSON.parse(atob(token.split('.')[1]));
  }

  handleGoogleLogin(response: any) {
    //decode the token
    const payload = this.decodeToken(response.credential);
    //store in session 
    sessionStorage.setItem('loggedInUser', JSON.stringify(payload));
    //redirect to home page
    this.router.navigate(['browse']);
  }
}