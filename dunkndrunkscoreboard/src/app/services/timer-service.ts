import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  totalMs = signal<number>(0)
  
  minutes = computed(() => Math.floor(this.totalMs() / 60000))
  seconds = computed(() => Math.floor(this.totalMs() % 60000 / 1000))
  decimals = computed(() => Math.floor(this.totalMs() % 1000 / 100))
}
