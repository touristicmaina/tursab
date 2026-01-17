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

import { Observable, from, of, switchMap } from 'rxjs';

import { AppUser } from '../models/user.model';
import { AuthCredentials } from '../models/auth-credentials.model';
import { UserRole } from '../models/user-role.enum';

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(
    private auth: Auth,
    private firestore: Firestore
  ) {}

  // ===============================
  // REGISTER
  // ===============================
  register(creds: AuthCredentials): Observable<AppUser> {
    return from(
      createUserWithEmailAndPassword(
        this.auth,
        creds.email,
        creds.password
      )
    ).pipe(
      switchMap(({ user }) => {
        const ref = doc(this.firestore, `users/${user.uid}`);

        return from(
          setDoc(ref, {
            uid: user.uid,
            email: user.email,
            role: UserRole.USER,
            displayName: user.displayName ?? null,
            photoURL: user.photoURL ?? null
          })
        ).pipe(
          switchMap(() => this.getAppUser(user))
        );
      })
    );
  }

  // ===============================
  // LOGIN
  // ===============================
  login(creds: AuthCredentials): Observable<AppUser> {
    return from(
      signInWithEmailAndPassword(
        this.auth,
        creds.email,
        creds.password
      )
    ).pipe(
      switchMap(({ user }) => {
        localStorage.setItem('loginTime', Date.now().toString());
        return this.getAppUser(user);
      })
    );
  }

  // ===============================
  // LOGOUT
  // ===============================
  logout(): Promise<void> {
    localStorage.removeItem('loginTime');
    return signOut(this.auth);
  }

  // ===============================
  // CURRENT USER STREAM ✅
  // ===============================
  get user$(): Observable<AppUser | null> {
    return new Observable<AppUser | null>((observer) => {
      onAuthStateChanged(
        this.auth,
        (firebaseUser: FirebaseUser | null) => {
          if (!firebaseUser) {
            observer.next(null);
            return;
          }

          this.getAppUser(firebaseUser).subscribe({
            next: (user: AppUser) => observer.next(user),
            error: (err: unknown) => observer.error(err)
          });
        }
      );
    });
  }

  // ===============================
  // MERGE FIREBASE + FIRESTORE
  // ===============================
  private getAppUser(
    firebaseUser: FirebaseUser
  ): Observable<AppUser> {
    const ref = doc(this.firestore, `users/${firebaseUser.uid}`);

    return docData(ref).pipe(
      switchMap((data) => {
        if (!data) {
          return of({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            role: UserRole.USER
          } as AppUser);
        }

        return of(data as AppUser);
      })
    );
  }
}
