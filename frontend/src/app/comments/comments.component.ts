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
  editingCommentId: number | null = null;
  editContent: string = '';
  isAdmin: boolean = false;

  constructor(private commentsService: CommentsService) {}

  ngOnInit(): void {
    this.loadComments();

    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.isAdmin = user.role === 'admin'; // check user role
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

  // Admin-only methods
  startEdit(comment: any) {
    this.editingCommentId = comment.id;
    this.editContent = comment.content;
  }

  cancelEdit() {
    this.editingCommentId = null;
    this.editContent = '';
  }

  saveEdit(commentId: number) {
    if (!this.editContent.trim()) return;
  
    this.commentsService.updateComment(commentId, {
      content: this.editContent.trim()
    }).subscribe(() => {
      // find the comment and update its content
      const comment = this.comments.find(c => c.id === commentId);
      if (comment) {
        comment.content = this.editContent.trim();
      }
  
      this.cancelEdit(); // close edit mode
    });
  }
  
  

  deleteComment(commentId: number) {
    if (confirm('Delete this comment?')) {
      this.commentsService.deleteComment(commentId).subscribe(() => {
        // Instantly remove the comment from UI
        this.comments = this.comments.filter(c => c.id !== commentId);
      });
    }
  }
  
}
