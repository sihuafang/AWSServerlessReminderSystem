import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';
import {Router} from '@angular/router';

import {LoginServiceService} from '../../services/login-service/login-service.service';
import {TodoServiceService} from '../../services/todo-service/todo-service.service';

@Component({
  selector: 'app-todo-create',
  templateUrl: './todo-create.component.html',
  styleUrls: ['./todo-create.component.css']
})
export class TodoCreateComponent implements OnInit {

  name = ""
  description = ""
  status = ""
  id = ""

  constructor(
    private http:  Http
    , private router: Router
    , private loginService: LoginServiceService
    , private todoService: TodoServiceService
  ) { 
  }

  ngOnInit() {
    if (!this.isLoggedIn()) {
      
      this.gotoLogin()
      return
    }
  }

  isLoggedIn() : boolean {
    return this.loginService.isLoggedIn()
  }

  gotoLogin() {
    this.router.navigateByUrl('login')
  }
  
  onCreate() {
    var todo = {name: this.name, description: this.description}
    this.todoService.create(todo).subscribe(
      this.onCreateSuccess.bind(this),
      this.onCreateError.bind(this)
    )
  }

  onCreateSuccess(result: any) {
    this.status = "Create successfull"
    this.router.navigateByUrl("")
  }

  onCreateError(error: any) {
    this.status = "Create failed"
    console.log(error)
  }
 
}
