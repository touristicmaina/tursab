// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser
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

  // ======================
  // REGISTER
  // ======================
  register(creds: AuthCredentials): Observable<AppUser> {
    return from(
      createUserWithEmailAndPassword(this.auth, creds.email, creds.password)
    ).pipe(
      switchMap(({ user }) => {
        const ref = doc(this.firestore, `users/${user.uid}`);
        return from(
          setDoc(ref, {
            uid: user.uid,
            email: user.email,
            role: UserRole.USER
          })
        ).pipe(
          switchMap(() => this.getAppUser(user))
        );
      })
    );
  }

  // ======================
  // LOGIN
  // ======================
  login(creds: AuthCredentials): Observable<AppUser> {
    return from(
      signInWithEmailAndPassword(this.auth, creds.email, creds.password)
    ).pipe(
      switchMap(({ user }) => {
        localStorage.setItem('loginTime', Date.now().toString());
        return this.getAppUser(user);
      })
    );
