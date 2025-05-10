// src/app/services/user.service.ts
import { Injectable } from '@angular/core';
import { Firestore, doc, docData } from '@angular/fire/firestore';
import { Auth, authState } from '@angular/fire/auth';
import { Observable, of, switchMap } from 'rxjs';
import { AppUser } from '../models/user.model'; // make sure this matches your model

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private firestore: Firestore, private auth: Auth) {}

  getUserData(): Observable<AppUser | null> {
    return authState(this.auth).pipe(
      switchMap(user => {
        if (user) {
          const userRef = doc(this.firestore, `users/${user.uid}`);
          return docData(userRef) as Observable<AppUser>;
        } else {
          return of(null);
        }
      })
    );
  }
}
