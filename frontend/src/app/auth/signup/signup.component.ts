import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // ✅
import { AuthService } from '../auth.service';
import { Router } from '@angular/router'; 
import { RouterModule } from '@angular/router';


@Component({
  standalone: true,
  selector: 'app-signup',
  imports: [FormsModule, RouterModule], // ✅ Add it here too
  templateUrl: './signup.component.html'
})
export class SignupComponent {
  username = '';
  password = '';
  repeatPassword = '';

  constructor(private auth: AuthService,  private router: Router) {
    
  }

  signup() {
    if (this.password !== this.repeatPassword) {
      alert("Passwords don't match");
      return;
    }
  
    this.auth.signup(this.username, this.password).subscribe({
      next: (res) => {
        
        this.router.navigate(['/login']); // Redirect after signup
      },
      error: (err) => alert('Signup failed: ' + err.error.message)
    });
  }
  
}
