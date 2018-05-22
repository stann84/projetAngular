import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable()
export class AuthService {

  constructor() { }
  createNewUser (email: string, password: string) {
    return new Promise (
      (resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(
          () => {
            resolve ();
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

}
