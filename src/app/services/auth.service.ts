  // src/app/services/auth.service.ts
  import { Injectable } from '@angular/core';
  import {
    Auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    User as FirebaseUser,
    onAuthStateChanged
  } from '@angular/fire/auth';
  import {
    Firestore,
    doc,
    docData,
    setDoc
  } from '@angular/fire/firestore';
  import { from, Observable, switchMap, of, tap } from 'rxjs';
  import { AppUser } from '../models/user.model';
  import { AuthCredentials } from '../models/auth-credentials.model'; 
  import { UserRole } from '../models/user-role.enum';
import { c } from '@angular/core/navigation_types.d-u4EOrrdZ';

  @Injectable({ providedIn: 'root' })
  export class AuthService {
    constructor(private auth: Auth, private firestore: Firestore) {}

    /** Sign up and assign default USER role */
    register(creds: AuthCredentials): Observable<AppUser> {
      return from(createUserWithEmailAndPassword(this.auth, creds.email, creds.password))
        .pipe(
          switchMap(({ user }) => {
            // create Firestore user doc with default role
            const userDocRef = doc(this.firestore, `users/${user.uid}`);
            return from(
              setDoc(userDocRef, {
                uid: user.uid,
                email: user.email,
                role: UserRole.USER,
                displayName: user.displayName ?? null,
                photoURL: user.photoURL ?? null,
                phone: user.phoneNumber ?? null
              })
            ).pipe(
              // after writing, emit the full AppUser
              switchMap(() => this.getAppUser(user))
            );
          })
        );
    }

  /** Sign in */
  login(creds: AuthCredentials): Observable<AppUser> {
      return from(signInWithEmailAndPassword(this.auth, creds.email, creds.password)).pipe(
        switchMap(({ user }) => this.getAppUser(user)),
        tap(() => {
          // Save login timestamp after successful login
          localStorage.setItem('loginTime', Date.now().toString());
  
        })
      );
    }
    

    /** Sign out */
    logout(): Observable<void> {
      return from(signOut(this.auth));
    }


    async getCurrentUser(): Promise<FirebaseUser> {
      const user = this.auth.currentUser;
      if (!user) throw new Error('User not logged in');
      return user;
    }
    
    /** Internal: merge FirebaseUser + Firestore role */
    private getAppUser(firebaseUser: FirebaseUser): Observable<AppUser> {
      const userDocRef = doc(this.firestore, `users/${firebaseUser.uid}`);
      return docData(userDocRef, { idField: 'uid' }).pipe(
        switchMap(data => {
          // If for some reason no doc, fallback to USER
          if (!data || !('role' in data)) {
            const fallback: AppUser = {
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              displayName: firebaseUser.displayName,
              photoURL: firebaseUser.photoURL,
              role: UserRole.USER
            };
            return of(fallback);
          }
          return of(data as AppUser);
        })
      );
    }

    /** Expose the current user as AppUser|null */
    get user$(): Observable<AppUser | null> {
      return new Observable(observer =>
        onAuthStateChanged(this.auth, firebaseUser => {
          if (firebaseUser) {
            this.getAppUser(firebaseUser).subscribe(observer);
          } else {
            observer.next(null);
          }
        })
      );
    }
  }
