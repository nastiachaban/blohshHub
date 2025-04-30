import { Component, inject } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoggedIn = false;
  showNavbar = true;
  platformId = inject(PLATFORM_ID);
  router = inject(Router);
  title: any;

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.isLoggedIn = !!localStorage.getItem('user');

      const user = localStorage.getItem('user');
      console.log('🔐 Logged-in user:', user); 

      this.router.events
        .pipe(filter(e => e instanceof NavigationEnd))
        .subscribe((event: any) => {
          const url = event.urlAfterRedirects || event.url;
          this.showNavbar = !(url.includes('/login') || url.includes('/signup') || url === '/');
        });
    }
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('user');
    }
    this.isLoggedIn = false;
    this.router.navigate(['/']);
  }
  
}
