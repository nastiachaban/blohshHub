import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Song {
  id: number;
  title: string;
  album: string;
  track_number: number;
  favourited?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class SongsService {
  private apiUrl = 'http://localhost:5229/api/songs';

  constructor(private http: HttpClient) {}

  getAllSongs(): Observable<Song[]> {
    return this.http.get<Song[]>(this.apiUrl);
  }

  getSongsByAlbum(album: string): Observable<Song[]> {
    return this.http.get<Song[]>(`${this.apiUrl}?album=${encodeURIComponent(album)}`);
  }
}
