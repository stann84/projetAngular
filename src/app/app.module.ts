import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostListItemComponent } from './post-list-item/post-list-item.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HeaderComponent } from './header/header.component';
import {RouterModule, Routes} from '@angular/router';
import { NewPostComponent } from './new-post/new-post.component';
import { PostsComponent } from './posts/posts.component';
import {PostsService} from './services/post.service';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';

const appRoutes: Routes = [
  {path: 'posts' , component: PostsComponent},
  {path: 'new' , component: NewPostComponent},
  {path: '' , component: PostsComponent},
  {path: 'not-found' , component: FourOhFourComponent},
  {path: '**' , redirectTo: '/not-found'}
];


@NgModule({
  declarations: [
    AppComponent,
    PostListComponent,
    PostListItemComponent,
    SigninComponent,
    SignupComponent,
    HeaderComponent,
    NewPostComponent,
    PostsComponent,
    FourOhFourComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    ],
  providers: [
    PostsService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

