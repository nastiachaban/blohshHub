import { Component, OnInit } from '@angular/core';
import { FavouritesService } from '../favourites.service';
import { CommonModule } from '@angular/common'; 
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

interface FavouriteSong {
  song_name: string;
  album: string;
}

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  imports: [CommonModule],
  styleUrls: ['./favourites.component.css']
})

export class FavouritesComponent implements OnInit {
  favourites:  FavouriteSong[] = [];

  private platformId = inject(PLATFORM_ID);
  constructor(private favService: FavouritesService) {}

  ngOnInit(): void {
     if (isPlatformBrowser(this.platformId)) {
    const user = localStorage.getItem('user');
    const userId = user ? JSON.parse(user).id : null;
  
    if (userId) {
      this.favService.getFavourites(userId).subscribe((res: any) => {
        this.favourites = res; 
      });
    }
    }
  }
  
  remove(songName: string) {
    if (isPlatformBrowser(this.platformId)) {
    const user = localStorage.getItem('user');
    const userId = user ? JSON.parse(user).id : null;
  
    if (userId) {
      this.favService.removeFavourite(userId, songName).subscribe(() => {
        this.favourites = this.favourites.filter(s => s.song_name !== songName);
      });
    }
  }
  }
  
}
