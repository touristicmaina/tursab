import { Observable } from 'rxjs';

user$: Observable<AppUser | null> = new Observable(observer => {
  onAuthStateChanged(this.auth, firebaseUser => {
    if (firebaseUser) {
      this.getAppUser(firebaseUser).subscribe({
        next: user => observer.next(user),
        error: err => observer.error(err)
      });
    } else {
      observer.next(null);
    }
  });
});
