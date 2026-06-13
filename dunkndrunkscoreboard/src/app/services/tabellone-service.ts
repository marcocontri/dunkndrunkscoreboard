import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TabelloneService {
  // squadra CASA
  homeSquadName = signal<string>("Squadra Casa");
  homeScore = signal<number>(0);
  homeFouls = signal<number>(0);
  // squadra OSPITE
  visitorSquadName = signal<string>("Squadra Ospite");
  visitorScore = signal<number>(0);
  visitorFouls = signal<number>(0);

  isEditingHome = signal<boolean>(false);
  isEditingVisitor = signal<boolean>(false);

  // punteggio
  incrementHomeScore() {
    this.homeScore.update(v => v + 1);
  }
  decrementHomeScore() {
    if (this.homeScore() > 0)
      this.homeScore.update(v => v - 1);
  }
  incrementVisitorScore() {
    this.visitorScore.update(v => v + 1);
  }
  decrementVisitorScore() {
    if (this.visitorScore() > 0)
      this.visitorScore.update(v => v - 1);
  }


  // falli
  incrementHomeFouls() {
    if (this.homeFouls() <= 4)
      this.homeFouls.update(v => v + 1);
  }
  decrementHomeFouls() {
    if (this.homeFouls() > 0)
      this.homeFouls.update(v => v - 1);
  }
  incrementVisitorFouls() {
    if (this.visitorFouls() <= 4)
      this.visitorFouls.update(v => v + 1);
  }
  decrementVisitorFouls() {
    if (this.visitorFouls() > 0)
      this.visitorFouls.update(v => v - 1);
  }

  // reset
  resetHome() {
    this.homeSquadName.set("Squadra Casa");
    this.homeScore.set(0);
    this.homeFouls.set(0);
  }
  resetVisitor() {
    this.visitorSquadName.set("Squadra Ospite")
    this.visitorScore.set(0);
    this.visitorFouls.set(0);
  }
}
