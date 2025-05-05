import { Component, OnInit, Inject, PLATFORM_ID  } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import confetti from 'canvas-confetti';



@Component({
  selector: 'app-wordle',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './wordle.component.html',
  styleUrls: ['./wordle.component.css'],
  
})
export class WordleComponent implements OnInit {
  targetWord = '';
  currentGuess = '';
  guesses: { letters: string[], feedback: string[] }[] = [];
  message = '';
  maxGuesses = 6;
  gameLost = false;
  gameWon = false;
  timesWon: number = 0;
  status: string = 'Newbie';
  winsToNextStatus: number = 5;

  letterStatuses: { [key: string]: string } = {};

  keyRows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫']
  ];

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

 ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const username = localStorage.getItem('username');
      if (!username) {
        console.error('No user logged in!');
        return;
      }

      this.loadWordleStats();

      this.http.get<string[]>('assets/words.json').subscribe(words => {
        const randomIndex = Math.floor(Math.random() * words.length);
        this.targetWord = words[randomIndex].toUpperCase();
      });
    }
  }
  

  loadWordleStats(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const username = localStorage.getItem('username');
    if (!username) {
      console.error('No user found in localStorage!');
      return;
    }

    this.http.get<{ wordleWins: number, userRank: string }>(`/api/users/stats/${username}`)
      .subscribe(data => {
        this.timesWon = data.wordleWins;
        this.status = data.userRank;
        this.updateStatus();
      }, error => {
        console.error('Failed to load stats', error);
      });
  }
  

  handleKey(key: string): void {
    if (this.message) return;
    if (key === 'ENTER') {
      if (this.currentGuess.length === 5) {
        this.submitGuess();
      }
    } else if (key === '⌫') {
      this.currentGuess = this.currentGuess.slice(0, -1);
    } else if (this.currentGuess.length < 5) {
      this.currentGuess += key;
    }
  }

  submitGuess(): void {
    const guess = this.currentGuess.toUpperCase();
    const letters = guess.split('');
    const feedback = Array(5).fill('#b3b1cc');
    const targetLetters = this.targetWord.split('');
  
    const targetLetterCounts: { [key: string]: number } = {};
  
    for (let i = 0; i < 5; i++) {
      if (letters[i] === targetLetters[i]) {
        feedback[i] = 'green';
      } else {
        const letter = targetLetters[i];
        targetLetterCounts[letter] = (targetLetterCounts[letter] || 0) + 1;
      }
    }
  
    for (let i = 0; i < 5; i++) {
      if (feedback[i] === 'green') continue;
  
      const letter = letters[i];
      if (targetLetterCounts[letter]) {
        feedback[i] = 'yellow';
        targetLetterCounts[letter]--;
      }
    }
  
    this.guesses.push({ letters, feedback });
    this.currentGuess = '';

    for (let i = 0; i < 5; i++) {
      const letter = letters[i];
      const feedbackColor = feedback[i];
      const currentStatus = this.letterStatuses[letter];
    
      if (feedbackColor === 'green') {
        this.letterStatuses[letter] = 'green';
      } else if (feedbackColor === 'yellow') {
        if (currentStatus !== 'green') {
          this.letterStatuses[letter] = 'yellow';
        }
      } else {
        if (!currentStatus) {
          this.letterStatuses[letter] = 'gray';
        }
      }
    }
  
    if (guess === this.targetWord) {
      this.message = 'Congrats cutie! you got it!💗';
      this.gameWon = true;
      confetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.7 },
        colors: ['#ff69b4', '#ffb6c1', '#ffc0cb']
      });
  
      if (isPlatformBrowser(this.platformId)) {
        const username = localStorage.getItem('username');
        this.http.post('/api/users/win', { username }).subscribe({
          next: () => {
            this.timesWon++;
            this.updateStatus();
          },
          error: (err) => {
            console.error('Failed to save win', err);
          }
        });
      }
    } else if (this.guesses.length === this.maxGuesses) {
      this.message = `HAHA, the word was ${this.targetWord}`;
      this.gameLost = true;
    }
  }
  

  updateStatus(): void {
    if (this.timesWon >= 150) {
      this.status = 'Legend';
      this.winsToNextStatus = 0;
    } else if (this.timesWon >= 100) {
      this.status = 'Master';
      this.winsToNextStatus = 150 - this.timesWon;
    } else if (this.timesWon >= 50) {
      this.status = 'Expert';
      this.winsToNextStatus = 100 - this.timesWon;
    } else if (this.timesWon >= 30) {
      this.status = 'Pro';
      this.winsToNextStatus = 50 - this.timesWon;
    } else if (this.timesWon >= 15) {
      this.status = 'Intermediate';
      this.winsToNextStatus = 30 - this.timesWon;
    } else if (this.timesWon >= 5) {
      this.status = 'Beginner';
      this.winsToNextStatus = 15 - this.timesWon;
    } else {
      this.status = 'Newbie';
      this.winsToNextStatus = 5 - this.timesWon;
    }
  }

  getColor(color: string): string {
    switch (color) {
      case 'green': return '#6aaa64';
      case 'yellow': return '#c9b458';
      case 'gray': return '#b3b1cc';
      default: return '#b3b1cc';
    }
  }

  get displayRows() {
    const rows = [...this.guesses];
    if (this.guesses.length < this.maxGuesses) {
      const paddedLetters = this.currentGuess.padEnd(5).split('');
      rows.push({ letters: paddedLetters, feedback: Array(5).fill('') });
    }
    while (rows.length < this.maxGuesses) {
      rows.push({ letters: Array(5).fill(''), feedback: Array(5).fill('') });
    }
    return rows;
  }

  resetGame(): void {
    this.guesses = [];
    this.currentGuess = '';
    this.message = '';
    this.gameLost = false;
    this.gameWon = false;

    this.letterStatuses = {}; 
    
    this.http.get<string[]>('assets/words.json').subscribe(words => {
      const randomIndex = Math.floor(Math.random() * words.length);
      this.targetWord = words[randomIndex].toUpperCase();
    });
  }
}
