import { Component, inject } from '@angular/core';
import { TabelloneService } from '../../services/tabellone-service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'visitor-component',
  imports: [RouterLink],
  templateUrl: './visitor-component.html',
  styleUrl: './visitor-component.css',
})
export class VisitorComponent {
  private tabelloneService = inject(TabelloneService)

  visitorScore = this.tabelloneService.visitorScore
  visitorFouls = this.tabelloneService.visitorFouls
  get visitorSquadName() { 
    return this.tabelloneService.visitorSquadName()
  }

  get isEditing() {
    return this.tabelloneService.isEditingVisitor()
  }

  incrementVisitorScore() { this.tabelloneService.incrementVisitorScore() }
  decrementVisitorScore() { this.tabelloneService.decrementVisitorScore() }
  incrementVisitorFouls() { this.tabelloneService.incrementVisitorFouls() }
  decrementVisitorFouls() { this.tabelloneService.decrementVisitorFouls() }
  modifyVisitorName() { this.tabelloneService.isEditingVisitor.set(true) }
  saveNameSquad(newName: string) {
    if (newName.trim())
      this.tabelloneService.visitorSquadName.set(newName)
    this.tabelloneService.isEditingVisitor.set(false)
  }
  resetVisitor() { this.tabelloneService.resetVisitor()}
}
