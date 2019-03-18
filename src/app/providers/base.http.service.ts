import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Md5 } from 'ts-md5/dist/md5';
import { CacheService } from 'ionic-cache';

@Injectable()
export class BaseHttpService {

    private timeStamp: any;
    private keyPublic = '4f8b95fa427be20079933a292ec1cc32';
    private keyPrivate = '26fc0462026fd18e16931ceb1270c4eb21252c5e';

    constructor(private http: HttpClient, private cacheService: CacheService) {
        this.timeStamp = new Date().getDate;
    }

    public get<T>(path: String): Observable<T> {
        const url = `${environment.API}${path}ts=${this.timeStamp}&apikey=${this.keyPublic}&hash=${this.hash()}`;
        const req = this.http.get<T>(`${environment.API}${path}ts=${this.timeStamp}&apikey=${this.keyPublic}&hash=${this.hash()}`);
        return this.cacheService.loadFromObservable(url, req);

    }

    private hash(): string | any {
        return Md5.hashStr(`${this.timeStamp}${this.keyPrivate}${this.keyPublic}`);
    }
}
