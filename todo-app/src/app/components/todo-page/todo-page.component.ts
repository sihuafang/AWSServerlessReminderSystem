import { Component, OnInit } from '@angular/core'
import {Router} from '@angular/router'
import { LoginServiceService } from '../../services/login-service/login-service.service'
import {TodoServiceService} from '../../services/todo-service/todo-service.service'


@Component({
  selector: 'app-todo-page',
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.css']
})
export class TodoPageComponent implements OnInit {

  items = [];

   constructor(private router: Router, private loginService: LoginServiceService, private todoService: TodoServiceService) {

  }

  ngOnInit() {
      if (!this.isLoggedIn()) {
      
      this.gotoLogin()
      return
    }

    this.onRefresh()
  }

  isLoggedIn() : boolean {
    return this.loginService.isLoggedIn()
  }

  gotoLogin() {
    this.router.navigateByUrl('login')
  }

  onRefresh() {
    this.items = []

    this.todoService.getItems().subscribe(
      this.onGetItemsSuccess.bind(this),
      this.onGetItemsError.bind(this)
    )
  }

  onGetItemsSuccess(result: any) {

    this.items = result.items
}

  onGetItemsError(error: any) {
    console.log(error)
  }
    onDelete(id) {
    this.todoService.delete(id).subscribe(this.onDeleteSuccess.bind(this), this.onDeleteError.bind(this))
  }

  onDeleteSuccess(result: any) {
    console.log("delete successfull")
    this.onRefresh()
  }

  onDeleteError(error: any) {
    console.log("delete error")
    this.onRefresh()
  }
}
