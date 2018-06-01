import {Component, OnInit} from '@angular/core';
import {PostsService} from '../services/post.service';
import {Post} from '../models/Post.model';
import {Subscription} from 'rxjs/Subscription';
import {Router} from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  posts: Post[];
  postsSubscription: Subscription;


  constructor(private postsService: PostsService,
              private router: Router
  ) {
      }

  ngOnInit() {
    this.postsSubscription = this.postsService.postsSubject.subscribe(
      (posts: Post[]) => {
        this.posts = posts;
      }
    );
    this.postsService.emitPostsSubject();
    this.postsService.getPosts();
  }
}
