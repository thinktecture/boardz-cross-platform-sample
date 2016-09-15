import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from '../components/dashboard/dashboard';
import {LoginComponent} from '../components/login/login';
import {NotificationsComponent} from '../components/notifications/notifications';
import {RadiusSearchComponent} from '../components/radiusSearch/radiusSearch';
import {AuthGuard} from '../guards/authGuard';

const appRoutes: Routes = [

    { path: '', name: 'Dashboard', canActivate: [AuthGuard], component: DashboardComponent },
    { path: 'login', name: 'Login', component: LoginComponent },
    { path: 'notifications', name: 'Notifications', canActivate: [AuthGuard], component: NotificationsComponent },
    //{ path: '/games/...', name: 'Games', component: GamesComponent, data: { displayName: 'Games' } },
    { path: 'radiussearch', name: 'RadiusSearch', canActivate: [AuthGuard], component: RadiusSearchComponent }
];

export const appRoutingProviders: any[] = [

    AuthGuard
];

export const APP_ROUTING: ModuleWithProviders = RouterModule.forRoot(appRoutes);

