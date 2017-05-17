import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Subscription }       from 'rxjs/Subscription';

import { Movie } from './movie';
import { MovieService } from './movie.service';

@Component({
    templateUrl: 'app/movies/movie-detail.component.html'
})
export class MovieDetailComponent implements OnInit, OnDestroy {
    pageTitle: string = 'Movie Detail';
    movie: Movie;
    errorMessage: string;
    private sub: Subscription;

    constructor(private _route: ActivatedRoute,
                private _router: Router,
                private _movieService: MovieService) {
    }

    ngOnInit(): void {
        this.sub = this._route.params.subscribe(
            params => {
                let id = +params['id'];
                this.getMovie(id);
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    getMovie(id: number) {
        this._movieService.getMovie(id).subscribe(
            movie => this.movie = movie,
            error => this.errorMessage = <any>error);
    }

    onBack(): void {
        this._router.navigate(['/movies']);
    }

    onRatingClicked(message: string): void {
        this.pageTitle = 'Movie Detail: ' + message;
    }
}
