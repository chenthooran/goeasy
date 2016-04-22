System.register(['angular2/core', 'angular2/router', './services/auth.service', './notes/add-note.component', './timeline/timeline.component', './authentication/login.component'], function(exports_1, context_1) {
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
    var core_1, router_1, auth_service_1, add_note_component_1, timeline_component_1, login_component_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (auth_service_1_1) {
                auth_service_1 = auth_service_1_1;
            },
            function (add_note_component_1_1) {
                add_note_component_1 = add_note_component_1_1;
            },
            function (timeline_component_1_1) {
                timeline_component_1 = timeline_component_1_1;
            },
            function (login_component_1_1) {
                login_component_1 = login_component_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(_router) {
                    this._router = _router;
                    this.isAuthorized = false;
                }
                AppComponent.prototype.ngOnInit = function () {
                    if (this.isAuthorized)
                        this._router.navigate(['TimeLine']);
                    else
                        this._router.navigate(['Login']);
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        styleUrls: ['app/app.component.css'],
                        templateUrl: 'app/app.component.html',
                        directives: [router_1.ROUTER_DIRECTIVES],
                        providers: [
                            router_1.ROUTER_PROVIDERS,
                            auth_service_1.AuthService,
                            login_component_1.LoginComponent,
                            add_note_component_1.AddNoteComponent
                        ]
                    }),
                    router_1.RouteConfig([
                        {
                            path: '/login',
                            name: 'Login',
                            component: login_component_1.LoginComponent,
                            useAsDefault: true
                        },
                        //{
                        //    path: 'signup',
                        //    name: 'Signup',
                        //    component: AuthService
                        //},
                        {
                            path: '/addnote',
                            name: 'AddNote',
                            component: add_note_component_1.AddNoteComponent
                        },
                        {
                            path: '/timeline',
                            name: 'TimeLine',
                            component: timeline_component_1.TimeLineComponent
                        }
                    ]), 
                    __metadata('design:paramtypes', [router_1.Router])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map