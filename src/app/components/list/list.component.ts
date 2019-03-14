import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Network } from '@ionic-native/network/ngx';
import { MoviesService } from 'src/app/providers/movies.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {

  @Input() url: string;

  private onConnect: Subscription;
  private onDisconnect: Subscription;
  private onMovies: Subscription;

  public results = [];
  private page = 1;
  private total: number;

  constructor (private moviesService: MoviesService
    , private network: Network) {

  }

  ngOnInit(): void {

      this.onGetMovies();

      this.onDisconnect = this.network.onDisconnect().subscribe(() => {
        console.log('Disconnected');
      });

      // this.onConnect = this.network.onConnect().subscribe(() => {
      //   this.onGetMovies();
      // });
    }

    ionViewWillLeave() {
      this.onMovies.unsubscribe();
      // this.onConnect.unsubscribe();
      this.onDisconnect.unsubscribe();
    }

    public loadData(event: any) {
      this.page += this.page;
      this.onGetMovies();

      console.log(this.results.length, this.total);

      if (this.results.length === this.total) {
        event.target.disabled = true;
      }
    }

    public onGetMovies() {
      this.onMovies = this.moviesService.getMovies(`${this.url}${this.page}`).pipe (
        map( data => {
          this.total = data.total;
          this.results = this.results.concat(  data.results );
          console.log(this.results);
      })
      ).subscribe();
    }

}
