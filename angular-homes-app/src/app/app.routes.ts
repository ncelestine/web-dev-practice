import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { Details } from './details/details';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'details/:id',
    component: Details
  }
];