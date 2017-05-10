import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent }  from './app.component';
import { WelcomeComponent }  from './home/welcome.component';
import { MovieListComponent }  from './movies/movie-list.component';
import { MovieDetailGuard }  from './movies/movie-guard.service';
import { MovieFilterPipe }  from './movies/movie-filter.pipe';
import { StarComponent }  from './shared/star.component';
import { MovieDetailComponent }  from './movies/movie-detail.component';


@NgModule({
  imports: [ 
    BrowserModule, 
    FormsModule, 
    HttpModule, 
    RouterModule.forRoot([
      {path: 'movies', component: MovieListComponent},
      {path: 'movie/:id', component: MovieDetailComponent, canActivate : [MovieDetailGuard]},
      {path: 'welcome', component: WelcomeComponent},
      {path: '', redirectTo:'welcome' , pathMatch: 'full'},
      {path: '**', redirectTo:'welcome' , pathMatch: 'full'}
    ])
  ],
  declarations: [ 
    AppComponent, 
    MovieListComponent, 
    MovieFilterPipe, 
    StarComponent, 
    WelcomeComponent, 
    MovieDetailComponent 
    ],
  providers: [ MovieDetailGuard ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }