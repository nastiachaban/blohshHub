import { Component, OnInit } from '@angular/core';
import { ShowsService } from './shows.service';
import { Show } from './show.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shows',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shows.component.html',
  styleUrls: ['./shows.component.css']
})
export class ShowsComponent implements OnInit {
  nextShow?: Show;
  countdownText = '';

  constructor(private showsService: ShowsService) {}

  ngOnInit(): void {
    this.showsService.getShows().subscribe(shows => {
      const now = new Date();
      const upcoming = shows
        .map(show => ({ ...show, date: new Date(show.date) }))
        .filter(show => show.date > now)
        .sort((a, b) => +a.date - +b.date)[0];

      if (upcoming) {
        this.nextShow = upcoming;

        const diff = +upcoming.date - +now;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        this.countdownText = `${days} days, ${hours} hours, ${minutes} minutes`;
      }
    });
  }
}
