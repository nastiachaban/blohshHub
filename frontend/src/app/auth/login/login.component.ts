import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // ✅ Import this
import { AuthService } from '../auth.service';
import { Router } from '@angular/router'; 
import { RouterModule } from '@angular/router';


@Component({
  standalone: true,
  selector: 'app-login',
  imports: [FormsModule, RouterModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private auth: AuthService,  private router: Router) {}

  login() {
    this.auth.login(this.username, this.password).subscribe({
      next: (res) => {
        localStorage.setItem('user', JSON.stringify(res));
        localStorage.setItem('username', res.username);

        this.router.navigate(['/shows']).then(() => {
          window.location.reload();
        });
      },
      error: (err) => alert('Login failed: ' + err.error.message)
    });
  }
    
    
    
  }

