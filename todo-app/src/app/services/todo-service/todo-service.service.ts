import { Injectable } from '@angular/core';
import {Http, RequestOptions, Headers} from '@angular/http'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { LoginServiceService } from '../login-service/login-service.service'

@Injectable()
export class TodoServiceService {

  constructor(private http: Http, private loginService: LoginServiceService) { }

  createRequestOptions() : RequestOptions {
    var options = new RequestOptions()
    options.headers = new Headers()   
    options.headers.append('Content-Type', 'application/json')
    options.headers.append('Authorization', this.loginService.getAuthenticationToken())
    return options
  }

  getItems() : Observable<any> {
    var options = this.createRequestOptions()
    var url = "https://383i72tqu5.execute-api.us-east-1.amazonaws.com/prod/todoitems";
        return this.http.get(url, options).map(res=>res.json())
  }

  getItem(id) : Observable<any> {
    var options = this.createRequestOptions()
    var url = "https://7iepji61g0.execute-api.us-east-1.amazonaws.com/prod/todoitems?id=" + id;
    	return this.http.get(url, options).map(res=>res.json())
  }

  create(todo: any) {
    var options = this.createRequestOptions()

    var url = "https://383i72tqu5.execute-api.us-east-1.amazonaws.com/prod/todoitems";
    return this.http.post(url, todo, options).map(res=>res.json())
  }
  update(todo: any) {
    var options = this.createRequestOptions()

    var url = "https://7iepji61g0.execute-api.us-east-1.amazonaws.com/prod/todoitems";
    return this.http.put(url, todo, options).map(res=>res.json())
  }

  delete(id: any) {
    var options = new RequestOptions()
    options.headers = new Headers()   
    options.headers.append('Authorization', this.loginService.getAuthenticationToken())
    var url = "https://7iepji61g0.execute-api.us-east-1.amazonaws.com/prod/todoitems?id=" + id;
    //var url = "https://7iepji61g0.execute-api.us-east-1.amazonaws.com/prod/todoitems";
    return this.http.delete(url, options)
  }
}


