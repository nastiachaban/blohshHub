import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // ✅
import { CommonModule } from '@angular/common'; // optional, for *ngIf etc

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [RouterModule, CommonModule], // ✅ must include RouterModule
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {}
