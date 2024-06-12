import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './core/guards/auth.guards';

/**
 * Application routes configuration.
 */
const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'welcome',
        loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomePageModule)
    },
    {
        path: 'login',
        loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
    },
    {
        path: 'register',
        loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterPageModule)
    },
    {
        path: 'about-me',
        loadChildren: () => import('./pages/about-me/about-me.module').then(m => m.AboutMePageModule)
    },
    {
        path: 'home',
        loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'vehicles',
        loadChildren: () => import('./pages/vehicles/vehicles.module').then(m => m.VehiclesPageModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'providers',
        loadChildren: () => import('./pages/providers/providers.module').then(m => m.ProvidersPageModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'admin',
        loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminPageModule),
        canActivate: [AuthGuard]
    },
];

/**
 * NgModule for the AppRoutingModule.
 */
@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
