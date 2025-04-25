import { Component, OnInit } from '@angular/core';
import { CommentsService } from './comments.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  comments: any[] = [];
  newComment: string = '';

  constructor(private commentsService: CommentsService) {}

  ngOnInit(): void {
    this.loadComments();
  }

  loadComments() {
    this.commentsService.getComments().subscribe((res) => {
      this.comments = res;
    });
  }

  postComment() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!this.newComment.trim()) return;

    this.commentsService.postComment({
      user_id: user.id,
      username: user.username,
      content: this.newComment.trim()
    }).subscribe(() => {
      this.newComment = '';
      this.loadComments();
    });
  }

  cancel() {
    this.newComment = '';
  }
}
