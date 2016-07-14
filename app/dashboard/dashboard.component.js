System.register(['@angular/core', '../recenttimeline/recenttimeline.component', '../thinkhelpful/thinkhelpful.component', '../whatisgoingon/whatisgoingon.component', '../services/token.service', '@angular/router'], function(exports_1, context_1) {
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
    var core_1, recenttimeline_component_1, thinkhelpful_component_1, whatisgoingon_component_1, token_service_1, router_1;
    var Dashboard;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (recenttimeline_component_1_1) {
                recenttimeline_component_1 = recenttimeline_component_1_1;
            },
            function (thinkhelpful_component_1_1) {
                thinkhelpful_component_1 = thinkhelpful_component_1_1;
            },
            function (whatisgoingon_component_1_1) {
                whatisgoingon_component_1 = whatisgoingon_component_1_1;
            },
            function (token_service_1_1) {
                token_service_1 = token_service_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            Dashboard = (function () {
                function Dashboard(_router, _tokenService) {
                    this._router = _router;
                    this._tokenService = _tokenService;
                    this.isAuthorized = this._tokenService.getTokenFromCookie() != "";
                }
                Dashboard.prototype.ngOnInit = function () {
                    if (!this.isAuthorized) {
                        this._router.navigate(['/login']);
                    }
                };
                Dashboard = __decorate([
                    core_1.Component({
                        selector: 'dashboard',
                        templateUrl: './app/dashboard/dashboard.component.html',
                        providers: [],
                        directives: [recenttimeline_component_1.RecentTimeLineComponent, thinkhelpful_component_1.ThinkHelpful, whatisgoingon_component_1.WhatIsGoingOnComponent]
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, token_service_1.TokenService])
                ], Dashboard);
                return Dashboard;
            }());
            exports_1("Dashboard", Dashboard);
        }
    }
});
//# sourceMappingURL=dashboard.component.js.map