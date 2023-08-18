import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { appRoutes } from './app.routes';

export const appConfig: any = {
  providers: [provideRouter(appRoutes, withEnabledBlockingInitialNavigation())],
};
