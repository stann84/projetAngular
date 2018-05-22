import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase';
import {PostsService} from './services/post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})



export class AppComponent implements OnInit {

  constructor (private postsService: PostsService) {
    // Initialize Firebase
    const config = {
      apiKey: 'AIzaSyAjJqj6p5061e7SBUE6e_07x_gfzH2LfUI',
      authDomain: 'blog-7bd4e.firebaseapp.com',
      databaseURL: 'https://blog-7bd4e.firebaseio.com',
      projectId: 'blog-7bd4e',
      storageBucket: 'blog-7bd4e.appspot.com',
      messagingSenderId: '1097932278053'
    };
    firebase.initializeApp(config);
  }

  ngOnInit () {

  }




}
