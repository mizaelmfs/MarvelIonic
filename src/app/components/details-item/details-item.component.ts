import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from 'src/app/providers/http.service';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-details-item',
  templateUrl: './details-item.component.html',
  styleUrls: ['./details-item.component.scss'],
})
export class DetailsItemComponent implements OnInit {

  @Input() url: string;

  private onData: Subscription;
  public results = [];
  public loading = true;

  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.onData = this.httpService.getId(this.url).pipe(
      map(data => {
        this.results = data.results;
        this.loading = !this.loading;
      })
    ).subscribe();
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy() {
    this.onData.unsubscribe();
  }

}
