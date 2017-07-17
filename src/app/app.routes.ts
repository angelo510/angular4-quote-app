import { Routes } from '@angular/router';
import { HomeComponent } from './views/home';
import { ConfirmComponent } from './views/confirm';
import { ManagerComponent } from './views/manager';

export const ROUTES: Routes = [
  { path: '',      component: HomeComponent },
  { path: 'quote/:account_id/:quote_id',  component: HomeComponent },
  { path: 'confirm',  component: ConfirmComponent },
  { path: 'manager',  component: ManagerComponent },
];
