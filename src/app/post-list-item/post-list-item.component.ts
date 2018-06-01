import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {PostsService} from '../services/post.service';
import {Subscription} from 'rxjs/Subscription';
import {Post} from '../models/Post.model';

@Component({
  selector: 'app-post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrls: ['./post-list-item.component.scss']
})
export class PostListItemComponent implements OnInit , OnDestroy {

  @Input() title: string;
  @Input() content: string;
  @Input() indexOfPost: number;
  @Input() id: number;
  @Input() loveIts: number;
  created_at = new Date();

posts: Post[] ;
postsSubscription: Subscription ;

   constructor(private postService: PostsService) {
    }

  ngOnInit() {
     this.postsSubscription = this.postService.postsSubject.subscribe(
       (posts: Post[]) => {
         this.posts = posts ;
       }
     );
     this.postService.getPosts();
     this.postService.emitPostsSubject();
      }
  /*onDeletePost(post: Post) {
       this.postService.removePost(post);
       console.log(post);
  }*/

  onDeletePost(indexOfPost: number) {
     this.postService.removePost(this.indexOfPost);
}


  onLike(indexOfPost: number) {
    console.log(this.indexOfPost);
   this.postService.like(this.indexOfPost);
  }
  onDislike(indexOfPost: number) {
    this.postService.disLike(this.indexOfPost);
  }
  ngOnDestroy() {
     this.postsSubscription.unsubscribe();
  }

}
