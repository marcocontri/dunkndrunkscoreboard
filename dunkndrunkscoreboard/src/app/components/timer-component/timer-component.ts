import { Component, HostListener, inject, signal } from '@angular/core';
import { TimerService } from '../../services/timer-service';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'timer-component',
  imports: [DecimalPipe],
  templateUrl: './timer-component.html',
  styleUrl: './timer-component.css',
})
export class TimerComponent {
  // stato timer
  totalMs = signal<number>(0)
  isRunning = signal<boolean>(false)
  isEditing = signal<boolean>(false)

  // campi input per utente
  inputMin = 0
  inputSec = 0
  inputDec = 0

  private timerId: any = null
  private lastTimestamp: number = 0

  private timerService = inject(TimerService)

  minutes = this.timerService.minutes
  seconds = this.timerService.seconds
  decimals = this.timerService.decimals

  updateMinutes(event: Event) {
    const target = event.target as HTMLInputElement;
    this.inputMin = Number(target.value);
  }

  updateSeconds(event: Event) {
    const target = event.target as HTMLInputElement;
    this.inputSec = Number(target.value);
  }

  updateDecimals(event: Event) {
    const target = event.target as HTMLInputElement;
    this.inputDec = Number(target.value);
  }

  // ascolto tasto 'Spazio'
  @HostListener('window:keydown.esc', ['$event'])
  handleSpaceBar(event: Event) {
    event.preventDefault()

    if (this.isEditing())
      return

    this.toggleTimer()
  }

  toggleTimer() {
    if (this.isRunning()) {
      this.stop()
    } else {
      this.start()
    }
  }

  start() {
    if (this.timerService.totalMs() <= 0)
      return

    this.isRunning.set(true)
    this.lastTimestamp = performance.now()

    // aggiornamento ogni 10 ms
    this.timerId = setInterval(() => {
      const now = performance.now()
      const delta = now - this.lastTimestamp
      this.lastTimestamp = now

      const newMs = Math.max(0, this.timerService.totalMs() - delta)
      this.timerService.totalMs.set(newMs)

      if (newMs === 0) {
        this.stop()
        this.playBuzzer() // per far suonare la sirena
      }
    }, 10)
  }

  stop() {
    this.isRunning.set(false)
    if (this.timerId) {
      clearInterval(this.timerId)
      this.timerId = null
    }
  }

  ngOnDestroy(){
    this.stop()
  }

  playBuzzer() {
    // alert("fine tempo!")
    const audio = new Audio()
    // audio.src = "sounds/mega-horn.mp3"
    audio.src = "sounds/end-of-quarter-horn.mp3"
    audio.load()
    audio.play()
  }

  enableEdit() {
    this.stop()
    this.inputMin = this.minutes()
    this.inputSec = this.seconds()
    this.inputDec = this.decimals()
    this.isEditing.set(true)
  }

  saveTime() {
    const msFromMinutes = (this.inputMin || 0) * 60 * 1000
    const msFromSeconds = (this.inputSec || 0) * 1000
    const msFromDecimals = (this.inputDec || 0) * 100

    this.timerService.totalMs.set(msFromMinutes + msFromSeconds + msFromDecimals)

    this.isEditing.set(false)
  }

  cancelEdit() {
    this.isEditing.set(false)
  }
}
