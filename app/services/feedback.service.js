System.register(['angular2/core', 'angular2/http', '../app.constants', '../feedback/feedback-request'], function(exports_1, context_1) {
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
    var core_1, http_1, app_constants_1, feedback_request_1;
    var FeedbackService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (app_constants_1_1) {
                app_constants_1 = app_constants_1_1;
            },
            function (feedback_request_1_1) {
                feedback_request_1 = feedback_request_1_1;
            }],
        execute: function() {
            FeedbackService = (function () {
                function FeedbackService(http, _configuration) {
                    this.http = http;
                    this._configuration = _configuration;
                    this.webApiUrl = _configuration.ServerWithApiUrl + 'Feedback';
                }
                FeedbackService.prototype.sendFeedback = function (applicationViewId, liked) {
                    var feedbackRequest = new feedback_request_1.FeedbackRequest();
                    feedbackRequest.ApplicationViewKey = parseInt(applicationViewId);
                    feedbackRequest.Liked = liked;
                    console.log('Sending Feedback for');
                    console.log(feedbackRequest);
                    var body = JSON.stringify(feedbackRequest);
                    console.log(body);
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json; charset=utf-8');
                    var options = new http_1.RequestOptions({ headers: headers });
                    this.http.post(this.webApiUrl, body, options)
                        .map(function (res) { return res.json(); })
                        .subscribe(function (data) {
                        console.log("Feedback Sent: " + data);
                    }, function (err) { return console.log("error: " + JSON.stringify(err)); }, function () {
                        alert("Feedback submitted successfully");
                    });
                };
                FeedbackService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http, app_constants_1.Configuration])
                ], FeedbackService);
                return FeedbackService;
            }());
            exports_1("FeedbackService", FeedbackService);
        }
    }
});
//# sourceMappingURL=feedback.service.js.map