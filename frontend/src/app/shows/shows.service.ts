import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Show } from './show.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShowsService {
  private apiUrl = 'http://localhost:3010/api/shows';

  constructor(private http: HttpClient) {}

  getShows(): Observable<Show[]> {
    return this.http.get<Show[]>(this.apiUrl);
  }
}
