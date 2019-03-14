import { Component } from '@angular/core';
import { MoviesService } from './../../providers/movies.service';
import { map, catchError } from 'rxjs/operators';
import { empty, Observable, Subscription } from 'rxjs';
import { Network } from '@ionic-native/network/ngx';
import Results from 'src/app/modals/characters.modal';

@Component({
  selector: 'app-movies',
  templateUrl: 'movies.page.html',
  styleUrls: ['movies.page.scss']
})
export class MoviesPage {

  private onConnect: Subscription;
  private onDisconnect: Subscription;
  private onMovies: Subscription;

  public results = [];
  private page = 1;
  private total: number;

  constructor (private moviesService: MoviesService
    , private network: Network) {

  }

    // ionViewWillEnter() {

    //   this.onGetMovies();

    //   this.onDisconnect = this.network.onDisconnect().subscribe(() => {
    //     console.log('Disconnected');
    //   });

    //   // this.onConnect = this.network.onConnect().subscribe(() => {
    //   //   this.onGetMovies();
    //   // });
    // }

    // ionViewWillLeave() {
    //   this.onMovies.unsubscribe();
    //   // this.onConnect.unsubscribe();
    //   this.onDisconnect.unsubscribe();
    // }

    // public loadData(event: any) {
    //   this.page += this.page;
    //   this.onGetMovies();

    //   console.log(this.results.length, this.total);

    //   if (this.results.length === this.total) {
    //     event.target.disabled = true;
    //   }
    // }

    // public onGetMovies() {
    //   this.onMovies = this.moviesService.getMovies(this.page).pipe (
    //     map( data => {
    //       this.total = data.total;
    //       this.results = this.results.concat(  data.results );
    //       console.log(this.results);
    //   })
    //   ).subscribe();
    // }
}
