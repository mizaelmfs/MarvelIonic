import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseHttpService } from './http.service';
import { map } from 'rxjs/operators';
import Results from './../modals/results.modal';

@Injectable()
export class MoviesService {

    constructor(private http: BaseHttpService) {
    }

    public getMovies(url: string): Observable<Results> {
        return this.http.get<any>(url).pipe(
                map( response => response.data )
            );
    }
}
