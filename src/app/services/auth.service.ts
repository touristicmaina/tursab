import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User as FirebaseUser,
  authState
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

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(
    private auth: Auth,
    private firestore: Firestore
  ) {}

  /** Register and create Firestore user with default USER role */
  register(creds: AuthCredentials): Observable<AppUser> {
    return from(
      createUserWithEmailAndPassword(this.auth, creds.email, creds.password)
    ).pipe(
      switchMap(({ user }) => {
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
          switchMap(() => this.getAppUser(user))
        );
      })
    );
  }

  /** Login */
  login(creds: AuthCredentials): Observable<AppUser> {
    return from(
      signInWithEmailAndPassword(this.auth, creds.email, creds.password)
    ).pipe(
      switchMap(({ user }) => this.getAppUser(user)),
      tap(() => {
        localStorage.setItem('loginTime', Date.now().toString());
      })
    );
  }

  /** Logout */
  logout(): Observable<void> {
    return from(signOut(this.auth));
  }

  /** Current Firebase user */
  getCurrentUser(): FirebaseUser | null {
    return this.auth.currentUser;
  }

  /** Merge Firebase user with Firestore role */
  private getAppUser(firebaseUser: FirebaseUser): Observable<AppUser> {
    const userDocRef = doc(this.firestore, `users/${firebaseUser.uid}`);

    return docData(userDocRef, { idField: 'uid' }).pipe(
      switchMap(data => {
        if (!data || !('role' in data)) {
          return of({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
            role: UserRole.USER
          } as AppUser);
        }

        return of(data as AppUser);
      })
    );
  }

  /** Observable AppUser */
  user$(): Observable<AppUser | null> {
    return authState(this.auth).pipe(
      switchMap(firebaseUser =>
        firebaseUser ? this.getAppUser(firebaseUser) : of(null)
      )
    );
  }
}
