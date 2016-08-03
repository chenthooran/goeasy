import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import {Configuration} from '../app.constants';
import {AuthService} from './auth.service';

@Injectable()
export class TasksService {
    private webApiUrl: string;

    tags: any;
    constructor(private _router: Router, private http: Http, private _configuration: Configuration, private _authService: AuthService) {
        this.webApiUrl = _configuration.ServerWithApiUrl + 'Task';
    }

    public addTask(taskRequest) {
        var apiUrl = this.webApiUrl + '/AddTask';
        return this.callApi(apiUrl, taskRequest);
    }

    public updateTaskStatus(taskId: string): Observable<TasksService>{
        var headers = this._authService.getHeader();
        headers.append('Content-Type', 'application/json; charset=utf-8');
        var options = new RequestOptions({ headers: headers });

        return this.http.put(this.webApiUrl + "/" + taskId, "", options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private callApi(url: string, taskRequest): Observable<TasksService> {

        var key = this.getAuthToken();

        return Observable.create(observer => {

            let formData: FormData = new FormData(), xhr: XMLHttpRequest = new XMLHttpRequest();

            formData.append("title", taskRequest.title);
            formData.append("tags", taskRequest.tags);
            formData.append("user", taskRequest.user.userId);
            formData.append("description", taskRequest.description);
            formData.append("dueDate", taskRequest.dueDate);

            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 201) {
                        observer.next(JSON.parse(xhr.response));
                        observer.complete();
                    } else {
                        observer.error(this.handleError);
                    }
                }
            };

            xhr.open('POST', url, true);
            xhr.setRequestHeader('Authorization', 'Bearer ' + key);

            xhr.send(formData);
        });
    }

    private extractData(res: Response) {
        let body = res.json();
        return body.data || {};
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

    private getAuthToken() {
        var headers = this._authService.getHeader();
        var key = headers._headersMap.entries().next().value[1][0].slice(7);
        return key;
    }

    private getAuthHeader() {
        var headers = this._authService.getHeader();
        return headers;
    }
}
