// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Firebase
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

// CoreUI
import { SidebarModule, CardModule } from '@coreui/angular';

import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { environment } from './environments/environment';

bootstrapApplication(AppComponent, {
  providers: [
    // Angular basics for standalone components
    importProvidersFrom(
      CommonModule,
      FormsModule,
      SidebarModule,
      CardModule
    ),

    // Router
    provideRouter(routes, withHashLocation()),

    // Firebase
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),

    // Animations
    provideAnimations()
  ]
}).catch((err) => {
  console.error(err);
});    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),

    // Animations (Angular Material / CoreUI)
    provideAnimations()
  ]
}).catch(console.error);    ]
  })
  .catch(err => console.error(err));
