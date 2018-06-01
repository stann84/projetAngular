import { Injectable, Input } from '@angular/core';
import * as  firebase from 'firebase';
import {Subject} from 'rxjs/Subject';
import {Post} from '../models/Post.model';
import {HttpClient} from '@angular/common/http';
import index from '@angular/cli/lib/cli';


@Injectable()
export class PostsService {
// penser a faire le model
   posts: Post[] = [];
   postsSubject = new Subject<Post[]>();

   constructor (private httpClient: HttpClient) {}

   emitPostsSubject() {
     this.postsSubject.next(this.posts);
   }

// ajouter des posts vers la base de donnée
   // anciene sauvegarde
   savePosts() {
     firebase.database().ref('/posts').set(this.posts);
   }


  /*savePosts() {
    this.httpClient
      .put('https://blog-7bd4e.firebaseio.com/posts.json' , this.posts)
      .subscribe(
        () => {
          console.log('enregistrement terminé');
        },
        (error) => {
          console.log('erreur de sauvegarde' + error);
        }
      );
  }*/
  savePostUp(i: number) {
   //  this.posts[index].loveIts = 4;
  }



  createNewPost(newPost: Post) {
     this.posts.push(newPost);
     this.savePosts();
     this.emitPostsSubject();
   }


   // afficher les post : recuperer la liste sur la base de donnée (.on réagie en temps reel)
  getPosts() {
     firebase.database().ref('posts')
       .on('value', (data) => {
         this.posts = data.val() ? data.val() : [];
         this.emitPostsSubject();
         }
       );
   }
 // supprimer un post

 removePost(indexOfPost: number) {
  const postIndexToRemove = indexOfPost ;
  console.log(indexOfPost);
  this.posts.splice(postIndexToRemove, 1);
  this.savePosts();
  this.emitPostsSubject();
}

/*removePost(post: Post) {
  const postIndexToRemove = this.posts.findIndex(
    (postEl) => {
      console.log(postEl);
      if (postEl === post) {
        console.log('element trouvé' + post);
        return true;
      }
    }
  );
  this.posts.splice(postIndexToRemove, 1);
  this.savePosts();
  this.emitPostsSubject();
}*/

   like(indexOfPost: number) {
     this.posts[indexOfPost].loveIts ++;
     this.savePosts();
     this.emitPostsSubject();
    }

    disLike(indexOfPost: number) {
      this.posts[indexOfPost].loveIts --;
      this.savePosts();
      this.emitPostsSubject();
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
