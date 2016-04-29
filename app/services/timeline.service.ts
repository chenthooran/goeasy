﻿import {Injectable, Inject} from 'angular2/core';
import {Http, Response, RequestOptions, Headers} from 'angular2/http';
import {TimeLineResponse} from '../timeline/timeline-response';
import {Observable} from 'rxjs/Observable';
import {AuthService} from './auth.service';
import {TokenService} from './token.service';
import {Configuration} from '../app.constants';

@Injectable()
export class TimeLineService {
    private webApiUrl: string;
    private authService: AuthService
    constructor(private http: Http, private _authService: AuthService, private _configuration: Configuration) {
        this.webApiUrl = _configuration.ServerWithApiUrl + 'TimeLine';
        this.authService = _authService;
    }

    //public getTimeLines() {
    //    var headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
    //    return this.http.get(this.webApiUrl ,{
    //        headers: headers
    //    })
    //        .map(res => <any>res.json())
    //        .do(data => console.log(data))
    //        .catch(this.handleError);
    //}

    public getTimeLines(timeLineRequest) {

        var body = JSON.stringify(timeLineRequest);
        var headers = this.authService.getHeader();
        headers.append('Content-Type', 'application/json; charset=utf-8' );
        var options = new RequestOptions({ headers: headers });

        return this.http.post(this.webApiUrl, body, options)
            .map(res => <any>res.json())
             .do(data => console.log(data))
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}


