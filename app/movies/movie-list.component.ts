import { Component, OnInit } from '@angular/core'

import { Movie } from './movie';
import { MovieService } from './movie.service';

@Component({
	selector: 'pm-movies',
	moduleId : module.id,
	templateUrl : 'movie-list.component.html',
	styleUrls : ['movie-list.component.css']
})

export class MovieListComponent implements OnInit{
	pageTitle : string = 'Movie List';
	imageWidth : number = 50;
	imageMargin : number = 2;
	showImage : boolean = false;
	listFilter : string;
	errorMessage : any;
	movies : Movie[];

    constructor(private _movieService : MovieService) {
    }

	toggleImage() : void {
		this.showImage = !this.showImage;
	}

	ngOnInit() : void{
        this._movieService.getMovies().subscribe(movies => this.movies = movies, error => this.errorMessage = <any>error);
		console.log("In OnInit");
	}

    onRatingClicked(message : string) : void{
        this.pageTitle = 'Movie List : ' + message;
    }
    
}