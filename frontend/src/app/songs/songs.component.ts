import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SongsService, Song } from './songs.service';
import { FavouritesService } from '../favourites.service';

@Component({
  selector: 'app-songs',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.css']
})

export class SongsComponent implements OnInit {
  songs: Song[] = [];
  favouritedSongs: string[] = [];
  isBrowser = false;

  albums = [
    {
      name: 'When We All Fall Asleep, Where Do We Go?',
      image: 'assets/covers/wwafawdwg.png',
      detailImages: [
        'assets/details/w1.png',
        'assets/details/w2.png',
        'assets/details/w3.png'
      ],
      color: '#ffffff',
      textColor: '#000000',
      borderColor: '#000000'
    },
    {
      name: 'Happier Than Ever',
      image: 'assets/covers/happier.png',
      detailImages: [
        'assets/details/h1.png',
        'assets/details/h2.png',
        'assets/details/h4.png'
      ],
      color: '#c49a6c',
      textColor: '#000000',
      borderColor: '#a87e52'
    },
    {
      name: 'Hit Me Hard and Soft',
      image: 'assets/covers/hardsoft.png',
      detailImages: [
        'assets/details/s1.png',
        'assets/details/s2.png',
        'assets/details/s3.png'
      ],
      color: '#002c47',
      textColor: '#ffffff',
      borderColor: '#063754'
    }
  ];

  selectedAlbum = this.albums[0].name;

  constructor(
    private songsService: SongsService,
    private favService: FavouritesService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.fetchFavourites();
  }

  loadSongs(albumName: string): void {
    this.selectedAlbum = albumName;
    console.log('🎯 Album name being loaded:', albumName);
  
    this.songsService.getSongsByAlbum(albumName).subscribe((data) => {
      console.log('🎵 Response from API:', data);
  
      this.songs = data.map((song: any) => ({
        ...song,
        favourited: this.favouritedSongs.includes(song.title)
      }));
    });
  }
  
  
  fetchFavourites(): void {
    if (!this.isBrowser) return;

    const user = localStorage.getItem('user');
    const userId = user ? JSON.parse(user).id : null;
  
    if (userId) {
      this.favService.getFavourites(userId).subscribe({
        next: (res: any) => {
          this.favouritedSongs = res.map((f: any) => f.song_name);
          this.loadSongs(this.selectedAlbum);
        },
        error: (err) => {
          console.warn('No favourites found or failed to load favourites:', err);
          this.favouritedSongs = [];
          this.loadSongs(this.selectedAlbum); 
        }
      });
    } else {
      this.loadSongs(this.selectedAlbum); 
    }
  }
  

  toggleFavourite(song: any): void {
     if (!this.isBrowser) return;
     
    const user = localStorage.getItem('user');
    const userId = user ? JSON.parse(user).id : null;
    if (!userId) return;
  
    song.favourited = true;
    this.favouritedSongs.push(song.title);
  
    this.favService.addFavourite(userId, song.title).subscribe({
      next: () => {
        console.log(' Added to favourites:', song.title);
      },
      error: () => {
        song.favourited = false;
        this.favouritedSongs = this.favouritedSongs.filter(s => s !== song.title);
      }
    });
  }
  
  
  
  isFavourite(song: string): boolean {
    return this.favouritedSongs.includes(song);
  }

  get selectedAlbumObj() {
    return this.albums.find((a) => a.name === this.selectedAlbum);
  }
}
