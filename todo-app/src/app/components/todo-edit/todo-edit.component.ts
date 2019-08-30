import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http'
import {Router, ActivatedRoute} from '@angular/router'

import {LoginServiceService} from '../../services/login-service/login-service.service'
import {TodoServiceService} from '../../services/todo-service/todo-service.service'

@Component({
  selector: 'app-todo-edit',
  templateUrl: './todo-edit.component.html',
  styleUrls: ['./todo-edit.component.css']
})
export class TodoEditComponent implements OnInit {
  name = ""
  description = ""
  status = ""
  id = ""
  constructor(
    private http:  Http
    , private router: Router
    , private route: ActivatedRoute
    , private loginService: LoginServiceService
    , private todoService: TodoServiceService
  ) { }

  ngOnInit() {
    if (!this.isLoggedIn()) {
      
      this.gotoLogin()
      return
    }

    this.route.params.subscribe(params => {
      this.id = params['id']; // (+) converts string 'id' to a number
      this.getTodo()
    })    
    
  }

  isLoggedIn() : boolean {
    return this.loginService.isLoggedIn()
  }

  gotoLogin() {
    this.router.navigateByUrl('login')
  }
  
  onSave() {
    this.status = "Saving..."
    var todo = {_id: this.id, name: this.name, description: this.description}
    this.todoService.update(todo).subscribe(
      this.onUpdateSuccess.bind(this),
      this.onUpdateError.bind(this)
    )
  }

  onUpdateSuccess(result: any) {
    this.status = "Saved"
    this.router.navigateByUrl("")
  }

  onUpdateError(error: any) {
    this.status = "Save failed"
    console.log(error)
  }

  getTodo() {
    this.status = "Loading..."
    this.todoService.getItem(this.id).subscribe(this.onGetSuccess.bind(this), this.onGetError.bind(this))
  }

  onGetSuccess(result: any) {
    console.log(result)
    this.status = ""
    if (result.items.length > 0) {
      var item = result.items[0]
      this.name = item.name
      this.description = item.description
    }
  }

  onGetError(error: any) {
    this.status = "Get failed"
    console.log(error)
  }
}
