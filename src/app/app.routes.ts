import { Routes } from '@angular/router';
import { HomeComponent } from './views/home';

export const ROUTES: Routes = [
  { path: '',      component: HomeComponent },
  { path: 'quote/:account_id/:quote_id',  component: HomeComponent },
];
