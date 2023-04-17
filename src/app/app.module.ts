import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http'

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { FooterComponent } from './footer/footer.component';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { AboutPageComponent } from './about-page/about-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { TaskPageComponent } from './task-page/task-page.component';
import { TaskListComponent } from './task-list/task-list.component';
import { AddTaskComponent } from './task-list/add-task/add-task.component';
import { EditTaskComponent } from './task-list/edit-task/edit-task.component';
import { DeleteTaskComponent } from './task-list/delete-task/delete-task.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';


import { TaskGlobalListComponent } from './task-global-list/task-global-list.component';
import { TaskGlobalPageComponent } from './task-global-page/task-global-page.component';
import { TaskDetailPageComponent } from './task-detail-page/task-detail-page.component';
import { TaskInfoPipe } from './task-global-list/task-info.pipe';
import { NgbOffcanvasModule } from '@ng-bootstrap/ng-bootstrap';

import { UploadTaskComponent } from './task-list/upload-task/upload-task.component';
import { AcceptTaskComponent } from './accept-task/accept-task.component';

import { NgxPaginationModule } from 'ngx-pagination';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CardListComponent } from './card-list/card-list.component';
import { CardComponent } from './card/card.component';
import { TypeFormComponent } from './type-form/type-form.component';

import { LazyLoadImageModule } from 'ng-lazyload-image';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    AboutPageComponent,
    HomePageComponent,
    TaskPageComponent,
    TaskListComponent,
    AddTaskComponent,
    EditTaskComponent,
    DeleteTaskComponent,
    TaskGlobalListComponent,
    TaskGlobalPageComponent,
    TaskDetailPageComponent,
    TaskInfoPipe,
    UploadTaskComponent,
    AcceptTaskComponent,
    CardListComponent,
    CardComponent,
    TypeFormComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatSlideToggleModule,
    MatTabsModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    FormsModule,
    NgbOffcanvasModule,
    NgxPaginationModule,
    InfiniteScrollModule,
    LazyLoadImageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
