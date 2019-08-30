import { Injectable } from '@angular/core'
import {HttpModule, Http, Response} from '@angular/http'
import { Observable } from 'rxjs/Observable'

@Injectable()
export class LoginServiceService {
  constructor(private http: Http) { }

  // login(userName: string, userPassword: string) : Promise<any> {
  //   var url = "https://383i72tqu5.execute-api.us-east-1.amazonaws.com/prod/authenticate";
  //   var me = this;
  //   var login = {username: userName, password: userPassword}
  //   return this.http.post(url, login).toPromise()
  // }

  login(userName: string, userPassword: string) : Observable<any> {
    var url = "https://383i72tqu5.execute-api.us-east-1.amazonaws.com/prod/authenticate";
    var me = this;
    var login = {username: userName, password: userPassword}
    return this.http.post(url, login).map((res: Response) => res.json())
  }

  setAuthenticationToken(authenticationToken: string) {
    localStorage.setItem("authorization", authenticationToken)
  }

  getAuthenticationToken() : string {
    return localStorage.getItem("authorization")
  }

  isLoggedIn() : boolean {
    var authenticationToken = this.getAuthenticationToken()

    return authenticationToken !== undefined && authenticationToken !== null && authenticationToken.length > 0
  }
}
