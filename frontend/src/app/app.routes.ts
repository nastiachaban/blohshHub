import { Routes } from '@angular/router';
import { ShowsComponent } from './shows/shows.component';
import { WordleComponent } from './wordle/wordle.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { WelcomeComponent } from './auth/welcome/welcome.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { CommentsComponent } from './comments/comments.component';



export const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'shows', component: ShowsComponent },
  { path: 'wordle', component: WordleComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'favourites', component: FavouritesComponent },
  { path: 'comments', component: CommentsComponent },
  {
    path: 'songs',
    loadComponent: () =>
      import('./songs/songs.component').then((m) => m.SongsComponent),
  }
];
