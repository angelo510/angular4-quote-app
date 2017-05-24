import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import { Movie } from './movie';

@Injectable()
export class MovieService{

    private _movieUrl = 'api/movies/movies.json';

    constructor(private _http : Http){

    }

    getMovies() : Observable<Movie[]> {
        return this._http.get(this._movieUrl).map((response : Response) => <Movie[]> response.json()).do(data=>console.log
        ("All: "+ JSON.stringify(data))).catch(this.handleError);
    }

    getMovie(id: number): Observable<Movie> {
        return this.getMovies()
            .map((movies: Movie[]) => movies.find(m => m.movieId === id));
    }

    private handleError(error : Response){
        console.log(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}