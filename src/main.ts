  // main.ts
  import { importProvidersFrom } from '@angular/core';
  import { bootstrapApplication } from '@angular/platform-browser';
  import { BrowserModule } from '@angular/platform-browser';
  import { FormsModule } from '@angular/forms';
  import { provideAnimations } from '@angular/platform-browser/animations';
  import { provideRouter, withHashLocation } from '@angular/router';
  import { provideFirebaseApp, initializeApp }   from '@angular/fire/app';
  import { provideAuth, getAuth }                from '@angular/fire/auth';
  import { provideFirestore, getFirestore } from '@angular/fire/firestore';


  // CoreUI imports:
  import { SidebarModule, CardModule } from '@coreui/angular';

  import { AppComponent } from './app/app.component';
  import { routes }       from './app/app.routes';
  import { environment }  from './environments/environment';
  import { CommonModule } from '@angular/common'; 

  bootstrapApplication(AppComponent, {
    providers: [
      // bring in the standard Browser + Forms modules for standalone components:
      importProvidersFrom(BrowserModule, FormsModule,CommonModule),

      // bring in CoreUI’s modules (this registers Sidebar and Card components, etc.)
      importProvidersFrom(SidebarModule, CardModule),

      // your router config
      provideRouter(routes, withHashLocation()),

      // Firebase providers
      provideFirebaseApp(() => initializeApp(environment.firebase)),
      provideAuth(() => getAuth()), 
      provideFirestore(() => getFirestore()),
      provideAnimations(),
    ]
  })
  .catch(err => console.error(err));
