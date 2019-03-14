import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Network } from '@ionic-native/network/ngx';
import { HttpService } from 'src/app/providers/http.service';
import { map } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {

  @Input() url: string;

  private onConnect: Subscription;
  private onDisconnect: Subscription;
  private onData: Subscription;

  public results = [];
  private page = 1;
  private total: number;
  public loading = true;

  constructor (private httpService: HttpService
    , private network: Network
    , private alertController: AlertController
    , private router: Router) {

  }

  ngOnInit(): void {

      this.onGetMovies();

      this.onDisconnect = this.network.onDisconnect().subscribe(() => {
        this.presentAlert();
      });

       this.onConnect = this.network.onConnect().subscribe(() => {
         this.onGetMovies();
       });
    }

    async presentAlert() {
      const alert = await this.alertController.create({
        header: 'Connection',
        subHeader: 'Not Connection',
        message: 'Plase, connect internet.',
        buttons: ['OK']
      });
  
      await alert.present();
    }

    ionViewWillLeave() {
      this.onData.unsubscribe();
      this.onConnect.unsubscribe();
      this.onDisconnect.unsubscribe();
    }

    public loadData(event: any) {
      this.page += this.page;
      this.onGetMovies();
      event.target.complete();

      if (this.results.length === this.total) {
        event.target.disabled = true;
      }
    }

    public onGetMovies() {
      this.onData = this.httpService.get(`${this.url}?offset=${this.page}&`).pipe (
        map( data => {
          this.total = data.total;
          this.results = this.results.concat(  data.results );
          this.loading = !this.loading;
      })
      ).subscribe();
    }

    public onGoToDetails(id: number): void {
      this.router.navigate([`details/${this.url}/${id}`]);
    }

}
