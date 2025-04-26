import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FavouritesService {
  private baseUrl = 'http://localhost:3010/api/favourites';

  constructor(private http: HttpClient) {}

  getFavourites(userId: number) {
    return this.http.get(`${this.baseUrl}/${userId}`);
  }
  
  addFavourite(userId: number, songName: string) {
    return this.http.post(
      `/api/favourites/${userId}`,
      { song_name: songName }, 
      {
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
  
  removeFavourite(userId: number, songName: string) {
    return this.http.delete(`${this.baseUrl}/${userId}/${encodeURIComponent(songName)}`);
  }
  
  
  }

