System.register(['@angular/core', '@angular/router', '../services/whatisgoingon.service'], function(exports_1, context_1) {
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
    var core_1, router_1, whatisgoingon_service_1;
    var WhatIsGoingOnComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (whatisgoingon_service_1_1) {
                whatisgoingon_service_1 = whatisgoingon_service_1_1;
            }],
        execute: function() {
            WhatIsGoingOnComponent = (function () {
                function WhatIsGoingOnComponent(_whatisgoingonService, _router) {
                    this._whatisgoingonService = _whatisgoingonService;
                    this._router = _router;
                    this.tags = '';
                }
                WhatIsGoingOnComponent.prototype.ngOnInit = function () {
                    this.getWhatisGoingOnActivity();
                };
                WhatIsGoingOnComponent.prototype.getWhatisGoingOnActivity = function () {
                    var _this = this;
                    this._whatisgoingonService.getWhatisGoingOnActivity()
                        .subscribe(function (activity) {
                        _this.whatisgoingonTimelines = activity;
                        console.log(_this.whatisgoingonTimelines);
                    }, function (error) {
                        _this.errorMessage = error,
                            console.log(_this.errorMessage);
                    }, function () { return function () { return console.log("Done"); }; });
                };
                WhatIsGoingOnComponent.prototype.select = function (selectedActivityTag) {
                    for (var i = 0; i < selectedActivityTag.tags.length; i++) {
                        this.tags = this.tags + (selectedActivityTag.tags[i].name + (selectedActivityTag.tags.length != i + 1 ? ',' : ''));
                    }
                    this._router.navigate(['timeline', { tags: this.tags }]);
                };
                WhatIsGoingOnComponent = __decorate([
                    core_1.Component({
                        selector: 'whatisgoingon',
                        templateUrl: './app/whatisgoingon/whatisgoingon.component.html',
                        providers: [whatisgoingon_service_1.WhatIsGoingOnService],
                        directives: []
                    }), 
                    __metadata('design:paramtypes', [whatisgoingon_service_1.WhatIsGoingOnService, router_1.Router])
                ], WhatIsGoingOnComponent);
                return WhatIsGoingOnComponent;
            }());
            exports_1("WhatIsGoingOnComponent", WhatIsGoingOnComponent);
        }
    }
});
//# sourceMappingURL=whatisgoingon.component.js.map