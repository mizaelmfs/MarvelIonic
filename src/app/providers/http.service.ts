import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseHttpService } from './base.http.service';
import { map } from 'rxjs/operators';
import Results from '../modals/results.modal';

@Injectable()
export class HttpService {

    constructor(private http: BaseHttpService) {
    }

    public get(url: string): Observable<Results> {
        return this.http.get<any>(url).pipe(
                map( response => response.data )
            );
    }
}
