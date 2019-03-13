import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseHttpService } from './http.service';
import { map } from 'rxjs/operators';
import Movies from './../modals/movies.modal';

@Injectable()
export class MoviesService {

    constructor(private http: BaseHttpService) { 
    }

    public getMovies(): Observable<Movies> {
        return this.http.get<any>('/v1/public/series').pipe(
                map( data => <Movies>data.data )
            )
    } 
}