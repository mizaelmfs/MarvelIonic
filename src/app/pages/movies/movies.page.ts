import { Component } from '@angular/core';
import { MoviesService } from './../../providers/movies.service';
import { map, catchError } from 'rxjs/operators';
import { empty, Observable, Subscription } from 'rxjs';
import { Network } from '@ionic-native/network/ngx';
import Movies from './../../modals/movies.modal';

@Component({
  selector: 'app-movies',
  templateUrl: 'movies.page.html',
  styleUrls: ['movies.page.scss']
})
export class MoviesPage {

  private onConnect: Subscription
  private onDisconnect: Subscription
  private onMovies: Subscription

  constructor (private moviesService: MoviesService, 
    private network: Network) {

  }

    ionViewWillEnter(){

      this.onGetMovies();

      this.onDisconnect = this.network.onDisconnect().subscribe(() => {
        console.log("Disconnected");
      });
      
      this.onConnect = this.network.onConnect().subscribe(() => {
        this.onGetMovies();
      });
    }

    ionViewWillLeave() {
      this.onMovies.unsubscribe();
      this.onConnect.unsubscribe();
      this.onDisconnect.unsubscribe();
    }

    onGetMovies() {
      this.onMovies = this.moviesService.getMovies().pipe (
        map( data => {
         console.log(data)
      })
      ).subscribe();
    }
}