import {Component, Input, OnInit} from '@angular/core';
import {Post} from '../models/Post.model';
import {PostsService} from '../services/post.service';
import * as firebase from 'firebase';
import {post} from 'selenium-webdriver/http';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrls: ['./post-list-item.component.scss']
})
export class PostListItemComponent implements OnInit {

  @Input() title: string;
  @Input() content: string;
  @Input() indexOfPost: number;
  @Input() id: number;
  @Input() loveIts: number;
  @Input() post;
  created_at = new Date();

posts: Post[];
postsSubscription: Subscription ;

   constructor(private postService: PostsService) {
    }

  ngOnInit() {
     this.postsSubscription = this.postService.postsSubject.subscribe(
       (posts: Post[]) => {
         this.posts = posts ;
       }
     );
     this.postService.emitPosts();
      }
  onDeletePost(post: Post) {
    this.postService.removePost(post);
  }
  onLike() {
    this.loveIts ++;
    this.postService.savePosts();

  }
  onDislike() {
    this.loveIts --;
  }

}
