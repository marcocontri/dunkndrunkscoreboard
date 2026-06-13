import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'sponsor-component',
  imports: [RouterLink, CommonModule],
  templateUrl: './sponsor-component.html',
  styleUrl: './sponsor-component.css',
})
export class SponsorComponent {
  sponsors: string[] = [];
  currentImage = signal<string>('');
  currentIndex: number = 0;
  private timerSubscription?: Subscription;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Legge il file JSON che hai creato manualmente nella cartella public
    this.http.get<string[]>('sponsors.json').subscribe({
      next: (data) => {
        this.sponsors = data;
        
        // Verifica che il JSON non sia vuoto
        if (this.sponsors.length > 0) {
          this.setCurrentImage();
          this.startCarousel();
        }
      },
      error: (err) => {
        console.error('Errore: controlla che il file public/sponsors.json esista e sia scritto correttamente.', err);
      }
    });
  }

  startCarousel(): void {
    this.timerSubscription = interval(2000).subscribe(() => {
      // Incrementa l'indice. Il simbolo '%' (modulo) fa sì che dopo l'ultima immagine si ricominci da 0
      this.currentIndex = (this.currentIndex + 1) % this.sponsors.length;
      this.setCurrentImage();
    });
  }

  setCurrentImage(): void {
    const path = `/images/sponsors/${this.sponsors[this.currentIndex]}`;
    this.currentImage.set(path);
    console.log(path)
  }

  ngOnDestroy(): void {
    // Fondamentale: spegne il timer quando l'utente cambia pagina per evitare spreco di memoria/CPU
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }
}
