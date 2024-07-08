import {Routes} from '@angular/router';
import {TestComponent} from './pages/test/test.component';
import {LoginComponent} from './pages/login/login.component';
import {RegisterComponent} from './pages/register/register.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {ControltaskComponent} from './pages/controltask/controltask.component';
import {TokenGuard} from "./guards/token.guard";

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent, canActivate: [TokenGuard] },
  { path: 'test', component: TestComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [TokenGuard],
  },
  {
    path: 'controltask/',
    component: ControltaskComponent,
    canActivate: [TokenGuard],
  },
  {
    path: 'controltask',
    component: ControltaskComponent,
    canActivate: [TokenGuard],
  },
  {
    path: 'controltask/:encryptedId',
    component: ControltaskComponent,
    canActivate: [TokenGuard],
  },
];
