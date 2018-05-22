import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {PostsService} from '../services/post.service';
import {Post} from '../models/Post.model';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {
// je rend disponible form groupe
   postForm: FormGroup;

// j'injecte les modules necessaire pour le formulaire
  constructor(private formBuilder: FormBuilder,
              private postsService: PostsService,
              private router: Router) {}
// j'initialise le formulaire
  ngOnInit() {
    this.initForm();
  }
  initForm() {
    this.postForm = this.formBuilder.group({
        title: '',
        content: '',
        loveIts: '0',
      }
    );
  }

  // la methode du bouton post pour envoyer vers la base de donnée
  onSavePost() {
    const title =  this.postForm.get('title').value;
    const content =  this.postForm.get('content').value;
    const loveIts =  this.postForm.get('loveIts').value;
    const newPost = new Post (title, content, loveIts);
    this.postsService.createNewPost(newPost);
    this.router.navigate(['/posts']);
  }
}
