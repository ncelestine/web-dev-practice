import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import {Details} from './details/details';

const routeConfig: Routes= [
  {
    path: '',
    component: HomeComponent,
    title: 'home Page'
  },
  {
    path:'details',
    component: Details,
    title:'Details Page'
  }
]

export default routeConfig;