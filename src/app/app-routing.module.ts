import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutPageComponent } from './about-page/about-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { TaskPageComponent } from './task-page/task-page.component';
import { TaskGlobalPageComponent } from './task-global-page/task-global-page.component';
import { TaskDetailPageComponent } from './task-detail-page/task-detail-page.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'about', component: AboutPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'task', component: TaskPageComponent },
  { path: 'globalTask', component: TaskGlobalPageComponent },
  { path: 'manage', component: TaskDetailPageComponent },
  { path: 'tasks/:id', component: TaskDetailPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
