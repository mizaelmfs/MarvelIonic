import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseHttpService } from './base.http.service';
import { map } from 'rxjs/operators';
import Data from '../modals/data.modal';

@Injectable()
export class HttpService {

    constructor(private http: BaseHttpService) {
    }

    public get(path: string, page: number): Observable<Data> {
        return this.http.get<any>(`${path}?offset=${page}&`).pipe(
            map( response => response.data )
        );
    }

    public getId(path: string): Observable<Data> {
        return this.http.get<any>(path).pipe(
            map( response => response.data )
        );
    }

    public getByName(path: string, name: string, page: number): Observable<Data> {
        return this.http.get<any>(`${path}?nameStartsWith=${name}&offset=${page}&`).pipe(
            map( response => response.data )
        );
    }

    public getByTitle(path: string, name: string, page: number): Observable<Data> {
        return this.http.get<any>(`${path}?titleStartsWith=${name}&offset=${page}&`).pipe(
            map( response => response.data )
        );
    }
}
