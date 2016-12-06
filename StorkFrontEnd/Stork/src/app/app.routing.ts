import { RouterModule, Routes } from '@angular/router';

import { HomeComponent }     from './home/home.component';
import { LoginComponent } from './login/login.component';
import { EditComponent } from './edit/edit.component';
import { AccountCreationComponent }  from './account-creation/account-creation.component';
import { CaptchaCheckComponent } from './captcha-check/captcha-check.component';

const app_routes: Routes = [

  { path: '',  pathMatch:'full', redirectTo: '/login' },
  { path: 'home',  component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'edit', component: EditComponent },
  { path: 'account-creation', component: AccountCreationComponent },
  { path: 'captcha-check', component: CaptchaCheckComponent },
      { path: '',  pathMatch:'full', redirectTo: '/login' }
];

export const app_routing = RouterModule.forRoot(app_routes);