import { Injectable } from '@angular/core';
import * as  firebase from 'firebase';
import {Subject} from 'rxjs/Subject';
import {Post} from '../models/Post.model';
import {HttpClient} from '@angular/common/http';



@Injectable()
export class PostsService {
// penser a faire le model
   posts: Post[] = [];
   postsSubject = new Subject<Post[]>();

   constructor (private httpClient: HttpClient) {}

   emitPosts() {
     this.postsSubject.next(this.posts);
   }
// ajouter des posts vers la base de donnée
   savePosts() {
     console.log('enregistrement');
     firebase.database().ref('/posts').set(this.posts);
   }
   createNewPost(newPost: Post) {
     this.posts.push(newPost);
     this.savePosts();
     this.emitPosts();
   }

   saveToServer() {
     this.httpClient
       .put('https://blog-7bd4e.firebaseio.com/post.json' , this.posts)
       .subscribe(
         () => {
           console.log('enregistrement terminé');
         },
       (error) => {
           console.log('erreur de sauvegarde' + error);
       }
       );
   }

   // afficher les post : recuperer la liste sur la base de donnée (.on réagie en temps reel)
   getPosts() {
     firebase.database().ref('posts')
       .on('value', (data) => {
         this.posts = data.val() ? data.val() : [];
         this.emitPosts();
         }
       );
   }
 // supprimer des post
   removePost(post: Post) {
     const postIndexToremove = this.posts.findIndex(
       (postEl) => {
         if (postEl === post) {
           return true;
         }
       }
     );
     this.posts.splice(postIndexToremove, 1);
     this.savePosts();
     this.emitPosts();
   }
    }

 /* avant peut etre methode template
  posts = [
    {
      title: 'Mon premier post',
      content: '1Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
    },
    {
      title: 'Mon second post',
      content: '2Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
    },
    {
      title: 'Encore un post',
      content: '3Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
    }
  ];
// on rend disponible le httpclient firebase
  constructor(private httpClient: HttpClient) { }

// on enregistre les données vers le serveur

  savePostsToServer () {
    // httpClient envoie les données vers le serveur dans le node.json qui créer posts
    this.httpClient
      .put('https://blog-7bd4e.firebaseio.com/posts.json' , this.posts )
      // on créer le serie de réponse du serveur
      .subscribe(
      () => {
      console.log ('chargement terminé !');
    },
    (error) => {
        console.log('erreur' + error);
    }
    );
  }

}*/
