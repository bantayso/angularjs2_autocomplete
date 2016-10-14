import { Routes, RouterModule } from '@angular/router';
import {AuthGuard}from "./_guards/auth.guard"
import { Home } from './home';


export const ROUTES: Routes = [
    { path: '', component: Home },
  { path: 'home', component: Home}
];
