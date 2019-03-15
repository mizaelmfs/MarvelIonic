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
  private page = 0;
  private keys: string
  private total: number;

  // flags
  public loading = true;
  private flagSearch = false;
 
  constructor(private httpService: HttpService
    , private network: Network
    , private alertController: AlertController
    , private router: Router) {

  }

  ngOnInit(): void {

    this.onSeries(undefined);

    this.onDisconnect = this.network.onDisconnect().subscribe(() => {
      this.presentAlert();
    });

    this.onConnect = this.network.onConnect().subscribe(() => {
      this.onSeries(undefined);
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
    this.page = this.page +1;

    if (this.results.length === this.total) {
      event.target.disabled = true;
      return;
    }

    this.onSeries(event);
  }

  private onSeries(event: any) {
    
    if ( this.flagSearch ) {
      this.url == 'characters' ? this.onGetSeriesByName(event) : this.onGetSeriesByTitle(event);
      return;
    }

    this.onGetSeries(event);
  }

  private onGetSeries(event: any): void {

    this.onData = this.httpService.get( this.url, this.page).pipe(
      map(data => {
        this.total = data.total;
        this.results = this.results.concat(data.results);
        this.loading = false;

        if (event) {
          event.target.complete();
        }

      })
    ).subscribe();
  }

  public onChange(event: any): void {
    this.results = [];
    this.page = 0;

    if ( event.detail.value ) {
      this.keys = event.detail.value;
      this.flagSearch = true;
      this.onSeries(undefined);
    } else {
      this.flagSearch = false;
      this.onSeries(undefined);
    }
    this.loading = true;
  }

  private onGetSeriesByName(event: any): void {
    this.onData = this.httpService.getByName( this.url, this.keys, this.page ).pipe(
      map(data => {
        this.total = data.total;
        this.results = this.results.concat(data.results);
        this.loading = false;

        if (event) {
          event.target.complete();
        }
      })
    ).subscribe();
  }

  private onGetSeriesByTitle(event: any): void {
    this.onData = this.httpService.getByTitle( this.url, this.keys, this.page ).pipe(
      map(data => {
        this.total = data.total;
        this.results = this.results.concat(data.results);
        this.loading = false;

        if (event) {
          event.target.complete();
        }
      })
    ).subscribe();
  }

  public onGoToDetails(id: number): void {
    this.router.navigate([`details/${this.url}/${id}`]);
  }

}
