import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpModule, Http} from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { TodoPageComponent } from './components/todo-page/todo-page.component';
import {LoginServiceService} from './services/login-service/login-service.service';
import {TodoServiceService} from './services/todo-service/todo-service.service';
import {TodoCreateComponent} from './components/todo-create/todo-create.component';
import { TodoEditComponent } from './components/todo-edit/todo-edit.component'





const appRoutes: Routes = [
  { path: 'todolist', component: TodoPageComponent },
  { path: 'login',      component: LoginPageComponent },
  {path: 'create', component: TodoCreateComponent},
  {path: 'edit/:id', component: TodoEditComponent},
  { path: '',
    redirectTo: '/todolist',
    pathMatch: 'full'
  }
];


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    TodoPageComponent,
    TodoCreateComponent,
    TodoEditComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    HttpModule,
    FormsModule
  ],
  providers: [LoginServiceService, TodoServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
