import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard-component/dashboard-component';
import { TimeoutComponent } from './components/timeout-component/timeout-component';

export const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'timeout', component: TimeoutComponent }
];
