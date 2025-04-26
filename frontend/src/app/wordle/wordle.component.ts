import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-wordle',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './wordle.component.html',
  styleUrls: ['./wordle.component.css']
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

  keyRows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫']
  ];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<string[]>('assets/words.json').subscribe(words => {
      const randomIndex = Math.floor(Math.random() * words.length);
      this.targetWord = words[randomIndex].toUpperCase();
      console.log('Target word:', this.targetWord);
    });

    const storedWins = localStorage.getItem('timesWon');
  if (storedWins) {
    this.timesWon = +storedWins;
    this.updateStatus();
  }
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
    const feedback = letters.map((letter, i) => {
      if (letter === this.targetWord[i]) return 'green';
      if (this.targetWord.includes(letter)) return 'yellow';
      return '#b3b1cc';
    });
  
    this.guesses.push({ letters, feedback });
    this.currentGuess = '';
  
    if (guess === this.targetWord) {
      this.message = 'Congrats cutie! you got it!💗';
      this.gameWon = true;
      this.timesWon++;
      localStorage.setItem('timesWon', this.timesWon.toString());
      this.updateStatus();
    } else if (this.guesses.length === this.maxGuesses) {
      this.message = `HAHA,the word was ${this.targetWord}`;
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
  
    this.http.get<string[]>('assets/words.json').subscribe(words => {
      const randomIndex = Math.floor(Math.random() * words.length);
      this.targetWord = words[randomIndex].toUpperCase();
      console.log('New target word:', this.targetWord);
    });
  }
  
  
  
}
