import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  private path: string;
  private id: string;
  public url: string;

  constructor (private router: ActivatedRoute) {

  }

  ngOnInit() {
    this.router.params.subscribe(res => {
      this.path = res['path'];
      this.id = res['id'];
    });

      this.url = `${this.path}/${this.id}?`;
  }

}
