import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../core/components/header/header.component';
import { BannerComponent } from '../../core/components/banner/banner.component';
import { MovieService } from '../../shared/services/movie.service';
import { Observable, forkJoin, map, tap } from 'rxjs';
import { MovieCarouselComponent } from '../../shared/components/movie-carousel/movie-carousel.component';
import { IVideoContent } from '../../shared/models/video-content.interface';

@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [CommonModule, HeaderComponent, BannerComponent, MovieCarouselComponent],
  templateUrl: './browse.component.html',
  styleUrl: './browse.component.css'
})
export class BrowseComponent implements OnInit {
  auth = inject(AuthService);
  movieService = inject(MovieService);

  name = JSON.parse(sessionStorage.getItem('loggedInUser')!).name;
  email = JSON.parse(sessionStorage.getItem('loggedInUser')!).email;

  bannerDetail$ = new Observable<any>();
  bannerVideo$ = new Observable<any>();

  movies: IVideoContent[] = [];
  tvShows: IVideoContent[] = [];
  ratedMovies: IVideoContent[] = [];
  nowPlayingMovies: IVideoContent[] = [];
  popularMovies: IVideoContent[] = [];
  topRatedMovies: IVideoContent[] = [];
  upcomingMovies: IVideoContent[] = [];

  sources = [
    this.movieService.getMovies(),
    this.movieService.getTvShows(),
    this.movieService.getNowPlayingMovies(),
    this.movieService.getUpcomingMovies(),
    this.movieService.getPopularMovies(),
    this.movieService.getTopRated()
  ];

  ngOnInit(): void {
    forkJoin(this.sources)
    .pipe(
      map(([movies, tvShows, nowPlaying, upcoming, popular, topRated])=>{
        this.bannerDetail$ = this.movieService.getBannerDetail(movies.results[0].id);
        this.bannerVideo$ = this.movieService.getBannerVideo(movies.results[0].id);
        return {movies, tvShows, nowPlaying, upcoming, popular, topRated}
      })
    ).subscribe((res:any)=>{
      console.log(res);
      this.movies = res.movies.results as IVideoContent[];
      this.tvShows = res.tvShows.results as IVideoContent[];
      this.nowPlayingMovies = res.nowPlaying.results as IVideoContent[];
      this.upcomingMovies = res.upcoming.results as IVideoContent[];
      this.popularMovies = res.popular.results as IVideoContent[];
      this.topRatedMovies = res.topRated.results as IVideoContent[];

    })
  }

  signOut() {
    sessionStorage.removeItem('loggedInUser');
    this.auth.signOut();
  }

  getMovieKey() {
    this.movieService.getBannerVideo(this.movies[0].id)
    .subscribe(res=>{
      console.log(res);
    })
  }
}
