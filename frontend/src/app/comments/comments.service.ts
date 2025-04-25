import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  constructor(private http: HttpClient) {}

  getComments() {
    return this.http.get<any[]>('/api/comments');
  }

  postComment(comment: { user_id: number; username: string; content: string }) {
    return this.http.post('/api/comments', comment);
  }

  updateComment(id: number, body: { content: string }) {
    return this.http.put(`/api/comments/${id}`, body);
  }  
  
  deleteComment(id: number) {
    return this.http.delete(`/api/comments/${id}`);
  }
  
}
