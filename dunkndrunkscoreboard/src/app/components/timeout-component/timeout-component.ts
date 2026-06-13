import { Component, inject } from '@angular/core';
import { SponsorComponent } from "../sponsor-component/sponsor-component";
import { TimerService } from '../../services/timer-service';
import { TabelloneService } from '../../services/tabellone-service';

@Component({
  selector: 'timeout-component',
  imports: [SponsorComponent],
  templateUrl: './timeout-component.html',
  styleUrl: './timeout-component.css',
})
export class TimeoutComponent {
  private tabelloneService = inject(TabelloneService)
  private timerService = inject(TimerService)

  homeName = this.tabelloneService.homeSquadName
  homeScore = this.tabelloneService.homeScore
  homeFouls = this.tabelloneService.homeFouls
  
  visitorName = this.tabelloneService.visitorSquadName
  visitorScore = this.tabelloneService.visitorScore
  visitorFouls = this.tabelloneService.visitorFouls

  minLeft = this.timerService.minutes
  secLeft = this.timerService.seconds
  decLeft = this.timerService.decimals
}
