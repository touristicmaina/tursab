import { provideRouter } from '@angular/router';
import { routes } from './views/pages/routes';

export const appConfig = {
  providers: [
    provideRouter(routes)
  ]
};
