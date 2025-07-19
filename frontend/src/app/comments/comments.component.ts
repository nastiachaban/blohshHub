import { Component, OnInit } from '@angular/core';
import { CommentsService } from './comments.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';


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

   private platformId = inject(PLATFORM_ID);

  constructor(private commentsService: CommentsService) {}

  ngOnInit(): void {6
    this.loadComments();

     if (isPlatformBrowser(this.platformId)) {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.isAdmin = user.role === 'admin';}
  }

  loadComments() {
    this.commentsService.getComments().subscribe((res) => {
      this.comments = res;
    });
  }

  postComment() {
    if (isPlatformBrowser(this.platformId)) {
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
  }

  cancel() {
    this.newComment = '';
  }

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
      const target = this.comments.find(c => c.id === commentId);
      if (target) target.content = this.editContent;
  
      this.cancelEdit();
    });
  }

  deleteComment(commentId: number) {
    if (confirm('Delete this comment?')) {
      this.commentsService.deleteComment(commentId).subscribe(() => {
  
        this.comments = this.comments.filter(c => c.id !== commentId);
      });
    }
  }
  
}
