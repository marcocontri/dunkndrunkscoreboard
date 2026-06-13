import { Component } from '@angular/core';
import { HomeComponent } from '../home-component/home-component';
import { VisitorComponent } from '../visitor-component/visitor-component';
import { TimerComponent } from '../timer-component/timer-component';

@Component({
  selector: 'app-dashboard-component',
  imports: [HomeComponent, VisitorComponent, TimerComponent],
  templateUrl: './dashboard-component.html',
  styleUrl: './dashboard-component.css',
})
export class DashboardComponent {}
