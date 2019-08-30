import { Component, Input, OnInit} from '@angular/core';
import {HttpModule, Http} from '@angular/http';
import {LoginServiceService} from '../../services/login-service/login-service.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit{

  userName = ""

  @Input()
  userPassword = ""
  status = "Not Logged In"

  login = {username: "", password: ""}
  constructor(private http: Http, private router: Router, private loginService: LoginServiceService) { }

  ngOnInit() {
    if (this.isAuthenticated()) {
      this.status = "Logged in"
    }
    else {
      this.status = "Not logged in"
    }
  }


  isAuthenticated() {
    return this.loginService.isLoggedIn()
  }

  onLogin() {
    this.status = "Logging in..."

    this.loginService.login(this.userPassword, this.userPassword).subscribe(
      this.onLoginSuccess.bind(this),
      this.onLoginError.bind(this)
    )
  }

   onLoginSuccess(authenticationInfo: any) {
    this.loginService.setAuthenticationToken(authenticationInfo.id_token);
    this.status = "Logged In";
    this.router.navigateByUrl('');
  }

  onLoginError(error: any) {
    console.log(error)
    this.status = "User name or password incorrect"
   }
 }