System.register(['@angular/core', '@angular/http', 'rxjs/Observable', './auth.service', '../app.constants'], function(exports_1, context_1) {
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
    var core_1, http_1, Observable_1, auth_service_1, app_constants_1;
    var RecentTimeLineService;
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
            function (auth_service_1_1) {
                auth_service_1 = auth_service_1_1;
            },
            function (app_constants_1_1) {
                app_constants_1 = app_constants_1_1;
            }],
        execute: function() {
            RecentTimeLineService = (function () {
                function RecentTimeLineService(http, _authService, _configuration) {
                    this.http = http;
                    this._authService = _authService;
                    this._configuration = _configuration;
                    this.webApiUrl = _configuration.ServerWithApiUrl + 'TagSearchRequest';
                    this.authService = _authService;
                }
                RecentTimeLineService.prototype.getRecentTimeLines = function () {
                    var headers = this.authService.getHeader();
                    return this.http.get(this.webApiUrl, {
                        headers: headers
                    })
                        .map(function (res) { return res.json(); })
                        .do(function (data) { return console.log(data); })
                        .catch(this.handleError);
                };
                RecentTimeLineService.prototype.handleError = function (error) {
                    console.error(error);
                    return Observable_1.Observable.throw(error.json().error || 'Server error');
                };
                RecentTimeLineService.prototype.share = function (request) {
                    //console.log("Title: " + request.title + ", description: " + request.description);
                    var body = JSON.stringify(request);
                    //var headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
                    var headers = this._authService.getHeader();
                    headers.append('Content-Type', 'application/json; charset=utf-8');
                    var options = new http_1.RequestOptions({ headers: headers });
                    this.http.post(this.webApiUrl, body, options)
                        .map(function (res) { return res.json(); })
                        .subscribe(function (data) {
                        console.log("recent timeline shared : " + data);
                    }, function (err) { return console.log("error: " + JSON.stringify(err)); }, function () {
                        //for (var i = 0; i < request.tags.length; i++) {
                        //    this.tags = this.tags + (request.tags[i] + (request.tags.length != i + 1 ? ',' : ''));
                        //}
                        //this._router.navigate(['timeline', { tags: this.tags }]);
                    });
                };
                RecentTimeLineService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http, auth_service_1.AuthService, app_constants_1.Configuration])
                ], RecentTimeLineService);
                return RecentTimeLineService;
            }());
            exports_1("RecentTimeLineService", RecentTimeLineService);
        }
    }
});
//# sourceMappingURL=recenttimeline.service.js.map