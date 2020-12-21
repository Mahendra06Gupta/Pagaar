import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from '@core/components/login-page/login-page.component';
import { DashboardComponent } from './core/components/dashboard/dashboard.component';
import { AuthenticatedGuard } from './core/guards/authenticated.guard';
import { MainRoutes } from '@app/app.route-names';
import { SignUpComponent } from './core/components';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'login',
        component: LoginPageComponent,
      },
      {
        path: 'create-account',
        component: SignUpComponent,
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
    ]
  },
  // {
  //   path: '',
  //   canActivate: [AuthenticatedGuard],
  //   canActivateChild: [AuthenticatedGuard],
  //   children: [
  //     {
  //       path: '',
  //       component: DashboardComponent,
  //       children: [
  //         {
  //           path: MainRoutes.conference,
  //           loadChildren: () => import('@app/dashboard/components/conference/conference.module').then(m => m.ConferenceModule)
  //         },
  //       ]
  //     }
  //   ]
  // },
];

@NgModule({
  providers: [
    AuthenticatedGuard
  ],
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
