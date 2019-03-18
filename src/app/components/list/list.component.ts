import { TransactionPageService } from './../../providers/transaction.page.service';
import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Network } from '@ionic-native/network/ngx';
import { HttpService } from 'src/app/providers/http.service';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import Data from 'src/app/modals/data.modal';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {

  @Input() path: string;

  private onConnect: Subscription;
  private onDisconnect: Subscription;
  private onData: Subscription;

  public data: Data;
  public results = [];
  private page = 0;
  private keys: string;

  // flags
  public loading = true;
  private flagSearch = false;

  constructor(private httpService: HttpService
    , private network: Network
    , private router: Router
    , private transactionPage: TransactionPageService
    , private toastController: ToastController) {

  }

  ngOnInit(): void {

    this.onSeries(undefined);

    this.onDisconnect = this.network.onDisconnect().subscribe(() => {
      this.presentToast();
    });

    this.onConnect = this.network.onConnect().subscribe(() => {
      this.onSeries(undefined);
    });
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Plase, connect to an internet...',
      duration: 4000
    });
    toast.present();
  }

  ionViewWillLeave() {
    this.onData.unsubscribe();
    this.onConnect.unsubscribe();
    this.onDisconnect.unsubscribe();
  }

  public loadData(event: any) {
    this.page = this.page + this.data.limit;

    if (this.results.length === this.data.total) {
      event.target.disabled = true;
      return;
    }

    this.onSeries(event);
  }

  private onSeries(event: any) {

    if ( this.flagSearch ) {
      this.path === 'characters' ? this.onGetSeriesByName(event) : this.onGetSeriesByTitle(event);
      return;
    }

    this.onGetSeries(event);
  }

  private onGetSeries(event: any): void {

    this.onData = this.httpService.get( this.path, this.page).pipe(
      map(data => {
        this.setData(data);
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
    this.onData = this.httpService.getByName( this.path, this.keys, this.page ).pipe(
      map(data => {
        this.setData(data);
        if (event) {
          event.target.complete();
        }
      })
    ).subscribe();
  }

  private onGetSeriesByTitle(event: any): void {
    this.onData = this.httpService.getByTitle( this.path, this.keys, this.page ).pipe(
      map(data => {
        this.setData(data);
        if (event) {
          event.target.complete();
        }
      })
    ).subscribe();
  }

  private setData(data: Data) {
    this.data = data;
    this.results = this.results.concat(data.results);
    this.loading = false;
  }

  public onGoToDetails(id: number): void {

    this.transactionPage.upTransaction();
    this.router.navigate([`details/${this.path}/${id}`]);
  }

}
