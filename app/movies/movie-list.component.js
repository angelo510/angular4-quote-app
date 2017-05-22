"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var movie_service_1 = require("./movie.service");
var MovieListComponent = (function () {
    function MovieListComponent(_movieService) {
        this._movieService = _movieService;
        this.pageTitle = 'Movie List';
        this.imageWidth = 50;
        this.imageMargin = 2;
        this.showImage = false;
    }
    MovieListComponent.prototype.toggleImage = function () {
        this.showImage = !this.showImage;
    };
    MovieListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._movieService.getMovies().subscribe(function (movies) { return _this.movies = movies; }, function (error) { return _this.errorMessage = error; });
        console.log("In OnInit");
    };
    MovieListComponent.prototype.onRatingClicked = function (message) {
        this.pageTitle = 'Movie List : ' + message;
    };
    return MovieListComponent;
}());
MovieListComponent = __decorate([
    core_1.Component({
        selector: 'pm-movies',
        moduleId: module.id,
        templateUrl: 'movie-list.component.html',
        styleUrls: ['movie-list.component.css']
    }),
    __metadata("design:paramtypes", [movie_service_1.MovieService])
], MovieListComponent);
exports.MovieListComponent = MovieListComponent;
//# sourceMappingURL=movie-list.component.js.map