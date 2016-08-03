System.register(['@angular/core', '@angular/http', 'rxjs/Observable', '@angular/router', '../app.constants', './auth.service'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1, Observable_1, router_1, app_constants_1, auth_service_1;
    var TasksService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (app_constants_1_1) {
                app_constants_1 = app_constants_1_1;
            },
            function (auth_service_1_1) {
                auth_service_1 = auth_service_1_1;
            }],
        execute: function() {
            TasksService = (function () {
                function TasksService(_router, http, _configuration, _authService) {
                    this._router = _router;
                    this.http = http;
                    this._configuration = _configuration;
                    this._authService = _authService;
                    this.webApiUrl = _configuration.ServerWithApiUrl + 'Task';
                }
                TasksService.prototype.addTask = function (taskRequest) {
                    var apiUrl = this.webApiUrl + '/AddTask';
                    return this.callApi(apiUrl, taskRequest);
                };
                TasksService.prototype.updateTaskStatus = function (taskId) {
                    var headers = this._authService.getHeader();
                    headers.append('Content-Type', 'application/json; charset=utf-8');
                    var options = new http_1.RequestOptions({ headers: headers });
                    return this.http.put(this.webApiUrl + "/" + taskId, "", options)
                        .map(this.extractData)
                        .catch(this.handleError);
                };
                TasksService.prototype.callApi = function (url, taskRequest) {
                    var _this = this;
                    var key = this.getAuthToken();
                    return Observable_1.Observable.create(function (observer) {
                        var formData = new FormData(), xhr = new XMLHttpRequest();
                        formData.append("title", taskRequest.title);
                        formData.append("tags", taskRequest.tags);
                        formData.append("user", taskRequest.user.userId);
                        formData.append("description", taskRequest.description);
                        formData.append("dueDate", taskRequest.dueDate);
                        xhr.onreadystatechange = function () {
                            if (xhr.readyState === 4) {
                                if (xhr.status === 201) {
                                    observer.next(JSON.parse(xhr.response));
                                    observer.complete();
                                }
                                else {
                                    observer.error(_this.handleError);
                                }
                            }
                        };
                        xhr.open('POST', url, true);
                        xhr.setRequestHeader('Authorization', 'Bearer ' + key);
                        xhr.send(formData);
                    });
                };
                TasksService.prototype.extractData = function (res) {
                    var body = res.json();
                    return body.data || {};
                };
                TasksService.prototype.handleError = function (error) {
                    console.error(error);
                    return Observable_1.Observable.throw(error.json().error || 'Server error');
                };
                TasksService.prototype.getAuthToken = function () {
                    var headers = this._authService.getHeader();
                    var key = headers._headersMap.entries().next().value[1][0].slice(7);
                    return key;
                };
                TasksService.prototype.getAuthHeader = function () {
                    var headers = this._authService.getHeader();
                    return headers;
                };
                TasksService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [router_1.Router, http_1.Http, app_constants_1.Configuration, auth_service_1.AuthService])
                ], TasksService);
                return TasksService;
            }());
            exports_1("TasksService", TasksService);
        }
    }
});
//# sourceMappingURL=tasks.service.js.map