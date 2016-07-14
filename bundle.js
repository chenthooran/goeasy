var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
System.register("services/token.service", ['@angular/core'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var core_1;
    var TokenService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            TokenService = (function () {
                function TokenService() {
                }
                TokenService.prototype.getToken = function () {
                    this._token = this.getCookie("yaytoken");
                    return this._token;
                };
                TokenService.prototype.setToken = function (token) {
                    this._token = token;
                    this.setTokenToCookie(token, 14);
                };
                TokenService.prototype.getTokenFromCookie = function () {
                    return this.getCookie("yaytoken");
                };
                TokenService.prototype.setTokenToCookie = function (token, expiredIn) {
                    this.setCookie("yaytoken", token, expiredIn);
                };
                TokenService.prototype.removeToken = function () {
                    this.delete_cookie("yaytoken");
                };
                TokenService.prototype.getCookie = function (cname) {
                    var name = cname + "=";
                    var ca = document.cookie.split(';');
                    for (var i = 0; i < ca.length; i++) {
                        var c = ca[i];
                        while (c.charAt(0) == ' ') {
                            c = c.substring(1);
                        }
                        if (c.indexOf(name) == 0) {
                            return c.substring(name.length, c.length);
                        }
                    }
                    return "";
                };
                TokenService.prototype.setCookie = function (cname, cvalue, exdays) {
                    var d = new Date();
                    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
                    var expires = "expires=" + d.toUTCString();
                    document.cookie = cname + "=" + cvalue + "; " + expires;
                };
                TokenService.prototype.delete_cookie = function (name) {
                    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                };
                TokenService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], TokenService);
                return TokenService;
            }());
            exports_1("TokenService", TokenService);
        }
    }
});
System.register("app.constants", ['@angular/core'], function(exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var core_2;
    var Configuration;
    return {
        setters:[
            function (core_2_1) {
                core_2 = core_2_1;
            }],
        execute: function() {
            Configuration = (function () {
                function Configuration() {
                    this.Server = "http://yaycollaborationapi.azurewebsites.net/";
                    //public Server: string = "http://localhost:54736/";
                    this.ApiUrl = "api/";
                    this.ServerWithApiUrl = this.Server + this.ApiUrl;
                }
                Configuration = __decorate([
                    core_2.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], Configuration);
                return Configuration;
            }());
            exports_2("Configuration", Configuration);
        }
    }
});
System.register("services/auth.service", ['@angular/core', '@angular/http', '@angular/router', "services/token.service", "app.component", "app.constants"], function(exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var core_3, http_1, router_1, token_service_1, app_component_1, app_constants_1;
    var AuthService;
    return {
        setters:[
            function (core_3_1) {
                core_3 = core_3_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (token_service_1_1) {
                token_service_1 = token_service_1_1;
            },
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            },
            function (app_constants_1_1) {
                app_constants_1 = app_constants_1_1;
            }],
        execute: function() {
            AuthService = (function () {
                function AuthService(_router, http, tokenService, _configuration, _parent) {
                    this._router = _router;
                    this.http = http;
                    this.tokenService = tokenService;
                    this._configuration = _configuration;
                    this._parent = _parent;
                    this._token = '';
                    this.webApiUrl = _configuration.Server + 'Token';
                }
                AuthService.prototype.login = function (username, password, rememberMe) {
                    var _this = this;
                    console.log("username: " + username + ", password: " + password + ", remember me: " + rememberMe);
                    var _username = 'test@test.com';
                    var _password = 'teST@123';
                    var grant_type = 'password';
                    var creds = "grant_type=" + grant_type + "&userName=" + username + "&password=" + password;
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/x-www-form-urlencoded');
                    /*return this.http.post(this.webApiUrl, body, options)
                        .map((res) => { return <AppUser[]>res.json() });*/
                    if (rememberMe) {
                        this.http.post(this.webApiUrl, creds, {
                            headers: headers
                        }).map(function (res) { return res.json(); })
                            .subscribe(function (data) {
                            //console.log("access token: "+data.access_token)
                            _this._token = data.access_token;
                        }, function (err) {
                            console.log("error: " + JSON.stringify(err));
                            _this._parent.isAuthorized = false;
                            //alert(JSON.parse(err._body).error_description);
                        }, function () {
                            _this.tokenService.setToken(_this._token);
                            _this._parent.isAuthorized = true;
                            if (rememberMe) {
                                console.log("saving credentials in cookie");
                                //document.cookie = "username=" + username;
                                //document.cookie = "password=" + password;
                                _this.setCookie("username", username, 15);
                                _this.setCookie("password", password, 15);
                            }
                            window.loadingComponentRef.zone.run(function () { window.loadingComponentRef.component.hide(); });
                            _this._router.navigate(['dashboard']);
                        });
                    }
                    else {
                        return this.http.post(this.webApiUrl, creds, {
                            headers: headers
                        }).map(function (res) { return res.json(); });
                    }
                };
                AuthService.prototype.setToken = function (token) {
                    this._token = token;
                    this.tokenService.setToken(token);
                };
                AuthService.prototype.setTokenExpiresIn = function (expiredIn) {
                    this._tokenExpiresIn = expiredIn;
                };
                AuthService.prototype.setAuthorized = function (_isAuthorized) {
                    this._parent.isAuthorized = _isAuthorized;
                };
                AuthService.prototype.setCookies = function (username, password, rememberMe) {
                    this._parent.isAuthorized = true;
                    if (rememberMe) {
                        console.log("saving credentials in cookie");
                        //document.cookie = "username=" + username;
                        //document.cookie = "password=" + password;
                        this.setCookie("username", username, 15);
                        this.setCookie("password", password, 15);
                        this.setCookie("yaytoken", this.tokenService.getToken(), this._tokenExpiresIn);
                    }
                    window.loadingComponentRef.zone.run(function () { window.loadingComponentRef.component.hide(); });
                    this._router.navigate(['dashboard']);
                };
                AuthService.prototype.isAuth = function () {
                    return this.tokenService.getToken() != '' && this.tokenService.getToken() != null;
                };
                AuthService.prototype.get = function (url, callback) {
                    var authHeader = new http_1.Headers();
                    authHeader.append('Authorization', 'bearer ' + this.tokenService.getToken());
                    this.http.get(url, {
                        headers: authHeader
                    })
                        .map(function (res) { return res.text(); })
                        .subscribe(function (data) { return callback(data); }, function (err) { return console.log("error: " + JSON.stringify(err)); }, function () { return console.log('Secret Quote Complete'); });
                };
                AuthService.prototype.getHeader = function () {
                    var authHeader = new http_1.Headers();
                    authHeader.append('Authorization', 'bearer ' + this.tokenService.getToken());
                    return authHeader;
                };
                AuthService.prototype.setCookie = function (cname, cvalue, exdays) {
                    var d = new Date();
                    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
                    var expires = "expires=" + d.toUTCString();
                    document.cookie = cname + "=" + cvalue + "; " + expires;
                };
                AuthService.prototype.loginUsingCookies = function () {
                    var userName = this.getCookie("username");
                    var password = this.getCookie("password");
                    if (userName == null || userName == '' || password == null || password == '')
                        return false;
                    this.login(userName, password, true);
                };
                AuthService.prototype.getCookie = function (cname) {
                    var name = cname + "=";
                    var ca = document.cookie.split(';');
                    for (var i = 0; i < ca.length; i++) {
                        var c = ca[i];
                        while (c.charAt(0) == ' ') {
                            c = c.substring(1);
                        }
                        if (c.indexOf(name) == 0) {
                            return c.substring(name.length, c.length);
                        }
                    }
                    return "";
                };
                AuthService.prototype.logout = function () {
                    console.log("logout");
                    this.delete_cookie("username");
                    this.delete_cookie("password");
                    this.delete_cookie("yaytoken");
                    this._parent.isAuthorized = false;
                    this._router.navigate(['login']);
                };
                AuthService.prototype.delete_cookie = function (name) {
                    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                };
                AuthService = __decorate([
                    core_3.Injectable(),
                    __param(4, core_3.Inject(core_3.forwardRef(function () { return app_component_1.AppComponent; }))), 
                    __metadata('design:paramtypes', [router_1.Router, http_1.Http, token_service_1.TokenService, app_constants_1.Configuration, app_component_1.AppComponent])
                ], AuthService);
                return AuthService;
            }());
            exports_3("AuthService", AuthService);
        }
    }
});
System.register("tags/tags-response", [], function(exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    var TagsResponse, Tag;
    return {
        setters:[],
        execute: function() {
            TagsResponse = (function () {
                function TagsResponse() {
                }
                return TagsResponse;
            }());
            exports_4("TagsResponse", TagsResponse);
            Tag = (function () {
                function Tag() {
                }
                return Tag;
            }());
            exports_4("Tag", Tag);
        }
    }
});
System.register("notes/note-request", [], function(exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var NoteRequest;
    return {
        setters:[],
        execute: function() {
            NoteRequest = (function () {
                function NoteRequest(title, description, tags, users, filesToUpload, attachments) {
                    this.title = title;
                    this.description = description;
                    this.tags = tags;
                    this.users = users;
                    this.filesToUpload = filesToUpload;
                    this.attachments = attachments;
                }
                return NoteRequest;
            }());
            exports_5("NoteRequest", NoteRequest);
        }
    }
});
System.register("services/notes.service", ['@angular/core', '@angular/http', 'rxjs/Observable', '@angular/router', "app.constants", "services/auth.service"], function(exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    var core_4, http_2, Observable_1, router_2, app_constants_2, auth_service_1;
    var NotesService;
    return {
        setters:[
            function (core_4_1) {
                core_4 = core_4_1;
            },
            function (http_2_1) {
                http_2 = http_2_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (router_2_1) {
                router_2 = router_2_1;
            },
            function (app_constants_2_1) {
                app_constants_2 = app_constants_2_1;
            },
            function (auth_service_1_1) {
                auth_service_1 = auth_service_1_1;
            }],
        execute: function() {
            NotesService = (function () {
                function NotesService(_router, http, _configuration, _authService) {
                    this._router = _router;
                    this.http = http;
                    this._configuration = _configuration;
                    this._authService = _authService;
                    this.webApiUrl = _configuration.ServerWithApiUrl + 'Note';
                }
                //public addNote(noteRequest) {
                //    console.log("Title: " + noteRequest.title + ", description: " + noteRequest.description);
                //    var headers = new Headers();
                //    headers.append('Content-Type', 'application/json');
                //    this.http.post('http://localhost:54736/api/Note',
                //        JSON.stringify(noteRequest),
                //        { headers: headers })
                //        .map((res: Response) => res.json())
                //        .subscribe((res: noteRequest) => this.postResponse = res);
                //}
                NotesService.prototype.addNote = function (noteRequest) {
                    //console.log("Title: " + noteRequest.title + ", description: " + noteRequest.description);
                    //var body = JSON.stringify(noteRequest);
                    ////var headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
                    //var headers = this._authService.getHeader();
                    //headers.append('Content-Type', 'application/json; charset=utf-8');
                    //var options = new RequestOptions({ headers: headers });
                    //return this.http.post(this.webApiUrl + '/AddNote', body, options)
                    //    .map(res => res.json())
                    //    .do(data => console.log(data))
                    //    .catch(this.handleError);
                    var apiUrl = this.webApiUrl + '/AddNoteWithAttachments';
                    // var apiUrl = this.webApiUrl + '/AddNote';
                    return this.callApi(apiUrl, noteRequest);
                };
                NotesService.prototype.editNote = function (editNoteRequest) {
                    var editApiUrl = this.webApiUrl + '/EditNote';
                    var body = JSON.stringify(editNoteRequest);
                    var headers = this.getAuthHeader();
                    headers.append('Content-Type', 'application/json; charset=utf-8');
                    var options = new http_2.RequestOptions({ headers: headers, url: editApiUrl, body: body });
                    return this.http.post(editApiUrl, body, options)
                        .do(function (data) { return console.log(data); })
                        .catch(this.handleError);
                };
                NotesService.prototype.handleError = function (error) {
                    console.error(error);
                    return Observable_1.Observable.throw(error.json().error || 'Server error');
                };
                NotesService.prototype.callApi = function (url, noteRequest) {
                    // Create FormData object and attach files and other data into it and send to api
                    // as angulr 2 still not support sending files to backend
                    // We can change this once angular 2 support it
                    var _this = this;
                    var key = this.getAuthToken();
                    return Observable_1.Observable.create(function (observer) {
                        var formData = new FormData(), xhr = new XMLHttpRequest();
                        // for (let i = 0; i < files.length; i++) {
                        formData.append("title", noteRequest.title);
                        formData.append("tags", noteRequest.tags);
                        formData.append("users", noteRequest.users);
                        formData.append("description", noteRequest.description);
                        if (noteRequest.filesToUpload) {
                            for (var _i = 0, _a = noteRequest.filesToUpload; _i < _a.length; _i++) {
                                var item = _a[_i];
                                //formData.append("file", noteRequest.filesToUpload[0]);
                                formData.append("file", item.file);
                            }
                        }
                        // var files = noteRequest.filesToUpload[0].file;
                        // formData.append("file", files);
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
                        //we might need to show the progress later
                        //xhr.upload.onprogress = (event) => {
                        //    this.progress = Math.round(event.loaded / event.total * 100);
                        //    this.progressObserver.next(this.progress);
                        //};
                        xhr.open('POST', url, true);
                        xhr.setRequestHeader('Authorization', 'Bearer ' + key);
                        xhr.send(formData);
                    });
                };
                NotesService.prototype.callEditApi = function (url, editNoteRequest) {
                    var _this = this;
                    var key = this.getAuthToken();
                    return Observable_1.Observable.create(function (observer) {
                        var formData = new FormData(), xhr = new XMLHttpRequest();
                        formData.append("title", editNoteRequest.Title);
                        formData.append("tags", editNoteRequest.Description);
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
                NotesService.prototype.getAuthToken = function () {
                    var headers = this._authService.getHeader();
                    var key = headers._headersMap.entries().next().value[1][0].slice(7);
                    return key;
                };
                NotesService.prototype.getAuthHeader = function () {
                    var headers = this._authService.getHeader();
                    return headers;
                };
                NotesService.prototype.share = function (request) {
                    //console.log("Title: " + request.title + ", description: " + request.description);
                    var body = JSON.stringify(request);
                    //var headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
                    var headers = this._authService.getHeader();
                    headers.append('Content-Type', 'application/json; charset=utf-8');
                    var options = new http_2.RequestOptions({ headers: headers });
                    return this.http.post(this.webApiUrl + '/ShareNote', body, options)
                        .map(function (res) { return res.json(); });
                };
                NotesService = __decorate([
                    core_4.Injectable(), 
                    __metadata('design:paramtypes', [router_2.Router, http_2.Http, app_constants_2.Configuration, auth_service_1.AuthService])
                ], NotesService);
                return NotesService;
            }());
            exports_6("NotesService", NotesService);
        }
    }
});
System.register("services/user_profile.service", ['@angular/core', '@angular/http', 'rxjs/Observable', "app.constants", "services/auth.service"], function(exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    var core_5, http_3, Observable_2, app_constants_3, auth_service_2;
    var UserProfileService;
    return {
        setters:[
            function (core_5_1) {
                core_5 = core_5_1;
            },
            function (http_3_1) {
                http_3 = http_3_1;
            },
            function (Observable_2_1) {
                Observable_2 = Observable_2_1;
            },
            function (app_constants_3_1) {
                app_constants_3 = app_constants_3_1;
            },
            function (auth_service_2_1) {
                auth_service_2 = auth_service_2_1;
            }],
        execute: function() {
            UserProfileService = (function () {
                function UserProfileService(http, _configuration, _authService) {
                    this.http = http;
                    this._configuration = _configuration;
                    this._authService = _authService;
                    this.webApiUrl = _configuration.ServerWithApiUrl + 'Account/GetUserProfile';
                    this.authService = _authService;
                }
                UserProfileService.prototype.getUserProfile = function () {
                    var headers = this.authService.getHeader();
                    headers.append('Content-Type', 'application/json; charset=utf-8');
                    return this.http.get(this.webApiUrl, {
                        headers: headers
                    })
                        .map(function (res) { return res.json(); })
                        .do(function (data) { return console.log(data); })
                        .catch(this.handleError);
                };
                UserProfileService.prototype.handleError = function (error) {
                    console.error(error);
                    return Observable_2.Observable.throw(error.json().error || 'Server error');
                };
                UserProfileService.prototype.getImage = function (externalReference) {
                    return this.http.get(this._configuration.ServerWithApiUrl + "FileContent/GetFileContent?externalReference=" + externalReference)
                        .map(function (res) { return res.json(); })
                        .catch(this.handleError);
                };
                UserProfileService = __decorate([
                    core_5.Injectable(), 
                    __metadata('design:paramtypes', [http_3.Http, app_constants_3.Configuration, auth_service_2.AuthService])
                ], UserProfileService);
                return UserProfileService;
            }());
            exports_7("UserProfileService", UserProfileService);
        }
    }
});
System.register("userprofile/userprofile.component", ['@angular/core', "services/auth.service", "services/user_profile.service", "app.constants"], function(exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
    var core_6, auth_service_3, user_profile_service_1, app_constants_4;
    var UserProfileData, UserProfileComponent;
    return {
        setters:[
            function (core_6_1) {
                core_6 = core_6_1;
            },
            function (auth_service_3_1) {
                auth_service_3 = auth_service_3_1;
            },
            function (user_profile_service_1_1) {
                user_profile_service_1 = user_profile_service_1_1;
            },
            function (app_constants_4_1) {
                app_constants_4 = app_constants_4_1;
            }],
        execute: function() {
            UserProfileData = (function () {
                function UserProfileData() {
                }
                return UserProfileData;
            }());
            exports_8("UserProfileData", UserProfileData);
            UserProfileComponent = (function () {
                function UserProfileComponent(_authService, _configuration, _userProfileService) {
                    this._authService = _authService;
                    this._configuration = _configuration;
                    this._userProfileService = _userProfileService;
                    this.userProfileData = {
                        email: '',
                        name: '',
                        profileImageId: '',
                        userTags: []
                    };
                }
                UserProfileComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    setTimeout(function () {
                        _this.getUserProfile();
                    }, 10000);
                    //this.getUserProfile();
                };
                UserProfileComponent.prototype.logout = function () {
                    console.log("logout");
                    this._authService.logout();
                };
                UserProfileComponent.prototype.getUserProfile = function () {
                    var _this = this;
                    //this._authService.get(this.webApiUrl, function (data) {
                    //    console.log(JSON.stringify(data));
                    //});
                    this._userProfileService.getUserProfile()
                        .subscribe(function (data) {
                        _this.userProfileData = JSON.parse(JSON.stringify(data));
                        _this.getUserImage(_this.userProfileData.profileImageId != null ? _this.userProfileData.profileImageId : '');
                    }, function (error) {
                        _this.errorMessage = error,
                            console.log(_this.errorMessage);
                    }, function () { return function () { return console.log("Done"); }; });
                };
                UserProfileComponent.prototype.getUserImage = function (externalReference) {
                    var _this = this;
                    this._userProfileService.getImage(externalReference)
                        .subscribe(function (data) {
                        _this.imageURL = JSON.parse(JSON.stringify(data));
                    }, function (error) {
                        _this.errorMessage = error,
                            console.log(_this.errorMessage);
                    }, function () { return function () { return console.log("Done"); }; });
                };
                UserProfileComponent = __decorate([
                    core_6.Component({
                        selector: 'user-profile',
                        styleUrls: ['app/app.component.css'],
                        templateUrl: 'app/userprofile/userprofile.component.html',
                        providers: [
                            user_profile_service_1.UserProfileService
                        ]
                    }), 
                    __metadata('design:paramtypes', [auth_service_3.AuthService, app_constants_4.Configuration, user_profile_service_1.UserProfileService])
                ], UserProfileComponent);
                return UserProfileComponent;
            }());
            exports_8("UserProfileComponent", UserProfileComponent);
        }
    }
});
System.register("services/tags.service", ['@angular/core', '@angular/http', 'rxjs/Observable', "app.constants", "services/auth.service"], function(exports_9, context_9) {
    "use strict";
    var __moduleName = context_9 && context_9.id;
    var core_7, http_4, Observable_3, app_constants_5, auth_service_4;
    var TagsService;
    return {
        setters:[
            function (core_7_1) {
                core_7 = core_7_1;
            },
            function (http_4_1) {
                http_4 = http_4_1;
            },
            function (Observable_3_1) {
                Observable_3 = Observable_3_1;
            },
            function (app_constants_5_1) {
                app_constants_5 = app_constants_5_1;
            },
            function (auth_service_4_1) {
                auth_service_4 = auth_service_4_1;
            }],
        execute: function() {
            TagsService = (function () {
                function TagsService(http, _authService, _configuration) {
                    this.http = http;
                    this._authService = _authService;
                    this._configuration = _configuration;
                    this.webApiUrl = _configuration.ServerWithApiUrl + 'tag';
                    this.authService = _authService;
                }
                TagsService.prototype.getTags = function () {
                    var headers = this.authService.getHeader();
                    headers.append('Content-Type', 'application/json; charset=utf-8');
                    var options = new http_4.RequestOptions({ headers: headers });
                    return this.http.get(this.webApiUrl, options)
                        .toPromise()
                        .then(function (res) { return res.json().data; })
                        .then(function (data) { return data; });
                };
                TagsService.prototype.getAllTags = function () {
                    var headers = this.authService.getHeader();
                    headers.append('Content-Type', 'application/json; charset=utf-8');
                    var options = new http_4.RequestOptions({ headers: headers });
                    return this.http.get(this.webApiUrl, options)
                        .map(function (res) { return res.json(); })
                        .do(function (data) { return console.log(data); })
                        .catch(this.handleError);
                };
                TagsService.prototype.addTag = function (tagRequest) {
                    console.log("Tag: " + tagRequest);
                    var body = JSON.stringify(tagRequest);
                    var headers = this.authService.getHeader();
                    headers.append('Content-Type', 'application/json; charset=utf-8');
                    var options = new http_4.RequestOptions({ headers: headers });
                    return this.http.post('http://localhost:54736/api/tag', body, options)
                        .map(function (res) {
                        // If request fails, throw an Error that will be caught
                        if (res.status < 200 || res.status >= 300) {
                            throw new Error('This request has failed ' + res.status);
                        }
                        else {
                            return res.json();
                        }
                    })
                        .do(function (data) { return console.log(data); })
                        .catch(this.handleError);
                };
                TagsService.prototype.handleError = function (error) {
                    console.error(error);
                    return Observable_3.Observable.throw(error.json().error || 'Server error');
                };
                TagsService = __decorate([
                    core_7.Injectable(), 
                    __metadata('design:paramtypes', [http_4.Http, auth_service_4.AuthService, app_constants_5.Configuration])
                ], TagsService);
                return TagsService;
            }());
            exports_9("TagsService", TagsService);
        }
    }
});
System.register("tags/tags-selector.component", ['@angular/core', 'primeng/primeng', "services/tags.service"], function(exports_10, context_10) {
    "use strict";
    var __moduleName = context_10 && context_10.id;
    var core_8, primeng_1, tags_service_1;
    var TagsSelectorComponent;
    return {
        setters:[
            function (core_8_1) {
                core_8 = core_8_1;
            },
            function (primeng_1_1) {
                primeng_1 = primeng_1_1;
            },
            function (tags_service_1_1) {
                tags_service_1 = tags_service_1_1;
            }],
        execute: function() {
            TagsSelectorComponent = (function () {
                function TagsSelectorComponent(tagService) {
                    this.tagService = tagService;
                    this.tagsAdded = new core_8.EventEmitter();
                    this.tagsRemoved = new core_8.EventEmitter();
                    this.tags = [];
                }
                TagsSelectorComponent.prototype.filtertagMultiple = function (event) {
                    var _this = this;
                    var query = event.query;
                    this.tagService.getTags().then(function (tags) {
                        _this.filteredtagsMultiple = _this.filtertag(query, tags);
                        var tag = { "name": '*' + query, "code": query };
                        if (_this.filteredtagsMultiple.some(function (obj) {
                            if (tag.name.charAt(0) === '*')
                                return obj.name.toLowerCase() === tag.name.substring(1).toLowerCase();
                            else
                                return obj.name.toLowerCase() === tag.name.toLowerCase();
                        })) {
                        }
                        else if (_this.isAllowedNewInput)
                            _this.filteredtagsMultiple.splice(0, 0, tag);
                    });
                };
                TagsSelectorComponent.prototype.filtertag = function (query, tags) {
                    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
                    var filtered = [];
                    for (var i = 0; i < tags.length; i++) {
                        var tag = tags[i];
                        if (tag != undefined && tag.name != null) {
                            if (tag.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                                filtered.push(tag);
                            }
                        }
                    }
                    return filtered;
                };
                TagsSelectorComponent.prototype.handleSelectTag = function () {
                    this.tagsAdded.emit(this.tags);
                };
                TagsSelectorComponent.prototype.handleUnSelectTag = function () {
                    this.tagsRemoved.emit(this.tags);
                };
                __decorate([
                    core_8.Output(), 
                    __metadata('design:type', core_8.EventEmitter)
                ], TagsSelectorComponent.prototype, "tagsAdded", void 0);
                __decorate([
                    core_8.Output(), 
                    __metadata('design:type', core_8.EventEmitter)
                ], TagsSelectorComponent.prototype, "tagsRemoved", void 0);
                __decorate([
                    core_8.Input(), 
                    __metadata('design:type', Boolean)
                ], TagsSelectorComponent.prototype, "isAllowedNewInput", void 0);
                __decorate([
                    core_8.Input(), 
                    __metadata('design:type', Array)
                ], TagsSelectorComponent.prototype, "inputValues", void 0);
                TagsSelectorComponent = __decorate([
                    core_8.Component({
                        selector: 'prime-app',
                        template: "\n        <p-autoComplete [(ngModel)]=\"tags\" [suggestions]=\"filteredtagsMultiple\" (completeMethod)=\"filtertagMultiple($event)\"\n            [minLength]=\"1\" placeholder=\"Select tags & press enter for new tags\" field=\"name\" [multiple]=\"true\" [allowNewInput] = \"isAllowedNewInput\" [inputValues] = \"inputValues\" (onSelect)=\"handleSelectTag($event)\" (onUnselect)=\"handleUnSelectTag($event)\">\n        </p-autoComplete>\n    ",
                        directives: [primeng_1.AutoComplete],
                        providers: [tags_service_1.TagsService]
                    }), 
                    __metadata('design:paramtypes', [tags_service_1.TagsService])
                ], TagsSelectorComponent);
                return TagsSelectorComponent;
            }());
            exports_10("TagsSelectorComponent", TagsSelectorComponent);
        }
    }
});
System.register("services/users.service", ['@angular/core', '@angular/http', "app.constants", "services/auth.service"], function(exports_11, context_11) {
    "use strict";
    var __moduleName = context_11 && context_11.id;
    var core_9, http_5, app_constants_6, auth_service_5;
    var UsersService;
    return {
        setters:[
            function (core_9_1) {
                core_9 = core_9_1;
            },
            function (http_5_1) {
                http_5 = http_5_1;
            },
            function (app_constants_6_1) {
                app_constants_6 = app_constants_6_1;
            },
            function (auth_service_5_1) {
                auth_service_5 = auth_service_5_1;
            }],
        execute: function() {
            UsersService = (function () {
                function UsersService(http, _authService, _configuration) {
                    this.http = http;
                    this._authService = _authService;
                    this._configuration = _configuration;
                    this.webApiUrl = _configuration.ServerWithApiUrl + 'ApplicationUser';
                    this.authService = _authService;
                }
                UsersService.prototype.getUsers = function () {
                    var headers = this.authService.getHeader();
                    headers.append('Content-Type', 'application/json; charset=utf-8');
                    var options = new http_5.RequestOptions({ headers: headers });
                    return this.http.get(this.webApiUrl, options)
                        .toPromise()
                        .then(function (res) { return res.json().users; })
                        .then(function (users) { return users; });
                };
                UsersService = __decorate([
                    core_9.Injectable(), 
                    __metadata('design:paramtypes', [http_5.Http, auth_service_5.AuthService, app_constants_6.Configuration])
                ], UsersService);
                return UsersService;
            }());
            exports_11("UsersService", UsersService);
        }
    }
});
System.register("noteshareusers/users-response", [], function(exports_12, context_12) {
    "use strict";
    var __moduleName = context_12 && context_12.id;
    var UsersResponse, User;
    return {
        setters:[],
        execute: function() {
            UsersResponse = (function () {
                function UsersResponse() {
                }
                return UsersResponse;
            }());
            exports_12("UsersResponse", UsersResponse);
            User = (function () {
                function User() {
                }
                return User;
            }());
            exports_12("User", User);
        }
    }
});
System.register("noteshareusers/users-selector.component", ['@angular/core', 'primeng/primeng', "services/users.service"], function(exports_13, context_13) {
    "use strict";
    var __moduleName = context_13 && context_13.id;
    var core_10, primeng_2, users_service_1;
    var UsersSelectorComponent;
    return {
        setters:[
            function (core_10_1) {
                core_10 = core_10_1;
            },
            function (primeng_2_1) {
                primeng_2 = primeng_2_1;
            },
            function (users_service_1_1) {
                users_service_1 = users_service_1_1;
            }],
        execute: function() {
            UsersSelectorComponent = (function () {
                function UsersSelectorComponent(userService) {
                    this.userService = userService;
                    this.usersAdded = new core_10.EventEmitter();
                    this.usersRemoved = new core_10.EventEmitter();
                    this.users = [];
                }
                UsersSelectorComponent.prototype.filteruserMultiple = function (event) {
                    var _this = this;
                    var query = event.query;
                    this.userService.getUsers().then(function (users) {
                        _this.filteredusersMultiple = _this.filteruser(query, users);
                    });
                };
                UsersSelectorComponent.prototype.filteruser = function (query, users) {
                    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
                    var filtered = [];
                    for (var i = 0; i < users.length; i++) {
                        var user = users[i];
                        if (user.userName.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                            filtered.push(user);
                        }
                    }
                    return filtered;
                };
                UsersSelectorComponent.prototype.handleSelectUser = function () {
                    this.usersAdded.emit(this.users);
                };
                UsersSelectorComponent.prototype.handleUnSelectUser = function () {
                    this.usersRemoved.emit(this.users);
                };
                __decorate([
                    core_10.Output(), 
                    __metadata('design:type', core_10.EventEmitter)
                ], UsersSelectorComponent.prototype, "usersAdded", void 0);
                __decorate([
                    core_10.Output(), 
                    __metadata('design:type', core_10.EventEmitter)
                ], UsersSelectorComponent.prototype, "usersRemoved", void 0);
                __decorate([
                    core_10.Input(), 
                    __metadata('design:type', Boolean)
                ], UsersSelectorComponent.prototype, "isAllowedNewInput", void 0);
                UsersSelectorComponent = __decorate([
                    core_10.Component({
                        selector: 'user-app',
                        template: "\n        <p-autoComplete [(ngModel)]=\"users\" [suggestions]=\"filteredusersMultiple\" (completeMethod)=\"filteruserMultiple($event)\"\n            [minLength]=\"1\" placeholder=\"Select Users\" field=\"userName\" [multiple]=\"true\" [allowNewInput] = \"isAllowedNewInput\" (onSelect)=\"handleSelectUser($event)\" (onUnselect)=\"handleUnSelectUser($event)\">\n        </p-autoComplete>\n    ",
                        directives: [primeng_2.AutoComplete],
                        providers: [users_service_1.UsersService]
                    }), 
                    __metadata('design:paramtypes', [users_service_1.UsersService])
                ], UsersSelectorComponent);
                return UsersSelectorComponent;
            }());
            exports_13("UsersSelectorComponent", UsersSelectorComponent);
        }
    }
});
System.register("modal/components/modal-instance", ['rxjs/Observable', 'rxjs/add/operator/map', 'rxjs/add/observable/fromEvent'], function(exports_14, context_14) {
    "use strict";
    var __moduleName = context_14 && context_14.id;
    var Observable_4;
    var ModalInstance, ModalResult;
    function toPromise(observable) {
        return new Promise(function (resolve, reject) {
            observable.subscribe(function (next) {
                resolve(next);
            });
        });
    }
    return {
        setters:[
            function (Observable_4_1) {
                Observable_4 = Observable_4_1;
            },
            function (_1) {},
            function (_2) {}],
        execute: function() {
            ModalInstance = (function () {
                function ModalInstance(element) {
                    this.element = element;
                    this.suffix = '.ng2-bs3-modal';
                    this.shownEventName = 'shown.bs.modal' + this.suffix;
                    this.hiddenEventName = 'hidden.bs.modal' + this.suffix;
                    this.visible = false;
                    this.init();
                }
                ModalInstance.prototype.open = function () {
                    return this.show();
                };
                ModalInstance.prototype.close = function () {
                    this.result = ModalResult.Close;
                    return this.hide();
                };
                ModalInstance.prototype.dismiss = function () {
                    this.result = ModalResult.Dismiss;
                    return this.hide();
                };
                ModalInstance.prototype.destroy = function () {
                    var _this = this;
                    return this.hide().then(function () {
                        if (_this.$modal) {
                            _this.$modal.data('bs.modal', null);
                            _this.$modal.remove();
                        }
                    });
                };
                ModalInstance.prototype.show = function () {
                    var promise = toPromise(this.shown);
                    this.$modal.modal();
                    return promise;
                };
                ModalInstance.prototype.hide = function () {
                    if (this.$modal && this.visible) {
                        var promise = toPromise(this.hidden);
                        this.$modal.modal('hide');
                        return promise;
                    }
                    return Promise.resolve(this.result);
                };
                ModalInstance.prototype.init = function () {
                    var _this = this;
                    this.$modal = jQuery(this.element.nativeElement);
                    this.$modal.appendTo('body');
                    this.shown = Observable_4.Observable.fromEvent(this.$modal, this.shownEventName)
                        .map(function () {
                        _this.visible = true;
                    });
                    this.hidden = Observable_4.Observable.fromEvent(this.$modal, this.hiddenEventName)
                        .map(function () {
                        var result = (!_this.result || _this.result === ModalResult.None)
                            ? ModalResult.Dismiss : _this.result;
                        _this.result = ModalResult.None;
                        _this.visible = false;
                        return result;
                    });
                };
                return ModalInstance;
            }());
            exports_14("ModalInstance", ModalInstance);
            (function (ModalResult) {
                ModalResult[ModalResult["None"] = 0] = "None";
                ModalResult[ModalResult["Close"] = 1] = "Close";
                ModalResult[ModalResult["Dismiss"] = 2] = "Dismiss";
            })(ModalResult || (ModalResult = {}));
            exports_14("ModalResult", ModalResult);
        }
    }
});
System.register("modal/components/modal", ['@angular/core', "modal/components/modal-instance"], function(exports_15, context_15) {
    "use strict";
    var __moduleName = context_15 && context_15.id;
    var core_11, modal_instance_1;
    var ModalComponent, ModalSize;
    return {
        setters:[
            function (core_11_1) {
                core_11 = core_11_1;
            },
            function (modal_instance_1_1) {
                modal_instance_1 = modal_instance_1_1;
            }],
        execute: function() {
            ModalComponent = (function () {
                function ModalComponent(element) {
                    var _this = this;
                    this.element = element;
                    this.overrideSize = null;
                    this.visible = false;
                    this.animation = true;
                    this.backdrop = true;
                    this.keyboard = true;
                    this.onClose = new core_11.EventEmitter(false);
                    this.onDismiss = new core_11.EventEmitter(false);
                    this.onOpen = new core_11.EventEmitter(false);
                    this.instance = new modal_instance_1.ModalInstance(this.element);
                    this.instance.hidden.subscribe(function (result) {
                        _this.visible = _this.instance.visible;
                        if (result === modal_instance_1.ModalResult.Dismiss)
                            _this.onDismiss.emit(undefined);
                    });
                    this.instance.shown.subscribe(function () {
                        _this.onOpen.emit(undefined);
                    });
                }
                Object.defineProperty(ModalComponent.prototype, "fadeClass", {
                    get: function () { return this.animation; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ModalComponent.prototype, "dataKeyboardAttr", {
                    get: function () { return this.keyboard; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ModalComponent.prototype, "dataBackdropAttr", {
                    get: function () { return this.backdrop; },
                    enumerable: true,
                    configurable: true
                });
                ModalComponent.prototype.ngOnDestroy = function () {
                    return this.instance && this.instance.destroy();
                };
                ModalComponent.prototype.routerCanDeactivate = function () {
                    return this.ngOnDestroy();
                };
                ModalComponent.prototype.open = function (size) {
                    var _this = this;
                    if (ModalSize.validSize(size))
                        this.overrideSize = size;
                    return this.instance.open().then(function () {
                        _this.visible = _this.instance.visible;
                    });
                };
                ModalComponent.prototype.close = function () {
                    var _this = this;
                    return this.instance.close().then(function () {
                        _this.onClose.emit(undefined);
                    });
                };
                ModalComponent.prototype.dismiss = function () {
                    return this.instance.dismiss();
                };
                ModalComponent.prototype.isSmall = function () {
                    return this.overrideSize !== ModalSize.Large
                        && this.size === ModalSize.Small
                        || this.overrideSize === ModalSize.Small;
                };
                ModalComponent.prototype.isLarge = function () {
                    return this.overrideSize !== ModalSize.Small
                        && this.size === ModalSize.Large
                        || this.overrideSize === ModalSize.Large;
                };
                __decorate([
                    core_11.Input(), 
                    __metadata('design:type', Boolean)
                ], ModalComponent.prototype, "animation", void 0);
                __decorate([
                    core_11.Input(), 
                    __metadata('design:type', Object)
                ], ModalComponent.prototype, "backdrop", void 0);
                __decorate([
                    core_11.Input(), 
                    __metadata('design:type', Boolean)
                ], ModalComponent.prototype, "keyboard", void 0);
                __decorate([
                    core_11.Input(), 
                    __metadata('design:type', String)
                ], ModalComponent.prototype, "size", void 0);
                __decorate([
                    core_11.Output(), 
                    __metadata('design:type', core_11.EventEmitter)
                ], ModalComponent.prototype, "onClose", void 0);
                __decorate([
                    core_11.Output(), 
                    __metadata('design:type', core_11.EventEmitter)
                ], ModalComponent.prototype, "onDismiss", void 0);
                __decorate([
                    core_11.Output(), 
                    __metadata('design:type', core_11.EventEmitter)
                ], ModalComponent.prototype, "onOpen", void 0);
                __decorate([
                    core_11.HostBinding('class.fade'), 
                    __metadata('design:type', Boolean)
                ], ModalComponent.prototype, "fadeClass", null);
                __decorate([
                    core_11.HostBinding('attr.data-keyboard'), 
                    __metadata('design:type', Boolean)
                ], ModalComponent.prototype, "dataKeyboardAttr", null);
                __decorate([
                    core_11.HostBinding('attr.data-backdrop'), 
                    __metadata('design:type', Object)
                ], ModalComponent.prototype, "dataBackdropAttr", null);
                ModalComponent = __decorate([
                    core_11.Component({
                        selector: 'modal',
                        host: {
                            'class': 'modal',
                            'role': 'dialog',
                            'tabindex': '-1'
                        },
                        template: "\n        <div class=\"modal-dialog\" [ngClass]=\"{ 'modal-sm': isSmall(), 'modal-lg': isLarge() }\">\n            <div class=\"modal-content\">\n                <ng-content></ng-content>\n            </div>\n        </div>\n    "
                    }), 
                    __metadata('design:paramtypes', [core_11.ElementRef])
                ], ModalComponent);
                return ModalComponent;
            }());
            exports_15("ModalComponent", ModalComponent);
            ModalSize = (function () {
                function ModalSize() {
                }
                ModalSize.validSize = function (size) {
                    return size && (size === ModalSize.Small || size === ModalSize.Large);
                };
                ModalSize.Small = 'sm';
                ModalSize.Large = 'lg';
                return ModalSize;
            }());
            exports_15("ModalSize", ModalSize);
        }
    }
});
System.register("modal/components/modal-header", ['@angular/core', "modal/components/modal"], function(exports_16, context_16) {
    "use strict";
    var __moduleName = context_16 && context_16.id;
    var core_12, modal_1;
    var ModalHeaderComponent;
    return {
        setters:[
            function (core_12_1) {
                core_12 = core_12_1;
            },
            function (modal_1_1) {
                modal_1 = modal_1_1;
            }],
        execute: function() {
            ModalHeaderComponent = (function () {
                function ModalHeaderComponent(modal) {
                    this.modal = modal;
                    this.showClose = false;
                }
                __decorate([
                    core_12.Input('show-close'), 
                    __metadata('design:type', Boolean)
                ], ModalHeaderComponent.prototype, "showClose", void 0);
                ModalHeaderComponent = __decorate([
                    core_12.Component({
                        selector: 'modal-header',
                        template: "\n        <div class=\"modal-header\">\n            <button *ngIf=\"showClose\" type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\" (click)=\"modal.dismiss()\">\n                <span aria-hidden=\"true\">&times;</span>\n            </button>\n            <ng-content></ng-content>\n        </div>\n    "
                    }), 
                    __metadata('design:paramtypes', [modal_1.ModalComponent])
                ], ModalHeaderComponent);
                return ModalHeaderComponent;
            }());
            exports_16("ModalHeaderComponent", ModalHeaderComponent);
        }
    }
});
System.register("modal/components/modal-body", ['@angular/core', "modal/components/modal"], function(exports_17, context_17) {
    "use strict";
    var __moduleName = context_17 && context_17.id;
    var core_13, modal_2;
    var ModalBodyComponent;
    return {
        setters:[
            function (core_13_1) {
                core_13 = core_13_1;
            },
            function (modal_2_1) {
                modal_2 = modal_2_1;
            }],
        execute: function() {
            ModalBodyComponent = (function () {
                function ModalBodyComponent(modal) {
                    this.modal = modal;
                }
                ModalBodyComponent = __decorate([
                    core_13.Component({
                        selector: 'modal-body',
                        template: "\n        <div class=\"modal-body\">\n            <ng-content></ng-content>\n        </div>\n    "
                    }), 
                    __metadata('design:paramtypes', [modal_2.ModalComponent])
                ], ModalBodyComponent);
                return ModalBodyComponent;
            }());
            exports_17("ModalBodyComponent", ModalBodyComponent);
        }
    }
});
System.register("modal/components/modal-footer", ['@angular/core', "modal/components/modal"], function(exports_18, context_18) {
    "use strict";
    var __moduleName = context_18 && context_18.id;
    var core_14, modal_3;
    var ModalFooterComponent;
    return {
        setters:[
            function (core_14_1) {
                core_14 = core_14_1;
            },
            function (modal_3_1) {
                modal_3 = modal_3_1;
            }],
        execute: function() {
            ModalFooterComponent = (function () {
                function ModalFooterComponent(modal) {
                    this.modal = modal;
                    this.showDefaultButtons = false;
                }
                __decorate([
                    core_14.Input('show-default-buttons'), 
                    __metadata('design:type', Boolean)
                ], ModalFooterComponent.prototype, "showDefaultButtons", void 0);
                ModalFooterComponent = __decorate([
                    core_14.Component({
                        selector: 'modal-footer',
                        template: "\n        <div class=\"modal-footer\">\n            <ng-content></ng-content>\n            <button *ngIf=\"showDefaultButtons\" type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\" (click)=\"modal.dismiss()\">Close</button>\n            <button *ngIf=\"showDefaultButtons\" type=\"button\" class=\"btn btn-primary\" (click)=\"modal.close()\">Save</button>\n        </div>\n    "
                    }), 
                    __metadata('design:paramtypes', [modal_3.ModalComponent])
                ], ModalFooterComponent);
                return ModalFooterComponent;
            }());
            exports_18("ModalFooterComponent", ModalFooterComponent);
        }
    }
});
System.register("modal/modaldialog", ["modal/components/modal", "modal/components/modal-header", "modal/components/modal-body", "modal/components/modal-footer", "modal/components/modal-instance"], function(exports_19, context_19) {
    "use strict";
    var __moduleName = context_19 && context_19.id;
    var modal_4, modal_header_1, modal_body_1, modal_footer_1;
    var MODAL_DIRECTIVES;
    var exportedNames_1 = {
        'MODAL_DIRECTIVES': true
    };
    function exportStar_1(m) {
        var exports = {};
        for(var n in m) {
            if (n !== "default"&& !exportedNames_1.hasOwnProperty(n)) exports[n] = m[n];
        }
        exports_19(exports);
    }
    return {
        setters:[
            function (modal_4_1) {
                modal_4 = modal_4_1;
                exportStar_1(modal_4_1);
            },
            function (modal_header_1_1) {
                modal_header_1 = modal_header_1_1;
                exportStar_1(modal_header_1_1);
            },
            function (modal_body_1_1) {
                modal_body_1 = modal_body_1_1;
                exportStar_1(modal_body_1_1);
            },
            function (modal_footer_1_1) {
                modal_footer_1 = modal_footer_1_1;
                exportStar_1(modal_footer_1_1);
            },
            function (modal_instance_2_1) {
                exportStar_1(modal_instance_2_1);
            }],
        execute: function() {
            exports_19("MODAL_DIRECTIVES", MODAL_DIRECTIVES = [
                modal_4.ModalComponent,
                modal_header_1.ModalHeaderComponent,
                modal_body_1.ModalBodyComponent,
                modal_footer_1.ModalFooterComponent
            ]);
        }
    }
});
System.register("services/passtag.service", ['@angular/core'], function(exports_20, context_20) {
    "use strict";
    var __moduleName = context_20 && context_20.id;
    var core_15;
    var PassTagService;
    return {
        setters:[
            function (core_15_1) {
                core_15 = core_15_1;
            }],
        execute: function() {
            PassTagService = (function () {
                function PassTagService() {
                    this._selectedTags = '';
                }
                PassTagService.prototype.getTags = function () {
                    return this._selectedTags;
                };
                PassTagService.prototype.setTags = function (tags) {
                    this._selectedTags = tags;
                };
                PassTagService = __decorate([
                    core_15.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], PassTagService);
                return PassTagService;
            }());
            exports_20("PassTagService", PassTagService);
        }
    }
});
System.register("fileuploader/file-uploader.component", ["@angular/core"], function(exports_21, context_21) {
    "use strict";
    var __moduleName = context_21 && context_21.id;
    var core_16;
    var FileUploaderComponent, FileToUpload;
    return {
        setters:[
            function (core_16_1) {
                core_16 = core_16_1;
            }],
        execute: function() {
            FileUploaderComponent = (function () {
                function FileUploaderComponent() {
                }
                FileUploaderComponent.prototype.fileChangeEvent = function (event) {
                    var files = event.srcElement.files;
                    this.updateLocalObject(files);
                    this.showFilePreview(files);
                };
                FileUploaderComponent.prototype.updateLocalObject = function (files) {
                    for (var index = 0; index < files.length; index++) {
                        var newFile = new FileToUpload();
                        // newFile.id = index;
                        newFile.file = files[index];
                        this.filesToUpload.push(newFile);
                    }
                };
                FileUploaderComponent.prototype.showFilePreview = function (files) {
                    var _this = this;
                    var reader = []; // create empt array for readers
                    for (var index = 0; index < files.length; index++) {
                        reader.push(new FileReader());
                        reader[index].addEventListener("load", function (event) {
                            var matchingIndex = _this.filesToUpload.findIndex(function (x) { return x.file.name == files[0].name; });
                            var a = event.target.result;
                            _this.filesToUpload[matchingIndex].previwSrc = event.target.result;
                        }, false);
                        if (files[index]) {
                            reader[index].readAsDataURL(files[index]);
                        }
                    }
                };
                FileUploaderComponent.prototype.removeFile = function (file) {
                    var index = this.filesToUpload.findIndex(function (x) { return x === file; });
                    this.filesToUpload.splice(index, 1);
                };
                __decorate([
                    core_16.Input(), 
                    __metadata('design:type', Array)
                ], FileUploaderComponent.prototype, "filesToUpload", void 0);
                FileUploaderComponent = __decorate([
                    core_16.Component({
                        selector: 'file-uploader',
                        templateUrl: './app/fileuploader/file-uploader.component.html'
                    }), 
                    __metadata('design:paramtypes', [])
                ], FileUploaderComponent);
                return FileUploaderComponent;
            }());
            exports_21("FileUploaderComponent", FileUploaderComponent);
            FileToUpload = (function () {
                function FileToUpload() {
                }
                return FileToUpload;
            }());
            exports_21("FileToUpload", FileToUpload);
        }
    }
});
System.register("loader/loading.component", ['@angular/core'], function(exports_22, context_22) {
    "use strict";
    var __moduleName = context_22 && context_22.id;
    var core_17;
    var LoadingComponent;
    return {
        setters:[
            function (core_17_1) {
                core_17 = core_17_1;
            }],
        execute: function() {
            LoadingComponent = (function () {
                function LoadingComponent(zone) {
                    this.zone = zone;
                    this.showLoading = false;
                    window.loadingComponentRef = {
                        zone: this.zone,
                        component: this
                    };
                }
                LoadingComponent.prototype.show = function () { this.showLoading = true; };
                LoadingComponent.prototype.hide = function () { this.showLoading = false; };
                LoadingComponent = __decorate([
                    core_17.Component({
                        selector: 'loading',
                        templateUrl: 'app/loader/loading.component.html'
                    }), 
                    __metadata('design:paramtypes', [core_17.NgZone])
                ], LoadingComponent);
                return LoadingComponent;
            }());
            exports_22("LoadingComponent", LoadingComponent);
        }
    }
});
System.register("notes/note-editor.component", ['@angular/core', 'primeng/primeng', "services/tags.service"], function(exports_23, context_23) {
    "use strict";
    var __moduleName = context_23 && context_23.id;
    var core_18, primeng_3, tags_service_2;
    var NoteEditorComponent;
    return {
        setters:[
            function (core_18_1) {
                core_18 = core_18_1;
            },
            function (primeng_3_1) {
                primeng_3 = primeng_3_1;
            },
            function (tags_service_2_1) {
                tags_service_2 = tags_service_2_1;
            }],
        execute: function() {
            NoteEditorComponent = (function () {
                function NoteEditorComponent(tagService) {
                    this.tagService = tagService;
                    this.tags = [];
                    this.tagsAddedEditor = new core_18.EventEmitter();
                    this.tagsAddedDescription = new core_18.EventEmitter();
                }
                // @Output() tagsRemoved: EventEmitter<TagsResponse[]> = new EventEmitter<TagsResponse[]>();
                NoteEditorComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    if (typeof this.filteredtagsMultiple == 'undefined') {
                        this.filteredtagsMultiple = new Array();
                    }
                    if (typeof this.tagsArray == 'undefined') {
                        this.tagsArray = new Array();
                    }
                    if (this.filteredtagsMultiple.length == 0) {
                        this.tagService.getTags().then(function (tags) {
                            _this.filteredtagsMultiple = tags;
                        });
                    }
                };
                NoteEditorComponent.prototype.OnTextChange = function (event) {
                    console.log(event.textValue);
                    console.log(event.htmlValue);
                    console.log(event.delta);
                    var query = event.textValue;
                    query = query.replace(/(\r\n|\n|\r)/gm, "");
                    var splitArray = query.split('/');
                    if (splitArray.length == 3) {
                        this.tagsArray.push(splitArray[1]);
                    }
                    var param = splitArray[1];
                    this.inputHTMLValue = event.htmlValue;
                    this.inputValue = event.textValue + "12";
                    // var text1 = event.htmlValue.replace(/(<([^>]+)>)/ig, "").trim();
                    // var replaced = text1.search(param) >= 0;
                    // if (replaced) {
                    //     document.body.innerHTML = text1.replace(param, '*' + param + '*');
                    //  } else {
                    //param was not replaced   //What to do here?
                    //   }
                    // this.filtertag(query, this.filteredtagsMultiple);
                };
                NoteEditorComponent.prototype.OnSelectionChange = function (event) {
                    var x = event.text.replace(/(\r\n|\n|\r)/gm, "");
                    var edDescription = x.replace(/\//g, ' ');
                    var tagsArray = [];
                    var tagsReturn = [];
                    var existingTags = [];
                    var inputString = '';
                    tagsArray = x.trim().split('/');
                    var i = 0;
                    for (var s = 0; s < tagsArray.length; s++) {
                        var z = (s % 2);
                        inputString = tagsArray[s].trim();
                        inputString = inputString.replace(/[^a-zA-Z0-9\s]/g, "");
                        if (inputString.length > 0) {
                            var isIncrement = false;
                            if (z == 1) {
                                tagsReturn[i] = tagsArray[s].trim();
                            }
                            if (z == 0) {
                                console.log(this.filteredtagsMultiple);
                                for (var u = 0; u < this.filteredtagsMultiple.length; u++) {
                                    var tag = this.filteredtagsMultiple[u];
                                    if (tag != undefined && tag.name != null) {
                                        var posArray = tagsArray[s].trim().split(/\s/);
                                        if (posArray.length > 1) {
                                            isIncrement = true;
                                            //for (let v = 0; v < posArray.length; v++) {
                                            //    if (tag.name.toLowerCase().indexOf(posArray[v].toLowerCase().trim()) !== -1 && tag.name.trim().length == posArray[v].trim().length) {
                                            //        tagsReturn[i] = tag.name;
                                            //        i = i + 1;
                                            //    }
                                            //}
                                            //if (tagsArray[s].toLowerCase().indexOf(tag.name.toLowerCase().trim()) !== -1 && tag.name.trim().length < tagsArray[s].trim().length) {
                                            //    tagsReturn[i] = tag.name;
                                            //    i = i + 1;
                                            //}
                                            var regex = new RegExp('\\b' + tag.name.toLowerCase().trim() + '\\b');
                                            var index = tagsArray[s].toLowerCase().search(regex);
                                            if (index > -1) {
                                                tagsReturn[i] = tag.name;
                                                i = i + 1;
                                            }
                                        }
                                        else {
                                            if (tag.name.toLowerCase().indexOf(tagsArray[s].toLowerCase().trim()) !== -1 && tag.name.trim().length == tagsArray[s].trim().length) {
                                                tagsReturn[i] = tag.name;
                                            }
                                        }
                                    }
                                }
                            }
                            if (!isIncrement)
                                i = i + 1;
                        }
                    }
                    var uniqueArray = this.removeDuplicates(tagsReturn);
                    this.tagsAddedEditor.emit(uniqueArray);
                    this.tagsAddedDescription.emit(edDescription);
                };
                NoteEditorComponent.prototype.removeDuplicates = function (num) {
                    var x, len = num.length, out = [], obj = {};
                    for (x = 0; x < len; x++) {
                        obj[num[x]] = 0;
                    }
                    for (x in obj) {
                        if (x != 'undefined')
                            out.push(x);
                    }
                    return out;
                };
                NoteEditorComponent.prototype.filterTag = function () {
                    console.log("dsfdsf");
                    //for (let i = 0; i < tags.length; i++) {
                    //}
                    //for (let i = 0; i < tags.length; i++) {
                    //    let tag = tags[i];
                    //    if (tag != undefined && tag.name != null) {
                    //        if (tag.name.toLowerCase().match(query.toLowerCase())[0]) {
                    //            return true;
                    //        }
                    //        else {
                    //            return false;
                    //        }
                    //    }
                    //    else {
                    //        return false;}
                    //}
                };
                __decorate([
                    core_18.Output(), 
                    __metadata('design:type', core_18.EventEmitter)
                ], NoteEditorComponent.prototype, "tagsAddedEditor", void 0);
                __decorate([
                    core_18.Output(), 
                    __metadata('design:type', core_18.EventEmitter)
                ], NoteEditorComponent.prototype, "tagsAddedDescription", void 0);
                NoteEditorComponent = __decorate([
                    core_18.Component({
                        selector: 'prime-editor',
                        template: "\n        <p-editor (onTextChange)=\"OnTextChange($event)\" (onSelectionChange)=\"OnSelectionChange($event)\"> \n        </p-editor>\n    ",
                        directives: [primeng_3.Editor],
                        providers: [tags_service_2.TagsService]
                    }), 
                    __metadata('design:paramtypes', [tags_service_2.TagsService])
                ], NoteEditorComponent);
                return NoteEditorComponent;
            }());
            exports_23("NoteEditorComponent", NoteEditorComponent);
        }
    }
});
System.register("notes/add-note.component", ['@angular/core', "notes/note-request", "services/notes.service", "tags/tags-selector.component", "noteshareusers/users-selector.component", "modal/modaldialog", 'primeng/primeng', '@angular/router', "services/passtag.service", "services/user_profile.service", "fileuploader/file-uploader.component", "notes/note-editor.component"], function(exports_24, context_24) {
    "use strict";
    var __moduleName = context_24 && context_24.id;
    var core_19, note_request_1, notes_service_1, tags_selector_component_1, users_selector_component_1, modaldialog_1, primeng_4, primeng_5, router_3, passtag_service_1, user_profile_service_2, file_uploader_component_1, note_editor_component_1;
    var AddNoteComponent;
    return {
        setters:[
            function (core_19_1) {
                core_19 = core_19_1;
            },
            function (note_request_1_1) {
                note_request_1 = note_request_1_1;
            },
            function (notes_service_1_1) {
                notes_service_1 = notes_service_1_1;
            },
            function (tags_selector_component_1_1) {
                tags_selector_component_1 = tags_selector_component_1_1;
            },
            function (users_selector_component_1_1) {
                users_selector_component_1 = users_selector_component_1_1;
            },
            function (modaldialog_1_1) {
                modaldialog_1 = modaldialog_1_1;
            },
            function (primeng_4_1) {
                primeng_4 = primeng_4_1;
                primeng_5 = primeng_4_1;
            },
            function (router_3_1) {
                router_3 = router_3_1;
            },
            function (passtag_service_1_1) {
                passtag_service_1 = passtag_service_1_1;
            },
            function (user_profile_service_2_1) {
                user_profile_service_2 = user_profile_service_2_1;
            },
            function (file_uploader_component_1_1) {
                file_uploader_component_1 = file_uploader_component_1_1;
            },
            function (note_editor_component_1_1) {
                note_editor_component_1 = note_editor_component_1_1;
            }],
        execute: function() {
            AddNoteComponent = (function () {
                function AddNoteComponent(_notesService, _router, _passTagService, _userProfileService, zone) {
                    this._notesService = _notesService;
                    this._router = _router;
                    this._passTagService = _passTagService;
                    this._userProfileService = _userProfileService;
                    this.zone = zone;
                    this.noteRequest = {
                        title: '',
                        description: '',
                        tags: [],
                        users: [],
                        filesToUpload: [],
                        attachments: []
                    };
                    this.userProfileData = {
                        email: '',
                        name: '',
                        profileImageId: '',
                        userTags: []
                    };
                    this.heading = "ADD NOTES";
                    this.tags = [];
                    this.users = [];
                    this.tagList = '';
                    this.active = true;
                    this.tagsStr = '';
                    this.isFromSlider = false;
                    this.isToggle = false;
                    this.passedTags = [];
                    this.initialTags = [];
                    this.automaticInitialTags = [];
                    this.userAddedTags = [];
                    this.showCloseButton = false;
                    window.angularComponentRef = {
                        zone: this.zone,
                        component: this
                    };
                }
                AddNoteComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.active = false;
                    this._userProfileService.getUserProfile()
                        .subscribe(function (data) {
                        _this.userProfileData = JSON.parse(JSON.stringify(data));
                        _this.initialTags.push(_this.userProfileData.name);
                        if (_this.userProfileData.userTags && _this.userProfileData.userTags.length > 0) {
                            var tags = _this.userProfileData.userTags;
                            for (var x = 0; x < tags.length; x++) {
                                _this.initialTags.push(tags[x].description);
                            }
                        }
                        _this.istagSelectionValidated = true;
                        _this.isToggle = false;
                        if (ip_country && ip_country != '')
                            _this.initialTags.push(ip_country.trim());
                        _this.noteRequest.tags = _this.initialTags;
                        _this.active = true;
                    }, function (error) {
                        _this.errorMessage = error,
                            console.log(_this.errorMessage);
                    }, function () { return function () { return console.log("Done"); }; });
                };
                AddNoteComponent.prototype.Save = function () {
                    var _this = this;
                    var inputTagStr = $('#tagInput').text();
                    if (inputTagStr.trim() == '') {
                        if (this.noteRequest.tags.length == 0) {
                            this.istagSelectionValidated = false;
                            return;
                        }
                        else
                            this.istagSelectionValidated = true;
                        this.isFromSlider = false;
                    }
                    else {
                        this.noteRequest.tags = inputTagStr.trim().split(",");
                        this.istagSelectionValidated = true;
                        this.isFromSlider = true;
                    }
                    window.loadingComponentRef.zone.run(function () { window.loadingComponentRef.component.show(); });
                    this._notesService.addNote(this.noteRequest)
                        .subscribe(function (note) {
                        _this.tagList = '';
                        for (var i = 0; i < note.tags.length; i++) {
                            _this.tagList = _this.tagList + (note.tags[i].name + (note.tags.length != i + 1 ? ',' : ''));
                        }
                        _this.clear();
                        window.loadingComponentRef.zone.run(function () { window.loadingComponentRef.component.hide(); });
                        if (_this.isFromSlider) {
                            if (_this.isToggle)
                                _this._router.navigate(['/timeline', { tags: _this.tagList + ',,' }]);
                            else
                                _this._router.navigate(['/timeline', { tags: _this.tagList + ',' }]);
                            _this.isToggle = !_this.isToggle;
                        }
                        else {
                            _this._router.navigate(['/timeline', { tags: _this.tagList }]);
                        }
                    }, function (error) {
                        _this.errorMessage = error,
                            console.log(_this.errorMessage);
                        window.loadingComponentRef.zone.run(function () { window.loadingComponentRef.component.hide(); });
                    }, function () { return function () {
                        console.log("Done");
                        window.loadingComponentRef.zone.run(function () { window.loadingComponentRef.component.hide(); });
                    }; });
                };
                AddNoteComponent.prototype.Share = function () {
                    console.log('Share This Note');
                };
                AddNoteComponent.prototype.onSelectedTagsChanged = function (tags) {
                    var automaticInitialTags = this.automaticInitialTags;
                    var userAddedTags = [];
                    //Identify user entered tags via Autocomplete component
                    this.noteRequest.tags = tags.map(function (d) {
                        var tag = d['name'];
                        if (automaticInitialTags.indexOf(tag) === -1) {
                            userAddedTags.push(tag);
                        }
                        return tag;
                    });
                    this.userAddedTags = userAddedTags;
                    if (this.noteRequest.tags.length == 0) {
                        this.istagSelectionValidated = false;
                    }
                    else
                        this.istagSelectionValidated = true;
                };
                AddNoteComponent.prototype.onSelectedUsersChanged = function (users) {
                    this.noteRequest.users = users.map(function (d) { return d['userName']; });
                };
                AddNoteComponent.prototype.clear = function () {
                    var _this = this;
                    this.noteRequest = new note_request_1.NoteRequest('', '', [], [], [], []);
                    this.active = false;
                    setTimeout(function () { return _this.active = true; }, 0);
                };
                AddNoteComponent.prototype.TagsAdded = function (tags) {
                    var stringTags = [];
                    //automaticInitialTags = InitialTags + Automatic tags
                    var automaticInitialTags = [];
                    //Get existing tags from AutoComplete component 
                    var existingTags = this.noteRequest.tags.map(function (item) {
                        return item.toString().toLowerCase();
                    });
                    //Add initial tags if exists in existingTags array.
                    this.initialTags.map(function (item) {
                        if (existingTags.indexOf(item.toLowerCase()) !== -1) {
                            stringTags.push(item);
                            automaticInitialTags.push(item);
                        }
                    });
                    this.userAddedTags.map(function (item) {
                        if (existingTags.indexOf(item.toLowerCase()) !== -1) {
                            stringTags.push(item);
                        }
                    });
                    tags.map(function (e) {
                        stringTags.push(e);
                        automaticInitialTags.push(e);
                    });
                    //Case insensitive duplicate removal
                    stringTags = stringTags.reduce(function (a, b) {
                        var strArray = a.toString().toLowerCase().split(',');
                        if (strArray.indexOf(b.toLowerCase()) < 0)
                            a.push(b);
                        return a;
                    }, []);
                    this.automaticInitialTags = automaticInitialTags;
                    if (stringTags.length != 0) {
                        this.noteRequest.tags.length = 0;
                        this.noteRequest.tags = stringTags;
                        window.AutoCompleteComponentRef.zone.run(function () { window.AutoCompleteComponentRef.component.LoadExternalInputData(true); });
                    }
                };
                AddNoteComponent.prototype.TagsAddedDesc = function (event) {
                    this.noteRequest.description = event;
                };
                AddNoteComponent.prototype.updateSelectedTags = function () {
                    this.tagsStr = this._passTagService.getTags();
                    console.log('calledFromOutside ' + this._passTagService.getTags());
                    if (this.tagsStr != null) {
                        var tagsArr = this.tagsStr.split(",");
                        for (var i = 0; i < tagsArr.length; i++) {
                            var tag = tagsArr[i];
                            this.passedTags.push(tag);
                        }
                        this.noteRequest.tags = this.passedTags;
                    }
                    console.log('calledFromOutside tags ' + this.noteRequest.tags);
                };
                AddNoteComponent.prototype.Close = function () {
                    this.clear();
                };
                __decorate([
                    core_19.Input(), 
                    __metadata('design:type', Boolean)
                ], AddNoteComponent.prototype, "showCloseButton", void 0);
                AddNoteComponent = __decorate([
                    core_19.Component({
                        selector: 'add-note',
                        templateUrl: './app/notes/add-note.component.html',
                        providers: [
                            notes_service_1.NotesService,
                            user_profile_service_2.UserProfileService
                        ],
                        directives: [tags_selector_component_1.TagsSelectorComponent, modaldialog_1.MODAL_DIRECTIVES, primeng_4.Editor, primeng_5.Header, users_selector_component_1.UsersSelectorComponent, file_uploader_component_1.FileUploaderComponent, note_editor_component_1.NoteEditorComponent]
                    }), 
                    __metadata('design:paramtypes', [notes_service_1.NotesService, router_3.Router, passtag_service_1.PassTagService, user_profile_service_2.UserProfileService, core_19.NgZone])
                ], AddNoteComponent);
                return AddNoteComponent;
            }());
            exports_24("AddNoteComponent", AddNoteComponent);
        }
    }
});
System.register("timeline/timeline-response", [], function(exports_25, context_25) {
    "use strict";
    var __moduleName = context_25 && context_25.id;
    var TimeLineResponse, TimeLineSingleResponse;
    return {
        setters:[],
        execute: function() {
            TimeLineResponse = (function () {
                function TimeLineResponse() {
                }
                return TimeLineResponse;
            }());
            exports_25("TimeLineResponse", TimeLineResponse);
            TimeLineSingleResponse = (function () {
                function TimeLineSingleResponse() {
                }
                return TimeLineSingleResponse;
            }());
            exports_25("TimeLineSingleResponse", TimeLineSingleResponse);
        }
    }
});
System.register("services/timeline.service", ['@angular/core', '@angular/http', 'rxjs/Observable', "services/auth.service", "app.constants"], function(exports_26, context_26) {
    "use strict";
    var __moduleName = context_26 && context_26.id;
    var core_20, http_6, Observable_5, auth_service_6, app_constants_7;
    var TimeLineService;
    return {
        setters:[
            function (core_20_1) {
                core_20 = core_20_1;
            },
            function (http_6_1) {
                http_6 = http_6_1;
            },
            function (Observable_5_1) {
                Observable_5 = Observable_5_1;
            },
            function (auth_service_6_1) {
                auth_service_6 = auth_service_6_1;
            },
            function (app_constants_7_1) {
                app_constants_7 = app_constants_7_1;
            }],
        execute: function() {
            TimeLineService = (function () {
                function TimeLineService(http, _authService, _configuration) {
                    this.http = http;
                    this._authService = _authService;
                    this._configuration = _configuration;
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
                TimeLineService.prototype.getTimeLines = function (timeLineRequest) {
                    var body = JSON.stringify(timeLineRequest);
                    var headers = this.authService.getHeader();
                    headers.append('Content-Type', 'application/json; charset=utf-8');
                    var options = new http_6.RequestOptions({ headers: headers });
                    return this.http.post(this.webApiUrl, body, options)
                        .map(function (res) { return res.json(); })
                        .do(function (data) { return console.log(data); })
                        .catch(this.handleError);
                };
                TimeLineService.prototype.getMostPopularTags = function (timeLineRequest) {
                    var most_pop_url = this.webApiUrl + "/GetTrendingTimelines";
                    var body = JSON.stringify(timeLineRequest);
                    var headers = this.authService.getHeader();
                    headers.append('Content-Type', 'application/json; charset=utf-8');
                    var options = new http_6.RequestOptions({ headers: headers });
                    return this.http.get(most_pop_url, { headers: headers })
                        .map(function (res) { return res.json(); });
                };
                TimeLineService.prototype.handleError = function (error) {
                    console.error(error);
                    return Observable_5.Observable.throw(error.json().error || 'Server error');
                };
                TimeLineService = __decorate([
                    core_20.Injectable(), 
                    __metadata('design:paramtypes', [http_6.Http, auth_service_6.AuthService, app_constants_7.Configuration])
                ], TimeLineService);
                return TimeLineService;
            }());
            exports_26("TimeLineService", TimeLineService);
        }
    }
});
System.register("timeline/timeline-request", [], function(exports_27, context_27) {
    "use strict";
    var __moduleName = context_27 && context_27.id;
    var TimeLineRequest;
    return {
        setters:[],
        execute: function() {
            TimeLineRequest = (function () {
                function TimeLineRequest() {
                }
                return TimeLineRequest;
            }());
            exports_27("TimeLineRequest", TimeLineRequest);
        }
    }
});
System.register("timeline/timelinegroup/timelinegroup.component", ['@angular/core'], function(exports_28, context_28) {
    "use strict";
    var __moduleName = context_28 && context_28.id;
    var core_21;
    var TimelineInfo, TimelineGroup;
    return {
        setters:[
            function (core_21_1) {
                core_21 = core_21_1;
            }],
        execute: function() {
            TimelineInfo = (function () {
                function TimelineInfo() {
                    this.groups = [];
                }
                TimelineInfo.prototype.addGroup = function (group) { this.groups.push(group); };
                TimelineInfo.prototype.closeOthers = function (openGroup) {
                    if (!this.onlyOneOpen) {
                        return;
                    }
                    this.groups.forEach(function (group) {
                        if (group !== openGroup) {
                            group.isOpen = false;
                        }
                    });
                };
                TimelineInfo.prototype.removeGroup = function (group) {
                    var index = this.groups.indexOf(group);
                    if (index !== -1) {
                        this.groups.splice(index, 1);
                    }
                };
                __decorate([
                    core_21.Input('closeOthers'), 
                    __metadata('design:type', Boolean)
                ], TimelineInfo.prototype, "onlyOneOpen", void 0);
                TimelineInfo = __decorate([
                    core_21.Component({
                        selector: 'timelineinfo',
                        template: "<ng-content></ng-content>"
                    }), 
                    __metadata('design:paramtypes', [])
                ], TimelineInfo);
                return TimelineInfo;
            }());
            exports_28("TimelineInfo", TimelineInfo);
            TimelineGroup = (function () {
                function TimelineGroup(timelineInfo) {
                    this.timelineInfo = timelineInfo;
                    this._isOpen = false;
                    this.timelineInfo.addGroup(this);
                }
                TimelineGroup.prototype.toggleOpen = function (event) {
                    event.preventDefault();
                    if (!this.isDisabled) {
                        this.isOpen = !this.isOpen;
                    }
                };
                TimelineGroup.prototype.ngOnDestroy = function () { this.timelineInfo.removeGroup(this); };
                Object.defineProperty(TimelineGroup.prototype, "isOpen", {
                    get: function () { return this._isOpen; },
                    set: function (value) {
                        this._isOpen = value;
                        if (value) {
                            this.timelineInfo.closeOthers(this);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                TimelineGroup = __decorate([
                    core_21.Component({
                        selector: 'timeline-group',
                        inputs: ['heading', 'isOpen', 'isDisabled', 'availableCountText'],
                        templateUrl: './app/timeline/timelinegroup/timelinegroup.component.html'
                    }), 
                    __metadata('design:paramtypes', [TimelineInfo])
                ], TimelineGroup);
                return TimelineGroup;
            }());
            exports_28("TimelineGroup", TimelineGroup);
        }
    }
});
System.register("timeline/timelinegroup/timelinedetail.component", ['@angular/core'], function(exports_29, context_29) {
    "use strict";
    var __moduleName = context_29 && context_29.id;
    var core_22;
    var TimelineDetail, TimelineDetailGroup;
    return {
        setters:[
            function (core_22_1) {
                core_22 = core_22_1;
            }],
        execute: function() {
            TimelineDetail = (function () {
                function TimelineDetail() {
                    this.groups = [];
                }
                TimelineDetail.prototype.addGroup = function (group) { this.groups.push(group); };
                TimelineDetail.prototype.closeOthers = function (openGroup) {
                    if (!this.onlyOneOpen) {
                        return;
                    }
                    this.groups.forEach(function (group) {
                        if (group !== openGroup) {
                            group.isOpen = false;
                        }
                    });
                };
                TimelineDetail.prototype.removeGroup = function (group) {
                    var index = this.groups.indexOf(group);
                    if (index !== -1) {
                        this.groups.splice(index, 1);
                    }
                };
                __decorate([
                    core_22.Input('closeOthers'), 
                    __metadata('design:type', Boolean)
                ], TimelineDetail.prototype, "onlyOneOpen", void 0);
                TimelineDetail = __decorate([
                    core_22.Component({
                        selector: 'timelinedetail',
                        template: "<ng-content></ng-content>"
                    }), 
                    __metadata('design:paramtypes', [])
                ], TimelineDetail);
                return TimelineDetail;
            }());
            exports_29("TimelineDetail", TimelineDetail);
            TimelineDetailGroup = (function () {
                function TimelineDetailGroup(timelineDetail) {
                    this.timelineDetail = timelineDetail;
                    this._isOpen = false;
                    this.showhideText = "show";
                    this.showhideStyle = "zmdi zmdi-chevron-down";
                    this.timelineDetail.addGroup(this);
                }
                TimelineDetailGroup.prototype.toggleOpen = function (event) {
                    event.preventDefault();
                    if (!this.isDisabled) {
                        this.isOpen = !this.isOpen;
                    }
                    if (this.showhideText === "show") {
                        this.showhideText = "hide";
                        this.showhideStyle = "zmdi zmdi-chevron-up";
                    }
                    else {
                        this.showhideText = "show";
                        this.showhideStyle = "zmdi zmdi-chevron-down";
                    }
                };
                TimelineDetailGroup.prototype.ngOnDestroy = function () { this.timelineDetail.removeGroup(this); };
                Object.defineProperty(TimelineDetailGroup.prototype, "isOpen", {
                    get: function () { return this._isOpen; },
                    set: function (value) {
                        this._isOpen = value;
                        if (value) {
                            this.timelineDetail.closeOthers(this);
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                TimelineDetailGroup = __decorate([
                    core_22.Component({
                        selector: 'timeline-detail-group',
                        inputs: ['heading', 'isOpen', 'isDisabled', 'headerDescription'],
                        templateUrl: './app/timeline/timelinegroup/timelinedetail.component.html'
                    }), 
                    __metadata('design:paramtypes', [TimelineDetail])
                ], TimelineDetailGroup);
                return TimelineDetailGroup;
            }());
            exports_29("TimelineDetailGroup", TimelineDetailGroup);
        }
    }
});
System.register("timeline/scroller", ['rxjs/Rx'], function(exports_30, context_30) {
    "use strict";
    var __moduleName = context_30 && context_30.id;
    var Rx_1;
    var Scroller;
    return {
        setters:[
            function (Rx_1_1) {
                Rx_1 = Rx_1_1;
            }],
        execute: function() {
            Scroller = (function () {
                function Scroller(windowElement, $interval, $elementRef, infiniteScrollCallback, infiniteScrollDistance, infiniteScrollParent, infiniteScrollThrottle, isImmediate) {
                    this.windowElement = windowElement;
                    this.$interval = $interval;
                    this.$elementRef = $elementRef;
                    this.infiniteScrollCallback = infiniteScrollCallback;
                    this.infiniteScrollThrottle = infiniteScrollThrottle;
                    this.isImmediate = isImmediate;
                    this.isContainerWindow = this.windowElement.hasOwnProperty('document');
                    this.documentElement = this.isContainerWindow ? this.windowElement.document.documentElement : null;
                    this.handleInfiniteScrollDistance(infiniteScrollDistance);
                    // if (attrs.infiniteScrollParent != null) {
                    // 	attachEvent(angular.element(elem.parent()));
                    // }
                    this.handleInfiniteScrollDisabled(false);
                    this.defineContainer();
                }
                Scroller.prototype.defineContainer = function () {
                    if (this.isContainerWindow) {
                        this.attachEvent(this.windowElement);
                    }
                    else {
                        this.container = this.windowElement.nativeElement;
                    }
                };
                Scroller.prototype.createInterval = function () {
                    var _this = this;
                    this.checkInterval = this.$interval(function () {
                        if (_this.isImmediate) {
                            return _this.handler();
                        }
                    }, 0);
                };
                Scroller.prototype.height = function (elem) {
                    // elem = elem.nativeElement;
                    if (isNaN(elem.offsetHeight)) {
                        return this.documentElement.clientHeight;
                    }
                    else {
                        return elem.offsetHeight;
                    }
                };
                Scroller.prototype.offsetTop = function (elem) {
                    // elem = elem.nativeElement;
                    if (!elem.getBoundingClientRect) {
                        return;
                    }
                    return elem.getBoundingClientRect().top + this.pageYOffset(elem);
                };
                Scroller.prototype.pageYOffset = function (elem) {
                    // elem = elem.nativeElement;
                    if (isNaN(window.pageYOffset)) {
                        return this.documentElement.scrollTop;
                    }
                    else if (elem.ownerDocument) {
                        return elem.ownerDocument.defaultView.pageYOffset;
                    }
                    else {
                        elem.offsetTop;
                    }
                };
                Scroller.prototype.handler = function () {
                    var container = this.calculatePoints();
                    var remaining = container.totalToScroll - container.scrolledUntilNow;
                    var containerBreakpoint = container.height * this.scrollDistance + 1;
                    var shouldScroll = remaining <= containerBreakpoint;
                    var triggerCallback = shouldScroll && this.scrollEnabled;
                    var shouldClearInterval = shouldScroll && this.checkInterval;
                    // if (this.useDocumentBottom) {
                    // 	container.totalToScroll = this.height(this.$elementRef.nativeElement.ownerDocument);
                    // }
                    this.checkWhenEnabled = shouldScroll;
                    if (triggerCallback) {
                        this.infiniteScrollCallback();
                    }
                    if (shouldClearInterval) {
                        clearInterval(this.checkInterval);
                    }
                };
                Scroller.prototype.calculatePoints = function () {
                    return this.isContainerWindow
                        ? this.calculatePointsForWindow()
                        : this.calculatePointsForElement();
                };
                Scroller.prototype.calculatePointsForWindow = function () {
                    // container's height
                    var height = this.height(this.container);
                    // scrolled until now / current y point
                    var scrolledUntilNow = height + this.pageYOffset(this.documentElement);
                    // total height / most bottom y point
                    var totalToScroll = this.offsetTop(this.$elementRef.nativeElement) + this.height(this.$elementRef.nativeElement);
                    return { height: height, scrolledUntilNow: scrolledUntilNow, totalToScroll: totalToScroll };
                };
                Scroller.prototype.calculatePointsForElement = function () {
                    var height = this.height(this.container);
                    // perhaps use this.container.offsetTop instead of 'scrollTop'
                    var scrolledUntilNow = this.container.scrollTop;
                    var containerTopOffset = 0;
                    var offsetTop = this.offsetTop(this.container);
                    if (offsetTop !== void 0) {
                        containerTopOffset = offsetTop;
                    }
                    var totalToScroll = this.container.scrollHeight;
                    // const totalToScroll = this.offsetTop(this.$elementRef.nativeElement) - containerTopOffset + this.height(this.$elementRef.nativeElement);
                    return { height: height, scrolledUntilNow: scrolledUntilNow, totalToScroll: totalToScroll };
                };
                Scroller.prototype.handleInfiniteScrollDistance = function (scrollDistance) {
                    return this.scrollDistance = parseFloat(scrollDistance) || 0;
                };
                Scroller.prototype.attachEvent = function (newContainer) {
                    var _this = this;
                    this.clean();
                    this.container = newContainer;
                    if (newContainer) {
                        var throttle_1 = this.infiniteScrollThrottle;
                        this.disposeScroll = Rx_1.Observable.fromEvent(this.container, 'scroll')
                            .debounce(function (ev) { return Rx_1.Observable.timer(throttle_1); })
                            .subscribe(function (ev) { return _this.handler(); });
                    }
                };
                Scroller.prototype.clean = function () {
                    if (this.disposeScroll) {
                        this.disposeScroll.unsubscribe();
                    }
                };
                Scroller.prototype.handleInfiniteScrollDisabled = function (enableScroll) {
                    this.scrollEnabled = !enableScroll;
                    // if (this.scrollEnabled && checkWhenEnabled) {
                    // 	checkWhenEnabled = false;
                    // 	return handler();
                    // }
                };
                return Scroller;
            }());
            exports_30("Scroller", Scroller);
        }
    }
});
System.register("timeline/infinite-scroll", ['@angular/core', "timeline/scroller"], function(exports_31, context_31) {
    "use strict";
    var __moduleName = context_31 && context_31.id;
    var core_23, scroller_1;
    var InfiniteScroll;
    return {
        setters:[
            function (core_23_1) {
                core_23 = core_23_1;
            },
            function (scroller_1_1) {
                scroller_1 = scroller_1_1;
            }],
        execute: function() {
            InfiniteScroll = (function () {
                function InfiniteScroll(element) {
                    this.element = element;
                    this._distance = 2;
                    this._throttle = 3;
                    this.scrollWindow = true;
                    this._immediate = false;
                    this.scrolled = new core_23.EventEmitter();
                }
                InfiniteScroll.prototype.ngOnInit = function () {
                    var containerElement = this.scrollWindow ? window : this.element;
                    this.scroller = new scroller_1.Scroller(containerElement, setInterval, this.element, this.onScroll.bind(this), this._distance, {}, this._throttle, this._immediate);
                };
                InfiniteScroll.prototype.ngOnDestroy = function () {
                    if (typeof this.scroller != 'undefined') {
                        this.scroller.clean();
                    }
                };
                InfiniteScroll.prototype.onScroll = function () {
                    this.scrolled.next({});
                };
                InfiniteScroll.prototype.handleScroll = function (event) {
                    this.scroller.handler();
                };
                __decorate([
                    core_23.Input('infiniteScrollDistance'), 
                    __metadata('design:type', Number)
                ], InfiniteScroll.prototype, "_distance", void 0);
                __decorate([
                    core_23.Input('infiniteScrollThrottle'), 
                    __metadata('design:type', Number)
                ], InfiniteScroll.prototype, "_throttle", void 0);
                __decorate([
                    core_23.Input('scrollWindow'), 
                    __metadata('design:type', Boolean)
                ], InfiniteScroll.prototype, "scrollWindow", void 0);
                __decorate([
                    core_23.Input('immediateCheck'), 
                    __metadata('design:type', Boolean)
                ], InfiniteScroll.prototype, "_immediate", void 0);
                __decorate([
                    core_23.Output(), 
                    __metadata('design:type', Object)
                ], InfiniteScroll.prototype, "scrolled", void 0);
                __decorate([
                    core_23.HostListener('scroll', ['$event']), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', [Object]), 
                    __metadata('design:returntype', void 0)
                ], InfiniteScroll.prototype, "handleScroll", null);
                InfiniteScroll = __decorate([
                    core_23.Directive({
                        selector: '[infinite-scroll]'
                    }), 
                    __metadata('design:paramtypes', [core_23.ElementRef])
                ], InfiniteScroll);
                return InfiniteScroll;
            }());
            exports_31("InfiniteScroll", InfiniteScroll);
        }
    }
});
System.register("timeline/angular2-infinite-scroll", ["timeline/infinite-scroll", "timeline/scroller"], function(exports_32, context_32) {
    "use strict";
    var __moduleName = context_32 && context_32.id;
    var infinite_scroll_1, scroller_2;
    function exportStar_2(m) {
        var exports = {};
        for(var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_32(exports);
    }
    return {
        setters:[
            function (infinite_scroll_1_1) {
                infinite_scroll_1 = infinite_scroll_1_1;
                exportStar_2(infinite_scroll_1_1);
            },
            function (scroller_2_1) {
                scroller_2 = scroller_2_1;
                exportStar_2(scroller_2_1);
            }],
        execute: function() {
            exports_32("default",{
                directives: [infinite_scroll_1.InfiniteScroll, scroller_2.Scroller]
            });
        }
    }
});
System.register("sharetimeline/sharetimeline.component", ['@angular/core', "services/tags.service"], function(exports_33, context_33) {
    "use strict";
    var __moduleName = context_33 && context_33.id;
    var core_24, tags_service_3;
    var ShareTimelineComponent;
    return {
        setters:[
            function (core_24_1) {
                core_24 = core_24_1;
            },
            function (tags_service_3_1) {
                tags_service_3 = tags_service_3_1;
            }],
        execute: function() {
            ShareTimelineComponent = (function () {
                function ShareTimelineComponent(tagService) {
                    this.tagService = tagService;
                    this.users = [];
                }
                ShareTimelineComponent.prototype.filterUserMultiple = function (event) {
                    var _this = this;
                    var query = event.query;
                    this.tagService.getTags().then(function (users) {
                        _this.filteredUsersMultiple = _this.filtertag(query, users);
                    });
                };
                ShareTimelineComponent.prototype.filtertag = function (query, users) {
                    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
                    var filtered = [];
                    for (var i = 0; i < users.length; i++) {
                        var user = users[i];
                        if (user.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                            filtered.push(user);
                        }
                    }
                    return filtered;
                };
                ShareTimelineComponent = __decorate([
                    core_24.Component({
                        selector: 'sharetimeline',
                        directives: [],
                        templateUrl: './app/sharetimeline/sharetimeline.component.html',
                        providers: [tags_service_3.TagsService]
                    }), 
                    __metadata('design:paramtypes', [tags_service_3.TagsService])
                ], ShareTimelineComponent);
                return ShareTimelineComponent;
            }());
            exports_33("ShareTimelineComponent", ShareTimelineComponent);
        }
    }
});
System.register("notes/edit-note.component", ['@angular/core', 'primeng/primeng', "services/notes.service"], function(exports_34, context_34) {
    "use strict";
    var __moduleName = context_34 && context_34.id;
    var core_25, primeng_6, primeng_7, notes_service_2;
    var EditNoteRequest, EditNoteComponent;
    return {
        setters:[
            function (core_25_1) {
                core_25 = core_25_1;
            },
            function (primeng_6_1) {
                primeng_6 = primeng_6_1;
                primeng_7 = primeng_6_1;
            },
            function (notes_service_2_1) {
                notes_service_2 = notes_service_2_1;
            }],
        execute: function() {
            EditNoteRequest = (function () {
                function EditNoteRequest() {
                }
                return EditNoteRequest;
            }());
            exports_34("EditNoteRequest", EditNoteRequest);
            EditNoteComponent = (function () {
                function EditNoteComponent(_notesService, zone) {
                    this._notesService = _notesService;
                    this.zone = zone;
                    this.errorMessage = "";
                    this.heading = "EDIT NOTES";
                    this.editNoteRequest = {
                        ID: 0,
                        Title: '',
                        Description: '',
                    };
                }
                EditNoteComponent.prototype.ngOnInit = function () {
                    this.editNoteRequest.Title = this.title;
                    this.editNoteRequest.Description = this.description;
                    this.editNoteRequest.ID = this.id;
                };
                EditNoteComponent.prototype.Save = function () {
                    var _this = this;
                    this._notesService.editNote(this.editNoteRequest)
                        .subscribe(function (note) {
                        var result = JSON.parse(note._body);
                        window.timelineComponentRef.zone.run(function () { window.timelineComponentRef.component.toggleOpenEditNoteWithoutEvent(result); });
                    }, function (error) {
                        _this.errorMessage = error,
                            console.log(_this.errorMessage);
                    }, function () { return function () {
                        console.log("Done");
                    }; });
                };
                EditNoteComponent.prototype.Close = function () {
                };
                EditNoteComponent = __decorate([
                    core_25.Component({
                        selector: 'edit-note',
                        inputs: ['title', 'description', 'id'],
                        templateUrl: './app/notes/edit-note.component.html',
                        providers: [
                            notes_service_2.NotesService
                        ],
                        directives: [primeng_6.Editor, primeng_7.Header]
                    }), 
                    __metadata('design:paramtypes', [notes_service_2.NotesService, core_25.NgZone])
                ], EditNoteComponent);
                return EditNoteComponent;
            }());
            exports_34("EditNoteComponent", EditNoteComponent);
        }
    }
});
System.register("timeline/timeline.component", ['@angular/router', '@angular/core', "services/notes.service", "services/user_profile.service", "services/timeline.service", "tags/tags-selector.component", "timeline/timelinegroup/timelinegroup.component", "timeline/timelinegroup/timelinedetail.component", 'rxjs/Observable', "services/passtag.service", "timeline/angular2-infinite-scroll", "app.constants", "sharetimeline/sharetimeline.component", "noteshareusers/users-selector.component", "modal/modaldialog", "notes/edit-note.component"], function(exports_35, context_35) {
    "use strict";
    var __moduleName = context_35 && context_35.id;
    var router_4, core_26, notes_service_3, user_profile_service_3, timeline_service_1, tags_selector_component_2, timelinegroup_component_1, timelinedetail_component_1, router_5, Observable_6, passtag_service_2, angular2_infinite_scroll_1, app_constants_8, sharetimeline_component_1, users_selector_component_2, modaldialog_2, edit_note_component_1;
    var TimeLineComponent;
    return {
        setters:[
            function (router_4_1) {
                router_4 = router_4_1;
                router_5 = router_4_1;
            },
            function (core_26_1) {
                core_26 = core_26_1;
            },
            function (notes_service_3_1) {
                notes_service_3 = notes_service_3_1;
            },
            function (user_profile_service_3_1) {
                user_profile_service_3 = user_profile_service_3_1;
            },
            function (timeline_service_1_1) {
                timeline_service_1 = timeline_service_1_1;
            },
            function (tags_selector_component_2_1) {
                tags_selector_component_2 = tags_selector_component_2_1;
            },
            function (timelinegroup_component_1_1) {
                timelinegroup_component_1 = timelinegroup_component_1_1;
            },
            function (timelinedetail_component_1_1) {
                timelinedetail_component_1 = timelinedetail_component_1_1;
            },
            function (Observable_6_1) {
                Observable_6 = Observable_6_1;
            },
            function (passtag_service_2_1) {
                passtag_service_2 = passtag_service_2_1;
            },
            function (angular2_infinite_scroll_1_1) {
                angular2_infinite_scroll_1 = angular2_infinite_scroll_1_1;
            },
            function (app_constants_8_1) {
                app_constants_8 = app_constants_8_1;
            },
            function (sharetimeline_component_1_1) {
                sharetimeline_component_1 = sharetimeline_component_1_1;
            },
            function (users_selector_component_2_1) {
                users_selector_component_2 = users_selector_component_2_1;
            },
            function (modaldialog_2_1) {
                modaldialog_2 = modaldialog_2_1;
            },
            function (edit_note_component_1_1) {
                edit_note_component_1 = edit_note_component_1_1;
            }],
        execute: function() {
            TimeLineComponent = (function () {
                function TimeLineComponent(_timeLineService, _noteService, _userProfileService, routeSegment, _router, passTagService, _configuration, zone) {
                    this._timeLineService = _timeLineService;
                    this._noteService = _noteService;
                    this._userProfileService = _userProfileService;
                    this._router = _router;
                    this.passTagService = passTagService;
                    this._configuration = _configuration;
                    this.zone = zone;
                    this.oneAtATime = true;
                    this.tagsStr = '';
                    this.isLoading = false;
                    this.userProfileData = {
                        email: '',
                        name: '',
                        profileImageId: '',
                        userTags: []
                    };
                    this.title = "TIMELINE";
                    this.passedTags = [];
                    this.selectedTagStr = '';
                    this.users = [];
                    this.isInitialLoad = false;
                    this.counter = 0;
                    this.showlabel = false;
                    this.loadingLabelHide = false;
                    this.totalPages = 0;
                    this._isOpen = false;
                    this._selectedId = 0;
                    this.initialTags = [];
                    this.timeLineRequest = {
                        data: [],
                        isPersistedSearch: false,
                        pageNo: 1,
                        pageSize: 10
                    };
                    this.tagsStr = routeSegment.getParam('tags');
                    this.fileApiUrl = _configuration.ServerWithApiUrl + 'FileContent';
                    window.timelineComponentRef = {
                        zone: this.zone,
                        component: this
                    };
                }
                TimeLineComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this._userProfileService.getUserProfile()
                        .subscribe(function (data) {
                        _this.userProfileData = JSON.parse(JSON.stringify(data));
                        if (_this.userProfileData.userTags && _this.userProfileData.userTags.length > 0) {
                            var tags = _this.userProfileData.userTags;
                            for (var x = 0; x < tags.length; x++) {
                                _this.initialTags.push(tags[x].description);
                            }
                        }
                        if (_this.userProfileData.name != '')
                            _this.initialTags.push(_this.userProfileData.name);
                        if (ip_country != '')
                            _this.initialTags.push(ip_country);
                    });
                    if (this.tagsStr != null) {
                        var tagsArr = this.tagsStr.split(",");
                        for (var i = 0; i < tagsArr.length; i++) {
                            if (tagsArr[i].trim().length > 0) {
                                var tag = tagsArr[i];
                                this.passedTags.push(tag);
                            }
                        }
                        this.timeLineRequest.data = this.passedTags;
                        this.isInitialLoad = true;
                    }
                    if (typeof this.popularTags == 'undefined') {
                        this.popularTags = new Array();
                    }
                    this.getTimelines();
                    this.getPopularTags();
                };
                TimeLineComponent.prototype.onScroll = function () {
                    if (this.timeLineRequest.pageNo > 1)
                        this.getTimelines();
                };
                TimeLineComponent.prototype.routerCanDeactivate = function (currTree, futureTree) {
                    this.isLoading = false;
                    this.timeLineRequest.isPersistedSearch = true;
                    this.getTimelines();
                    return Observable_6.Observable.of(true).delay(200).toPromise();
                };
                TimeLineComponent.prototype.onSelectedTagsChanged = function (tags) {
                    if (this.tagsStr != null && this.isInitialLoad) {
                        this.counter = this.counter + 1;
                        if (this.counter == this.passedTags.length) {
                            this.isInitialLoad = false;
                            this.counter = 0;
                        }
                    }
                    else {
                        this.timeLineRequest.data = tags.map(function (d) { return d['name']; });
                        this.timeLineRequest.isPersistedSearch = false;
                        this.timeLineRequest.pageNo = 1;
                        this.filteredTimelines = [];
                        this.timeLinesList = [];
                        this.isLoading = false;
                        this.loadingLabelHide = false;
                        this.getTimelines();
                    }
                };
                TimeLineComponent.prototype.getPopularTags = function () {
                    var _this = this;
                    this._timeLineService.getMostPopularTags(this.timeLineRequest).subscribe(function (lines) {
                        _this.popularTags = JSON.parse(JSON.stringify(lines));
                        console.log('len = ' + _this.popularTags.length);
                        console.log('len = ' + _this.popularTags[0].count);
                    });
                };
                TimeLineComponent.prototype.selectTrend = function (tags) {
                    //this.timeLineRequest.data.length = 0;
                    this.timeLineRequest.data = tags.map(function (d) { return d['name']; });
                    var tagList = '';
                    for (var i = 0; i < this.timeLineRequest.data.length; i++) {
                        tagList = tagList + (this.timeLineRequest.data[i] + (this.timeLineRequest.data.length != i + 1 ? ',' : ''));
                    }
                    this._router.navigate(['/timeline', { tags: tagList }]);
                    //(<any>window).AutoCompleteComponentRef.zone.run(function () { (<any>window).AutoCompleteComponentRef.component.LoadExternalInputData(); });
                };
                TimeLineComponent.prototype.getSelectedTags = function () {
                    this.selectedTagStr = '';
                    if (this.initialTags && this.initialTags.length > 0)
                        this.selectedTagStr = this.initialTags.join();
                    if (this.initialTags.length > 0 && this.timeLineRequest.data.length > 0)
                        this.selectedTagStr += ',';
                    for (var i = 0; i < this.timeLineRequest.data.length; i++) {
                        this.selectedTagStr = this.selectedTagStr + (this.timeLineRequest.data[i] + (this.timeLineRequest.data.length != i + 1 ? ',' : ''));
                    }
                    var uniqueList = this.selectedTagStr.split(',').filter(function (item, i, allItems) {
                        return i == allItems.indexOf(item);
                    }).join(',');
                    this.selectedTagStr = uniqueList;
                    this.passTagService.setTags(this.selectedTagStr);
                    $('#tagInput').text(this.selectedTagStr);
                    var selectedTagArray = this.selectedTagStr.split(",");
                    var selected = '<span>&nbsp;</span>';
                    for (var i = 0; i < selectedTagArray.length; i++) {
                        selected += '<span class="common-tag">' + selectedTagArray[i] + '</span>';
                    }
                    $('#tagInput1').html(selected);
                };
                TimeLineComponent.prototype.groupBy = function (array, f) {
                    var groups = {};
                    array.forEach(function (o) {
                        var group = JSON.stringify(f(o));
                        groups[group] = groups[group] || [];
                        groups[group].push(o);
                    });
                    return Object.keys(groups).map(function (group) {
                        return groups[group];
                    });
                };
                TimeLineComponent.prototype.getTimelines = function () {
                    var _this = this;
                    if (this.isLoading)
                        return;
                    this.isLoading = true;
                    this._timeLineService.getTimeLines(this.timeLineRequest)
                        .subscribe(function (timelines) {
                        _this.timelines = timelines.group;
                        _this.totalPages = timelines.totalPages;
                        if (typeof _this.filteredTimelines == 'undefined') {
                            _this.filteredTimelines = new Array();
                        }
                        if (_this.filteredTimelines.length > 0) {
                            for (var x = 0; x < _this.filteredTimelines.length; x++) {
                                if (_this.filteredTimelines[x].isLabled == false) {
                                    _this.filteredTimelines.splice(x, 1);
                                }
                            }
                        }
                        console.log(_this.timelines);
                        console.log(_this.filteredTimelines);
                        for (var x = 0; x < _this.timelines.length; x++) {
                            _this.timelines[x].isLabled = true;
                            _this.filteredTimelines.push(_this.timelines[x]);
                        }
                        for (var y = 0; y < _this.filteredTimelines.length; y++) {
                            if (y == _this.filteredTimelines.length - 1) {
                                break;
                            }
                            if (_this.filteredTimelines[y].dateFormat == _this.filteredTimelines[y + 1].dateFormat) {
                                _this.filteredTimelines[y + 1].isLabled = false;
                            }
                        }
                        var result = _this.groupBy(_this.filteredTimelines, function (item) {
                            return [item.dateFormat];
                        });
                        console.log(result + "fdsf");
                        if (typeof _this.timeLinesList == 'undefined') {
                            _this.timeLinesList = new Array();
                        }
                        else {
                            _this.timeLinesList = [];
                        }
                        console.log(_this.timeLinesList);
                        for (var y = 0; y < result.length; y++) {
                            for (var z = 0; z < result[y].length; z++) {
                                if (result[y][z].isLabled == true) {
                                    _this.timeLinesList.push(result[y][z]);
                                }
                                else {
                                    for (var x = 0; x < _this.timeLinesList.length; x++) {
                                        if (result[y][z].dateFormat == _this.timeLinesList[x].dateFormat && _this.timeLinesList[x].isLabled == true) {
                                            for (var a = 0; a < result[y][z].items.length; a++) {
                                                _this.timeLinesList[x].items.push(result[y][z].items[a]);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        console.log(_this.timeLinesList);
                        for (var y = 0; y < _this.timeLinesList.length; y++) {
                            if (_this.timeLinesList[y].items.length > 1)
                                _this.timeLinesList[y].availableThreadsCountText = _this.timeLinesList[y].items.length.toString() + " Notes Available";
                            else
                                _this.timeLinesList[y].availableThreadsCountText = _this.timeLinesList[y].items.length.toString() + " Note Available";
                        }
                        if (_this.timeLineRequest.pageNo < _this.totalPages) {
                            _this.timeLineRequest.pageNo = _this.timeLineRequest.pageNo + 1;
                            _this.isLoading = false;
                        }
                        else {
                            _this.loadingLabelHide = true;
                        }
                        if (_this.timeLinesList.length > 0)
                            _this.showlabel = false;
                        else
                            _this.showlabel = true;
                        console.log(_this.timelines);
                        console.log(_this.filteredTimelines);
                    }, function (error) {
                        _this.errorMessage = error,
                            console.log(_this.errorMessage);
                        _this.isLoading = false;
                    }, function () { return function () {
                        console.log("Done");
                        _this.isLoading = false;
                    }; });
                };
                TimeLineComponent.prototype.setCurrentNote = function (selected_note) {
                    this.note_id = selected_note.id;
                };
                TimeLineComponent.prototype.onSelectedUsersChanged = function (_users) {
                    this.users = _users.map(function (d) { return d['userName']; });
                };
                TimeLineComponent.prototype.shareNote = function () {
                    var note_share = {
                        Note: this.note_id,
                        AppUsers: this.users
                    };
                    var noteShareResponse;
                    this._noteService.share(note_share).subscribe(function (res) { return noteShareResponse = res; });
                };
                TimeLineComponent.prototype.toggleOpenEditNote = function (event, note) {
                    this.selectedId = note.id;
                    this.selectedNote = note;
                    console.log(note);
                    event.preventDefault();
                    this.isEditNoteOpen = !this.isEditNoteOpen;
                };
                TimeLineComponent.prototype.toggleOpenEditNoteWithoutEvent = function (note) {
                    this.selectedId = note.id;
                    this.isEditNoteOpen = !this.isEditNoteOpen;
                    //        this.selectedNote = note;
                    //        this.selectedNote.id = note.id;
                    //        this.selectedNote.createDate = note.createDate;
                    console.log(note.title);
                    this.selectedNote.title = note.title;
                    this.selectedNote.description = note.description;
                    //        this.selectedNote.activityType = note.activityType;
                    //        this.selectedNote.userImageUrl = note.userImageUrl;
                    //        this.selectedNote.date = note.date;
                    //        this.selectedNote.dateMonth = note.dateMonth;
                    //        this.selectedNote.dateDay = note.dateDay;
                    //        this.selectedNote.time = note.time;
                    //        this.selectedNote.timeHourMin = note.timeHourMin;
                    //        this.selectedNote.timeAMPM = note.timeAMPM;
                    //        this.selectedNote.imageUrl = note.imageUrl;
                    //        this.selectedNote.tags = note.tags;
                    //        this.selectedNote.attachments = note.attachments;
                    this.selectedNote.plainDescriptionText = note.plainDescriptionText;
                };
                Object.defineProperty(TimeLineComponent.prototype, "isEditNoteOpen", {
                    get: function () { return this._isOpen; },
                    set: function (value) {
                        this._isOpen = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TimeLineComponent.prototype, "selectedId", {
                    get: function () { return this._selectedId; },
                    set: function (value) {
                        this._selectedId = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                TimeLineComponent = __decorate([
                    core_26.Component({
                        selector: 'timeline',
                        templateUrl: './app/timeline/timeline.component.html',
                        providers: [
                            timeline_service_1.TimeLineService, notes_service_3.NotesService, user_profile_service_3.UserProfileService
                        ],
                        directives: [tags_selector_component_2.TagsSelectorComponent, timelinegroup_component_1.TimelineInfo, timelinegroup_component_1.TimelineGroup, timelinedetail_component_1.TimelineDetail, timelinedetail_component_1.TimelineDetailGroup, angular2_infinite_scroll_1.InfiniteScroll, modaldialog_2.MODAL_DIRECTIVES, sharetimeline_component_1.ShareTimelineComponent, users_selector_component_2.UsersSelectorComponent, edit_note_component_1.EditNoteComponent]
                    }), 
                    __metadata('design:paramtypes', [timeline_service_1.TimeLineService, notes_service_3.NotesService, user_profile_service_3.UserProfileService, router_5.RouteSegment, router_4.Router, passtag_service_2.PassTagService, app_constants_8.Configuration, core_26.NgZone])
                ], TimeLineComponent);
                return TimeLineComponent;
            }());
            exports_35("TimeLineComponent", TimeLineComponent);
        }
    }
});
System.register("authentication/login.component", ['@angular/core', "services/auth.service", "app.component"], function(exports_36, context_36) {
    "use strict";
    var __moduleName = context_36 && context_36.id;
    var core_27, auth_service_7, app_component_2;
    var UserDetails, LoginComponent;
    return {
        setters:[
            function (core_27_1) {
                core_27 = core_27_1;
            },
            function (auth_service_7_1) {
                auth_service_7 = auth_service_7_1;
            },
            function (app_component_2_1) {
                app_component_2 = app_component_2_1;
            }],
        execute: function() {
            UserDetails = (function () {
                function UserDetails() {
                }
                return UserDetails;
            }());
            exports_36("UserDetails", UserDetails);
            LoginComponent = (function () {
                function LoginComponent(_authService, _parent) {
                    this._authService = _authService;
                    this._parent = _parent;
                    this.showLoginHtml = false;
                    this.userDetails = {
                        username: '',
                        password: '',
                        rememberMe: false
                    };
                    this.errorMsg = '';
                }
                LoginComponent.prototype.ngOnInit = function () {
                    if (this._authService.loginUsingCookies() == false) {
                        this.showLoginHtml = true;
                        return;
                    }
                };
                LoginComponent.prototype.login = function () {
                    var _this = this;
                    window.loadingComponentRef.zone.run(function () { window.loadingComponentRef.component.show(); });
                    this.errorMsg = '';
                    this._authService.login(this.userDetails.username, this.userDetails.password, this.userDetails.rememberMe).subscribe(function (data) {
                        //console.log("access token: "+data.access_token)
                        _this._authService.setToken(data.access_token);
                        _this._authService.setTokenExpiresIn(data.expires_in);
                        window.loadingComponentRef.zone.run(function () { window.loadingComponentRef.component.hide(); });
                    }, function (err) {
                        window.loadingComponentRef.zone.run(function () { window.loadingComponentRef.component.hide(); });
                        console.log("error: " + JSON.stringify(err));
                        _this._authService.setAuthorized(false);
                        _this.errorMsg = 'Oops, the username or password entered is wrong. May be you have pressed a wrong key..';
                        //alert(JSON.parse(err._body).error_description);
                    }, function () {
                        _this.errorMsg = '';
                        _this._authService.setCookies(_this.userDetails.username, _this.userDetails.password, _this.userDetails.rememberMe);
                    });
                };
                LoginComponent.prototype.getValues = function () {
                    this._authService.get('http://localhost:18077/api/values', function (data) {
                        console.log(JSON.stringify(data));
                    });
                };
                LoginComponent = __decorate([
                    core_27.Component({
                        selector: 'login',
                        templateUrl: '../app/authentication/login.component.html',
                        providers: [
                            auth_service_7.AuthService
                        ],
                        styles: [' .login-content { height: 100vh; position: fixed; left:0; top: 0; margin-bottom: 110px;}', '.login-logo { padding: 33vh 0 0 0;}'],
                    }),
                    __param(1, core_27.Inject(core_27.forwardRef(function () { return app_component_2.AppComponent; }))), 
                    __metadata('design:paramtypes', [auth_service_7.AuthService, app_component_2.AppComponent])
                ], LoginComponent);
                return LoginComponent;
            }());
            exports_36("LoginComponent", LoginComponent);
        }
    }
});
System.register("tags/tags-filter.pipe", ['@angular/core'], function(exports_37, context_37) {
    "use strict";
    var __moduleName = context_37 && context_37.id;
    var core_28;
    var TagFilterPipe;
    return {
        setters:[
            function (core_28_1) {
                core_28 = core_28_1;
            }],
        execute: function() {
            TagFilterPipe = (function () {
                function TagFilterPipe() {
                }
                TagFilterPipe.prototype.transform = function (value, args) {
                    if (args == undefined)
                        return null;
                    var filter = args[0] ? args[0].toLocaleLowerCase() : null;
                    return filter ? value.filter(function (tag) {
                        return tag.name.toLocaleLowerCase().indexOf(filter) != -1;
                    }) : value;
                };
                TagFilterPipe = __decorate([
                    core_28.Pipe({
                        name: 'tagFilter'
                    }), 
                    __metadata('design:paramtypes', [])
                ], TagFilterPipe);
                return TagFilterPipe;
            }());
            exports_37("TagFilterPipe", TagFilterPipe);
        }
    }
});
System.register("directives/collapse.directive", ['@angular/core'], function(exports_38, context_38) {
    "use strict";
    var __moduleName = context_38 && context_38.id;
    var core_29;
    var CollapseDirective;
    return {
        setters:[
            function (core_29_1) {
                core_29 = core_29_1;
            }],
        execute: function() {
            // import {AnimationBuilder} from '@angular/platform-browser/src/animate/animation_builder';
            // import {animation, style, animate, state, transition} from '@angular/core';
            /*@Directive({
              selector: '[collapse]',
              // templateUrl: 'app/panel.html',
              // styleUrls: ['app/panel.css'],
              animations: [
                animation('active', [
                  state('void', style({ height: 0 })),
                  state('closed', style({ height: 0 })),
                  state('open', style({ height: '*' })),
                  transition('void => closed', [ animate(0) ]),
                  transition('closed => open', [ animate('350ms ease-out') ]),
                  transition('open => closed', [ animate('350ms ease-out') ])
                ])
              ]
            })*/
            // fix: replace with // '@angular/animate';
            // when https://github.com/angular/angular/issues/5984 will be fixed
            // TODO: remove ElementRef
            // TODO: add on change
            CollapseDirective = (function () {
                function CollapseDirective(/*_ab:AnimationBuilder, */ _el, _renderer) {
                    // shown
                    this.isExpanded = true;
                    // hidden
                    this.isCollapsed = false;
                    // stale state
                    this.isCollapse = true;
                    // animation state
                    this.isCollapsing = false;
                    // this._ab = _ab;
                    this._el = _el;
                    this._renderer = _renderer;
                }
                Object.defineProperty(CollapseDirective.prototype, "collapse", {
                    get: function () {
                        return this.isExpanded;
                    },
                    // @Input() private transitionDuration:number = 500; // Duration in ms
                    set: function (value) {
                        this.isExpanded = value;
                        this.toggle();
                    },
                    enumerable: true,
                    configurable: true
                });
                CollapseDirective.prototype.ngOnInit = function () {
                    // this.animation = this._ab.css();
                    // this.animation.setDuration(this.transitionDuration);
                };
                CollapseDirective.prototype.toggle = function () {
                    // this.open = !this.open;
                    if (this.isExpanded) {
                        this.hide();
                    }
                    else {
                        this.show();
                    }
                };
                CollapseDirective.prototype.hide = function () {
                    this.isCollapse = false;
                    this.isCollapsing = true;
                    this.isExpanded = false;
                    this.isCollapsed = true;
                    this.isCollapse = true;
                    this.isCollapsing = false;
                    /*  setTimeout(() => {
                          // this.height = '0';
                          // this.isCollapse = true;
                          // this.isCollapsing = false;
                          this.animation
                            .setFromStyles({
                              height: this._el.nativeElement.scrollHeight + 'px'
                            })
                            .setToStyles({
                              height: '0',
                              overflow: 'hidden'
                            });
                          this.animation.start(this._el.nativeElement)
                            .onComplete(() => {
                              if (this._el.nativeElement.offsetHeight === 0) {
                                this.display = 'none';
                              }
                              this.isCollapse = true;
                              this.isCollapsing = false;
                            });
                        }, 4);*/
                };
                CollapseDirective.prototype.show = function () {
                    this.isCollapse = false;
                    this.isCollapsing = true;
                    this.isExpanded = true;
                    this.isCollapsed = false;
                    this.display = '';
                    // this.height = 'auto';
                    this.isCollapse = true;
                    this.isCollapsing = false;
                    this._renderer.setElementStyle(this._el.nativeElement, 'overflow', 'visible');
                    this._renderer.setElementStyle(this._el.nativeElement, 'height', 'auto');
                    /*setTimeout(() => {
                        // this.height = 'auto';
                        // this.isCollapse = true;
                        // this.isCollapsing = false;
                        this.animation
                          .setFromStyles({
                            height: this._el.nativeElement.offsetHeight,
                            overflow: 'hidden'
                          })
                          .setToStyles({
                            height: this._el.nativeElement.scrollHeight + 'px'
                          });
                        this.animation.start(this._el.nativeElement)
                          .onComplete(() => {
                            this.isCollapse = true;
                            this.isCollapsing = false;
                            this._renderer.setElementStyle(this._el.nativeElement, 'overflow', 'visible');
                            this._renderer.setElementStyle(this._el.nativeElement, 'height', 'auto');
                          });
                      }, 4);*/
                };
                __decorate([
                    core_29.HostBinding('style.display'), 
                    __metadata('design:type', String)
                ], CollapseDirective.prototype, "display", void 0);
                __decorate([
                    core_29.HostBinding('class.in'),
                    core_29.HostBinding('attr.aria-expanded'), 
                    __metadata('design:type', Boolean)
                ], CollapseDirective.prototype, "isExpanded", void 0);
                __decorate([
                    core_29.HostBinding('attr.aria-hidden'), 
                    __metadata('design:type', Boolean)
                ], CollapseDirective.prototype, "isCollapsed", void 0);
                __decorate([
                    core_29.HostBinding('class.collapse'), 
                    __metadata('design:type', Boolean)
                ], CollapseDirective.prototype, "isCollapse", void 0);
                __decorate([
                    core_29.HostBinding('class.collapsing'), 
                    __metadata('design:type', Boolean)
                ], CollapseDirective.prototype, "isCollapsing", void 0);
                __decorate([
                    core_29.Input(), 
                    __metadata('design:type', Boolean), 
                    __metadata('design:paramtypes', [Boolean])
                ], CollapseDirective.prototype, "collapse", null);
                CollapseDirective = __decorate([
                    core_29.Directive({ selector: '[collapse]' }), 
                    __metadata('design:paramtypes', [core_29.ElementRef, core_29.Renderer])
                ], CollapseDirective);
                return CollapseDirective;
            }());
            exports_38("CollapseDirective", CollapseDirective);
        }
    }
});
System.register("tags/tags.component", ['@angular/core', '@angular/router', "services/tags.service", "tags/tags-filter.pipe", "directives/collapse.directive", 'primeng/primeng'], function(exports_39, context_39) {
    "use strict";
    var __moduleName = context_39 && context_39.id;
    var core_30, router_6, tags_service_4, tags_filter_pipe_1, collapse_directive_1, primeng_8;
    var TagsComponent;
    return {
        setters:[
            function (core_30_1) {
                core_30 = core_30_1;
            },
            function (router_6_1) {
                router_6 = router_6_1;
            },
            function (tags_service_4_1) {
                tags_service_4 = tags_service_4_1;
            },
            function (tags_filter_pipe_1_1) {
                tags_filter_pipe_1 = tags_filter_pipe_1_1;
            },
            function (collapse_directive_1_1) {
                collapse_directive_1 = collapse_directive_1_1;
            },
            function (primeng_8_1) {
                primeng_8 = primeng_8_1;
            }],
        execute: function() {
            TagsComponent = (function () {
                function TagsComponent(_router, tagsService) {
                    this._router = _router;
                    this.tagsService = tagsService;
                    this.tagRequest = {
                        id: 0,
                        name: '',
                        createdBy: '',
                        createdDate: ''
                    };
                    this.isCollapsed = false;
                    this.title = "Tags";
                    this.tags = [];
                    this.filteredTags = [];
                }
                TagsComponent.prototype.ngOnInit = function () {
                    this.getTags();
                };
                TagsComponent.prototype.onClick = function (tag) {
                    this._router.navigate(['/tag', tag.id]);
                };
                TagsComponent.prototype.filterTag = function (query, tags) {
                    var filtered = [];
                    for (var i = 0; i < tags.length; i++) {
                        var tag = tags[i];
                        if (tag.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                            filtered.push(tag);
                        }
                    }
                    return filtered;
                };
                TagsComponent.prototype.searchTags = function (event) {
                    var query = event.query;
                    this.filteredTags = this.filterTag(query, this.tags);
                };
                TagsComponent.prototype.getTags = function () {
                    var _this = this;
                    this.tagsService.getTags().then(function (tags) {
                        _this.tags = tags;
                        _this.filteredTags = JSON.parse(JSON.stringify(tags));
                    });
                };
                TagsComponent.prototype.save = function () {
                    var _this = this;
                    this.tagsService.addTag(this.tagRequest)
                        .subscribe(function (data) {
                        console.log("added tag: " + data);
                        _this.filteredTags.push(data);
                    }, function (err) { return console.log("error: " + err); }, function () {
                        //this._router.navigate(['timeline']);
                    });
                };
                TagsComponent = __decorate([
                    core_30.Component({
                        selector: 'add-tag',
                        templateUrl: './app/tags/tags.component.html',
                        pipes: [tags_filter_pipe_1.TagFilterPipe],
                        directives: [collapse_directive_1.CollapseDirective, primeng_8.Button],
                        providers: [
                            tags_service_4.TagsService
                        ]
                    }), 
                    __metadata('design:paramtypes', [router_6.Router, tags_service_4.TagsService])
                ], TagsComponent);
                return TagsComponent;
            }());
            exports_39("TagsComponent", TagsComponent);
        }
    }
});
System.register("recenttimeline/recenttimeline-response", [], function(exports_40, context_40) {
    "use strict";
    var __moduleName = context_40 && context_40.id;
    var RecentTimeLineResponse, AppUser, RecentTimelineTag;
    return {
        setters:[],
        execute: function() {
            RecentTimeLineResponse = (function () {
                function RecentTimeLineResponse(id, userId, requestedTime, date, tags, isWatched, recentActivity, noOfEntries, dateDay, dateMonth, timelineId, sharedWith, totalPages) {
                    this.id = id;
                    this.userId = userId;
                    this.requestedTime = requestedTime;
                    this.date = date;
                    this.tags = tags;
                    this.isWatched = isWatched;
                    this.recentActivity = recentActivity;
                    this.noOfEntries = noOfEntries;
                    this.dateDay = dateDay;
                    this.dateMonth = dateMonth;
                    this.timelineId = timelineId;
                    this.sharedWith = sharedWith;
                    this.totalPages = totalPages;
                }
                return RecentTimeLineResponse;
            }());
            exports_40("RecentTimeLineResponse", RecentTimeLineResponse);
            AppUser = (function () {
                function AppUser(userId, userName, imageUrl) {
                    this.userId = userId;
                    this.userName = userName;
                    this.imageUrl = imageUrl;
                }
                return AppUser;
            }());
            exports_40("AppUser", AppUser);
            RecentTimelineTag = (function () {
                function RecentTimelineTag(id, name) {
                    this.id = id;
                    this.name = name;
                }
                return RecentTimelineTag;
            }());
            exports_40("RecentTimelineTag", RecentTimelineTag);
        }
    }
});
System.register("services/recenttimeline.service", ['@angular/core', '@angular/http', 'rxjs/Observable', "services/auth.service", "app.constants"], function(exports_41, context_41) {
    "use strict";
    var __moduleName = context_41 && context_41.id;
    var core_31, http_7, Observable_7, auth_service_8, app_constants_9;
    var RecentTimeLineService;
    return {
        setters:[
            function (core_31_1) {
                core_31 = core_31_1;
            },
            function (http_7_1) {
                http_7 = http_7_1;
            },
            function (Observable_7_1) {
                Observable_7 = Observable_7_1;
            },
            function (auth_service_8_1) {
                auth_service_8 = auth_service_8_1;
            },
            function (app_constants_9_1) {
                app_constants_9 = app_constants_9_1;
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
                RecentTimeLineService.prototype.getRecentTimeLines = function (recentTimelineRequest) {
                    var headers = this.authService.getHeader();
                    var options = new http_7.RequestOptions({
                        headers: headers,
                        search: new http_7.URLSearchParams('PageNo=' + recentTimelineRequest.pageNo + '&PageSize=' + recentTimelineRequest.pageSize)
                    });
                    return this.http.get(this.webApiUrl, options)
                        .map(function (res) { return res.json(); })
                        .do(function (data) { return console.log(data); })
                        .catch(this.handleError);
                };
                RecentTimeLineService.prototype.handleError = function (error) {
                    console.error(error);
                    return Observable_7.Observable.throw(error.json().error || 'Server error');
                };
                RecentTimeLineService.prototype.share = function (request) {
                    //console.log("Title: " + request.title + ", description: " + request.description);
                    var body = JSON.stringify(request);
                    //var headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
                    var headers = this._authService.getHeader();
                    headers.append('Content-Type', 'application/json; charset=utf-8');
                    var options = new http_7.RequestOptions({ headers: headers });
                    return this.http.post(this.webApiUrl, body, options)
                        .map(function (res) { return res.json(); });
                };
                RecentTimeLineService = __decorate([
                    core_31.Injectable(), 
                    __metadata('design:paramtypes', [http_7.Http, auth_service_8.AuthService, app_constants_9.Configuration])
                ], RecentTimeLineService);
                return RecentTimeLineService;
            }());
            exports_41("RecentTimeLineService", RecentTimeLineService);
        }
    }
});
System.register("shared/timeline-watch", [], function(exports_42, context_42) {
    "use strict";
    var __moduleName = context_42 && context_42.id;
    var TimeLineWatch;
    return {
        setters:[],
        execute: function() {
            TimeLineWatch = (function () {
                function TimeLineWatch() {
                }
                return TimeLineWatch;
            }());
            exports_42("TimeLineWatch", TimeLineWatch);
        }
    }
});
System.register("services/timeline-watch.service", ['@angular/core', '@angular/http', 'rxjs/Observable', "services/auth.service", "app.constants"], function(exports_43, context_43) {
    "use strict";
    var __moduleName = context_43 && context_43.id;
    var core_32, http_8, Observable_8, auth_service_9, app_constants_10;
    var TimeLineWatchService;
    return {
        setters:[
            function (core_32_1) {
                core_32 = core_32_1;
            },
            function (http_8_1) {
                http_8 = http_8_1;
            },
            function (Observable_8_1) {
                Observable_8 = Observable_8_1;
            },
            function (auth_service_9_1) {
                auth_service_9 = auth_service_9_1;
            },
            function (app_constants_10_1) {
                app_constants_10 = app_constants_10_1;
            }],
        execute: function() {
            TimeLineWatchService = (function () {
                function TimeLineWatchService(http, _authService, _configuration) {
                    this.http = http;
                    this._authService = _authService;
                    this._configuration = _configuration;
                    this.webApiUrl = _configuration.ServerWithApiUrl + 'TimeLineWatcher';
                    this.authService = _authService;
                }
                TimeLineWatchService.prototype.updateTimelineWatch = function (timeLineWatch) {
                    var body = JSON.stringify(timeLineWatch);
                    var headers = this.authService.getHeader();
                    headers.append('Content-Type', 'application/json; charset=utf-8');
                    var options = new http_8.RequestOptions({ headers: headers });
                    return this.http.post(this.webApiUrl, body, options)
                        .map(function (res) { return res.json(); })
                        .do(function (data) { return console.log(data); })
                        .catch(this.handleError);
                };
                TimeLineWatchService.prototype.handleError = function (error) {
                    console.error(error);
                    return Observable_8.Observable.throw(error.json().error || 'Server error');
                };
                TimeLineWatchService = __decorate([
                    core_32.Injectable(), 
                    __metadata('design:paramtypes', [http_8.Http, auth_service_9.AuthService, app_constants_10.Configuration])
                ], TimeLineWatchService);
                return TimeLineWatchService;
            }());
            exports_43("TimeLineWatchService", TimeLineWatchService);
        }
    }
});
System.register("carousel/image.interface", [], function(exports_44, context_44) {
    "use strict";
    var __moduleName = context_44 && context_44.id;
    return {
        setters:[],
        execute: function() {
        }
    }
});
System.register("carousel/carousel.component", ['@angular/core'], function(exports_45, context_45) {
    "use strict";
    var __moduleName = context_45 && context_45.id;
    var core_33;
    var CSSCarouselComponent;
    return {
        setters:[
            function (core_33_1) {
                core_33 = core_33_1;
            }],
        execute: function() {
            // Compoent Decorator
            CSSCarouselComponent = (function () {
                function CSSCarouselComponent() {
                    //images data to be bound to the template
                    this.images = [];
                }
                __decorate([
                    core_33.Input(), 
                    __metadata('design:type', Object)
                ], CSSCarouselComponent.prototype, "images", void 0);
                CSSCarouselComponent = __decorate([
                    core_33.Component({
                        //Name of our tag
                        selector: 'css-carousel',
                        //Template for the tag
                        templateUrl: './app/carousel/carousel.html',
                        //Styles for the tag
                        styleUrls: ['./css/img.css'],
                    }), 
                    __metadata('design:paramtypes', [])
                ], CSSCarouselComponent);
                return CSSCarouselComponent;
            }());
            exports_45("CSSCarouselComponent", CSSCarouselComponent);
        }
    }
});
System.register("recenttimeline/recenttimeline.watchfilter.component", ['@angular/core'], function(exports_46, context_46) {
    "use strict";
    var __moduleName = context_46 && context_46.id;
    var core_34;
    var RecentTimelineWatchFilter;
    return {
        setters:[
            function (core_34_1) {
                core_34 = core_34_1;
            }],
        execute: function() {
            RecentTimelineWatchFilter = (function () {
                function RecentTimelineWatchFilter() {
                }
                RecentTimelineWatchFilter.prototype.transform = function (recentTimelines, args) {
                    if (recentTimelines == null) {
                        return null;
                    }
                    if (args == false) {
                        return recentTimelines;
                    }
                    return recentTimelines.filter(function (tl) { return tl.isWatched == args; });
                };
                RecentTimelineWatchFilter = __decorate([
                    core_34.Pipe({
                        name: 'recentTimelineWatchFilter'
                    }),
                    core_34.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], RecentTimelineWatchFilter);
                return RecentTimelineWatchFilter;
            }());
            exports_46("RecentTimelineWatchFilter", RecentTimelineWatchFilter);
        }
    }
});
System.register("recenttimeline/recenttimeline-request", [], function(exports_47, context_47) {
    "use strict";
    var __moduleName = context_47 && context_47.id;
    var RecentTimeLineRequest;
    return {
        setters:[],
        execute: function() {
            RecentTimeLineRequest = (function () {
                function RecentTimeLineRequest() {
                }
                return RecentTimeLineRequest;
            }());
            exports_47("RecentTimeLineRequest", RecentTimeLineRequest);
        }
    }
});
System.register("recenttimeline/recenttimeline.component", ['@angular/core', "services/recenttimeline.service", "services/timeline-watch.service", "timeline/timeline.component", "sharetimeline/sharetimeline.component", '@angular/router', "noteshareusers/users-selector.component", "modal/modaldialog", "carousel/carousel.component", "recenttimeline/recenttimeline.watchfilter.component", "timeline/angular2-infinite-scroll"], function(exports_48, context_48) {
    "use strict";
    var __moduleName = context_48 && context_48.id;
    var core_35, recenttimeline_service_1, timeline_watch_service_1, timeline_component_1, sharetimeline_component_2, router_7, users_selector_component_3, modaldialog_3, carousel_component_1, recenttimeline_watchfilter_component_1, angular2_infinite_scroll_2;
    var RecentTimeLineComponent;
    return {
        setters:[
            function (core_35_1) {
                core_35 = core_35_1;
            },
            function (recenttimeline_service_1_1) {
                recenttimeline_service_1 = recenttimeline_service_1_1;
            },
            function (timeline_watch_service_1_1) {
                timeline_watch_service_1 = timeline_watch_service_1_1;
            },
            function (timeline_component_1_1) {
                timeline_component_1 = timeline_component_1_1;
            },
            function (sharetimeline_component_2_1) {
                sharetimeline_component_2 = sharetimeline_component_2_1;
            },
            function (router_7_1) {
                router_7 = router_7_1;
            },
            function (users_selector_component_3_1) {
                users_selector_component_3 = users_selector_component_3_1;
            },
            function (modaldialog_3_1) {
                modaldialog_3 = modaldialog_3_1;
            },
            function (carousel_component_1_1) {
                carousel_component_1 = carousel_component_1_1;
            },
            function (recenttimeline_watchfilter_component_1_1) {
                recenttimeline_watchfilter_component_1 = recenttimeline_watchfilter_component_1_1;
            },
            function (angular2_infinite_scroll_2_1) {
                angular2_infinite_scroll_2 = angular2_infinite_scroll_2_1;
            }],
        execute: function() {
            // Import the Image interface
            //import {Image} from '../image.interface';
            RecentTimeLineComponent = (function () {
                function RecentTimeLineComponent(_timeLineService, _timeLineWatchService, _router) {
                    this._timeLineService = _timeLineService;
                    this._timeLineWatchService = _timeLineWatchService;
                    this._router = _router;
                    // @ViewChild('parentModal')
                    //parentModal: ModalComponent;
                    this.images = [
                        { "title": "", "url": "img/profile-pics/finn.png" },
                        { "title": "", "url": "img/profile-pics/anu.png" },
                        { "title": "", "url": "img/profile-pics/chinthaka.png" },
                        { "title": "", "url": "img/profile-pics/twi.png" },
                        { "title": "", "url": "img/profile-pics/waruni.png" },
                        { "title": "", "url": "img/profile-pics/tushara.png" },
                        { "title": "", "url": "img/profile-pics/dileepa.png" }];
                    this.animation = true;
                    this.keyboard = true;
                    this.backdrop = true;
                    this.users = [];
                    this.isWatchedFilter = false;
                    this.title = "RECENT TIMELINE";
                    this.timeLineWatch = {
                        tags: [],
                        isWatched: false,
                        isStatusUpdate: false
                    };
                    this.tags = '';
                    this.isLoading = false;
                    this.totalPages = 0;
                    this.recentTimeLineRequest = {
                        pageNo: 1,
                        pageSize: 10
                    };
                }
                RecentTimeLineComponent.prototype.ngOnInit = function () {
                    this.getRecentTimelines();
                };
                RecentTimeLineComponent.prototype.watchFilter = function (rtl) {
                    this.isWatchedFilter = !rtl;
                };
                RecentTimeLineComponent.prototype.onScroll = function () {
                    if (this.recentTimeLineRequest.pageNo > 1)
                        this.getRecentTimelines();
                };
                RecentTimeLineComponent.prototype.getRecentTimelines = function () {
                    var _this = this;
                    if (this.isLoading)
                        return;
                    this.isLoading = true;
                    this._timeLineService.getRecentTimeLines(this.recentTimeLineRequest)
                        .subscribe(function (timelines) {
                        _this.recentTimelinesTagSearch = timelines;
                        if (typeof _this.recentTimelines == 'undefined') {
                            _this.recentTimelines = new Array();
                        }
                        console.log(_this.recentTimelinesTagSearch);
                        for (var x = 0; x < _this.recentTimelinesTagSearch.length; x++) {
                            _this.totalPages = _this.recentTimelinesTagSearch[x].totalPages;
                            _this.recentTimelines.push(_this.recentTimelinesTagSearch[x]);
                        }
                        console.log(_this.recentTimelines);
                        if (_this.recentTimeLineRequest.pageNo < _this.totalPages) {
                            _this.recentTimeLineRequest.pageNo = _this.recentTimeLineRequest.pageNo + 1;
                            _this.isLoading = false;
                        }
                    }, function (error) {
                        _this.errorMessage = error,
                            console.log(_this.errorMessage);
                        _this.isLoading = false;
                    }, function () { return function () {
                        console.log("Done");
                        _this.isLoading = false;
                    }; });
                };
                RecentTimeLineComponent.prototype.updateTimelineWatch = function (timeLineWatch, selectedTimeline) {
                    var _this = this;
                    this._timeLineWatchService.updateTimelineWatch(timeLineWatch)
                        .subscribe(function (watch) {
                        _this.timeLineWatch = watch;
                        var selected = _this.recentTimelines.filter(function (obj) {
                            return obj.id == selectedTimeline.id;
                        });
                        selected[0].isWatched = _this.timeLineWatch.isWatched;
                    }, function (error) {
                        _this.errorMessage = error,
                            console.log(_this.errorMessage);
                    }, function () { return function () { return console.log("Done"); }; });
                };
                RecentTimeLineComponent.prototype.select = function (selectedTimeline) {
                    for (var i = 0; i < selectedTimeline.tags.length; i++) {
                        this.tags = this.tags + (selectedTimeline.tags[i].name + (selectedTimeline.tags.length != i + 1 ? ',' : ''));
                    }
                    this._router.navigate(['timeline', { tags: this.tags }]);
                };
                RecentTimeLineComponent.prototype.openModal = function (timeline) {
                    this.selectedTimeline = timeline;
                    //this.parentModal.open()
                };
                RecentTimeLineComponent.prototype.watch = function (selectedTimeline) {
                    var timeLineWatch = {
                        tags: [],
                        isWatched: false,
                        isStatusUpdate: false,
                        timeLineId: selectedTimeline.id
                    };
                    timeLineWatch.isWatched = selectedTimeline.isWatched;
                    timeLineWatch.isStatusUpdate = true;
                    timeLineWatch.tags = selectedTimeline.tags.map(function (d) { return d['name']; });
                    this.updateTimelineWatch(timeLineWatch, selectedTimeline);
                };
                RecentTimeLineComponent.prototype.setCurrentTimeline = function (_selectedTimeline) {
                    this.currentTimeline_id = _selectedTimeline.id;
                    this.current_id = _selectedTimeline.timelineId;
                };
                RecentTimeLineComponent.prototype.onSelectedUsersChanged = function (_users) {
                    this.users = _users.map(function (d) { return d['userName']; });
                };
                RecentTimeLineComponent.prototype.shareTimeline = function () {
                    var timeline_share = {
                        TimeLineId: this.current_id,
                        AppUsers: this.users
                    };
                    var temp = this.currentTimeline_id;
                    var selected = this.recentTimelines.filter(function (obj) {
                        return obj.id == temp;
                    });
                    this._timeLineService.share(timeline_share).subscribe(function (res) { return selected[0].sharedWith = res; });
                };
                RecentTimeLineComponent = __decorate([
                    core_35.Component({
                        selector: 'recentimeline',
                        pipes: [recenttimeline_watchfilter_component_1.RecentTimelineWatchFilter],
                        templateUrl: './app/recenttimeline/recenttimeline.component.html',
                        //css
                        styles: ['.wrapper{width: 1%;margin: 2px auto;}'],
                        providers: [
                            recenttimeline_service_1.RecentTimeLineService, timeline_watch_service_1.TimeLineWatchService
                        ],
                        directives: [timeline_component_1.TimeLineComponent, modaldialog_3.MODAL_DIRECTIVES, sharetimeline_component_2.ShareTimelineComponent, users_selector_component_3.UsersSelectorComponent, carousel_component_1.CSSCarouselComponent, angular2_infinite_scroll_2.InfiniteScroll]
                    }), 
                    __metadata('design:paramtypes', [recenttimeline_service_1.RecentTimeLineService, timeline_watch_service_1.TimeLineWatchService, router_7.Router])
                ], RecentTimeLineComponent);
                return RecentTimeLineComponent;
            }());
            exports_48("RecentTimeLineComponent", RecentTimeLineComponent);
        }
    }
});
System.register("thinkhelpful/thinkhelpful.component", ['@angular/core'], function(exports_49, context_49) {
    "use strict";
    var __moduleName = context_49 && context_49.id;
    var core_36;
    var ThinkHelpful;
    return {
        setters:[
            function (core_36_1) {
                core_36 = core_36_1;
            }],
        execute: function() {
            ThinkHelpful = (function () {
                function ThinkHelpful() {
                }
                ThinkHelpful = __decorate([
                    core_36.Component({
                        selector: 'thinkhelpful',
                        templateUrl: './app/thinkhelpful/thinkhelpful.component.html',
                        providers: [],
                        directives: []
                    }), 
                    __metadata('design:paramtypes', [])
                ], ThinkHelpful);
                return ThinkHelpful;
            }());
            exports_49("ThinkHelpful", ThinkHelpful);
        }
    }
});
System.register("whatisgoingon/whatisgoingon-response", [], function(exports_50, context_50) {
    "use strict";
    var __moduleName = context_50 && context_50.id;
    var WhatIsGoingOnResponse, WhatIsGoingOnTag;
    return {
        setters:[],
        execute: function() {
            WhatIsGoingOnResponse = (function () {
                function WhatIsGoingOnResponse(title, description, userImage, timeLineId, tags, date, time, dateFormat, totalPages) {
                    this.title = title;
                    this.description = description;
                    this.userImage = userImage;
                    this.timeLineId = timeLineId;
                    this.tags = tags;
                    this.date = date;
                    this.time = time;
                    this.dateFormat = dateFormat;
                    this.totalPages = totalPages;
                }
                return WhatIsGoingOnResponse;
            }());
            exports_50("WhatIsGoingOnResponse", WhatIsGoingOnResponse);
            WhatIsGoingOnTag = (function () {
                function WhatIsGoingOnTag(id, name) {
                    this.id = id;
                    this.name = name;
                }
                return WhatIsGoingOnTag;
            }());
            exports_50("WhatIsGoingOnTag", WhatIsGoingOnTag);
        }
    }
});
System.register("services/whatisgoingon.service", ['@angular/core', '@angular/http', 'rxjs/Observable', "services/auth.service", "app.constants"], function(exports_51, context_51) {
    "use strict";
    var __moduleName = context_51 && context_51.id;
    var core_37, http_9, Observable_9, auth_service_10, app_constants_11;
    var WhatIsGoingOnService;
    return {
        setters:[
            function (core_37_1) {
                core_37 = core_37_1;
            },
            function (http_9_1) {
                http_9 = http_9_1;
            },
            function (Observable_9_1) {
                Observable_9 = Observable_9_1;
            },
            function (auth_service_10_1) {
                auth_service_10 = auth_service_10_1;
            },
            function (app_constants_11_1) {
                app_constants_11 = app_constants_11_1;
            }],
        execute: function() {
            WhatIsGoingOnService = (function () {
                function WhatIsGoingOnService(http, _authService, _configuration) {
                    this.http = http;
                    this._authService = _authService;
                    this._configuration = _configuration;
                    this.webApiUrl = _configuration.ServerWithApiUrl + 'ActivityLog';
                    this.authService = _authService;
                }
                WhatIsGoingOnService.prototype.getWhatisGoingOnActivity = function (whatIsGoingOnRequest) {
                    var headers = this.authService.getHeader();
                    var options = new http_9.RequestOptions({
                        headers: headers,
                        search: new http_9.URLSearchParams('PageNo=' + whatIsGoingOnRequest.pageNo + '&PageSize=' + whatIsGoingOnRequest.pageSize)
                    });
                    return this.http.get(this.webApiUrl, options)
                        .map(function (res) { return res.json(); })
                        .do(function (data) { return console.log(data); })
                        .catch(this.handleError);
                };
                WhatIsGoingOnService.prototype.handleError = function (error) {
                    console.error(error);
                    return Observable_9.Observable.throw(error.json().error || 'Server error');
                };
                WhatIsGoingOnService = __decorate([
                    core_37.Injectable(), 
                    __metadata('design:paramtypes', [http_9.Http, auth_service_10.AuthService, app_constants_11.Configuration])
                ], WhatIsGoingOnService);
                return WhatIsGoingOnService;
            }());
            exports_51("WhatIsGoingOnService", WhatIsGoingOnService);
        }
    }
});
System.register("whatisgoingon/whatisgoingon-request", [], function(exports_52, context_52) {
    "use strict";
    var __moduleName = context_52 && context_52.id;
    var WhatIsGoingOnRequest;
    return {
        setters:[],
        execute: function() {
            WhatIsGoingOnRequest = (function () {
                function WhatIsGoingOnRequest() {
                }
                return WhatIsGoingOnRequest;
            }());
            exports_52("WhatIsGoingOnRequest", WhatIsGoingOnRequest);
        }
    }
});
System.register("whatisgoingon/whatisgoingon.component", ['@angular/core', '@angular/router', "services/whatisgoingon.service", "timeline/angular2-infinite-scroll"], function(exports_53, context_53) {
    "use strict";
    var __moduleName = context_53 && context_53.id;
    var core_38, router_8, whatisgoingon_service_1, angular2_infinite_scroll_3;
    var WhatIsGoingOnComponent;
    return {
        setters:[
            function (core_38_1) {
                core_38 = core_38_1;
            },
            function (router_8_1) {
                router_8 = router_8_1;
            },
            function (whatisgoingon_service_1_1) {
                whatisgoingon_service_1 = whatisgoingon_service_1_1;
            },
            function (angular2_infinite_scroll_3_1) {
                angular2_infinite_scroll_3 = angular2_infinite_scroll_3_1;
            }],
        execute: function() {
            WhatIsGoingOnComponent = (function () {
                function WhatIsGoingOnComponent(_whatisgoingonService, _router) {
                    this._whatisgoingonService = _whatisgoingonService;
                    this._router = _router;
                    this.isLoading = false;
                    this.whatIsGoingOnRequest = {
                        pageNo: 1,
                        pageSize: 10
                    };
                    this.tags = '';
                    this.totalPages = 0;
                }
                WhatIsGoingOnComponent.prototype.ngOnInit = function () {
                    this.getWhatisGoingOnActivity();
                };
                WhatIsGoingOnComponent.prototype.onScroll = function () {
                    if (this.whatIsGoingOnRequest.pageNo > 1)
                        this.getWhatisGoingOnActivity();
                };
                WhatIsGoingOnComponent.prototype.getWhatisGoingOnActivity = function () {
                    var _this = this;
                    if (this.isLoading)
                        return;
                    this.isLoading = true;
                    this._whatisgoingonService.getWhatisGoingOnActivity(this.whatIsGoingOnRequest)
                        .subscribe(function (activity) {
                        _this.timelineActivity = activity;
                        if (typeof _this.whatisgoingonTimelines == 'undefined') {
                            _this.whatisgoingonTimelines = new Array();
                        }
                        console.log(_this.timelineActivity);
                        for (var x = 0; x < _this.timelineActivity.length; x++) {
                            _this.totalPages = _this.timelineActivity[x].totalPages;
                            _this.whatisgoingonTimelines.push(_this.timelineActivity[x]);
                        }
                        console.log(_this.whatisgoingonTimelines);
                        if (_this.whatIsGoingOnRequest.pageNo < _this.totalPages) {
                            _this.whatIsGoingOnRequest.pageNo = _this.whatIsGoingOnRequest.pageNo + 1;
                            _this.isLoading = false;
                        }
                    }, function (error) {
                        _this.errorMessage = error,
                            console.log(_this.errorMessage);
                        _this.isLoading = false;
                    }, function () { return function () {
                        console.log("Done");
                        _this.isLoading = false;
                    }; });
                };
                WhatIsGoingOnComponent.prototype.select = function (selectedActivityTag) {
                    for (var i = 0; i < selectedActivityTag.tags.length; i++) {
                        this.tags = this.tags + (selectedActivityTag.tags[i].name + (selectedActivityTag.tags.length != i + 1 ? ',' : ''));
                    }
                    this._router.navigate(['timeline', { tags: this.tags }]);
                };
                WhatIsGoingOnComponent = __decorate([
                    core_38.Component({
                        selector: 'whatisgoingon',
                        templateUrl: './app/whatisgoingon/whatisgoingon.component.html',
                        providers: [whatisgoingon_service_1.WhatIsGoingOnService],
                        directives: [angular2_infinite_scroll_3.InfiniteScroll]
                    }), 
                    __metadata('design:paramtypes', [whatisgoingon_service_1.WhatIsGoingOnService, router_8.Router])
                ], WhatIsGoingOnComponent);
                return WhatIsGoingOnComponent;
            }());
            exports_53("WhatIsGoingOnComponent", WhatIsGoingOnComponent);
        }
    }
});
System.register("dashboard/dashboard.component", ['@angular/core', "recenttimeline/recenttimeline.component", "thinkhelpful/thinkhelpful.component", "whatisgoingon/whatisgoingon.component"], function(exports_54, context_54) {
    "use strict";
    var __moduleName = context_54 && context_54.id;
    var core_39, recenttimeline_component_1, thinkhelpful_component_1, whatisgoingon_component_1;
    var Dashboard;
    return {
        setters:[
            function (core_39_1) {
                core_39 = core_39_1;
            },
            function (recenttimeline_component_1_1) {
                recenttimeline_component_1 = recenttimeline_component_1_1;
            },
            function (thinkhelpful_component_1_1) {
                thinkhelpful_component_1 = thinkhelpful_component_1_1;
            },
            function (whatisgoingon_component_1_1) {
                whatisgoingon_component_1 = whatisgoingon_component_1_1;
            }],
        execute: function() {
            Dashboard = (function () {
                function Dashboard() {
                }
                Dashboard = __decorate([
                    core_39.Component({
                        selector: 'dashboard',
                        templateUrl: './app/dashboard/dashboard.component.html',
                        providers: [],
                        directives: [recenttimeline_component_1.RecentTimeLineComponent, thinkhelpful_component_1.ThinkHelpful, whatisgoingon_component_1.WhatIsGoingOnComponent]
                    }), 
                    __metadata('design:paramtypes', [])
                ], Dashboard);
                return Dashboard;
            }());
            exports_54("Dashboard", Dashboard);
        }
    }
});
System.register("notifications/notificationUpdate", [], function(exports_55, context_55) {
    "use strict";
    var __moduleName = context_55 && context_55.id;
    var NotificationUpdate;
    return {
        setters:[],
        execute: function() {
            NotificationUpdate = (function () {
                function NotificationUpdate() {
                }
                return NotificationUpdate;
            }());
            exports_55("NotificationUpdate", NotificationUpdate);
        }
    }
});
System.register("services/notifications.service", ['@angular/core', '@angular/http', 'rxjs/Observable', "services/auth.service", "app.constants", "notifications/notificationUpdate"], function(exports_56, context_56) {
    "use strict";
    var __moduleName = context_56 && context_56.id;
    var core_40, http_10, Observable_10, auth_service_11, app_constants_12, notificationUpdate_1;
    var NotificationService;
    return {
        setters:[
            function (core_40_1) {
                core_40 = core_40_1;
            },
            function (http_10_1) {
                http_10 = http_10_1;
            },
            function (Observable_10_1) {
                Observable_10 = Observable_10_1;
            },
            function (auth_service_11_1) {
                auth_service_11 = auth_service_11_1;
            },
            function (app_constants_12_1) {
                app_constants_12 = app_constants_12_1;
            },
            function (notificationUpdate_1_1) {
                notificationUpdate_1 = notificationUpdate_1_1;
            }],
        execute: function() {
            NotificationService = (function () {
                function NotificationService(http, _authService, _configuration) {
                    this.http = http;
                    this._authService = _authService;
                    this._configuration = _configuration;
                    this.webApiUrl = _configuration.ServerWithApiUrl + 'Notification';
                }
                NotificationService.prototype.getNotifications = function () {
                    var headers = this._authService.getHeader(); //new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
                    //var options = new RequestOptions({ headers: headers });
                    return this.http.get(this.webApiUrl + '/' + 'GetNotifications', {
                        headers: headers
                    })
                        .map(function (res) { return res.json(); })
                        .do(function (data) { return console.log(data); })
                        .catch(this.handleError);
                };
                NotificationService.prototype.handleError = function (error) {
                    console.error('notifi err ' + error);
                    return Observable_10.Observable.throw(error.json().error || 'Server error');
                };
                NotificationService.prototype.updateNotifications = function (id, isSnooze) {
                    var notificationUpdate = new notificationUpdate_1.NotificationUpdate();
                    var count = 0;
                    notificationUpdate.NotificationId = id;
                    notificationUpdate.IsSnooze = isSnooze;
                    console.log('updating Notification for');
                    console.log(notificationUpdate);
                    var body = JSON.stringify(notificationUpdate);
                    console.log(body);
                    var headers = this._authService.getHeader();
                    headers.append('Content-Type', 'application/json; charset=utf-8');
                    var options = new http_10.RequestOptions({ headers: headers });
                    return this.http.post(this.webApiUrl + '/' + 'UpdateNotifications', body, options)
                        .map(function (res) { return res.json(); })
                        .do(function (data) { return console.log(data); })
                        .catch(this.handleError);
                };
                NotificationService.prototype.dismissAll = function () {
                    var body = JSON.stringify("");
                    var headers = this._authService.getHeader();
                    headers.append('Content-Type', 'application/json; charset=utf-8');
                    var options = new http_10.RequestOptions({ headers: headers });
                    return this.http.post(this.webApiUrl + '/' + 'DismissAllNotifications', body, options)
                        .map(function (res) { return res.json(); })
                        .do(function (data) { return console.log(data); })
                        .catch(this.handleError);
                };
                NotificationService = __decorate([
                    core_40.Injectable(), 
                    __metadata('design:paramtypes', [http_10.Http, auth_service_11.AuthService, app_constants_12.Configuration])
                ], NotificationService);
                return NotificationService;
            }());
            exports_56("NotificationService", NotificationService);
        }
    }
});
System.register("notifications/notifications.component", ['@angular/core', "services/notifications.service", '@angular/router'], function(exports_57, context_57) {
    "use strict";
    var __moduleName = context_57 && context_57.id;
    var core_41, notifications_service_1, router_9;
    var NotificaitonComponent;
    return {
        setters:[
            function (core_41_1) {
                core_41 = core_41_1;
            },
            function (notifications_service_1_1) {
                notifications_service_1 = notifications_service_1_1;
            },
            function (router_9_1) {
                router_9 = router_9_1;
            }],
        execute: function() {
            NotificaitonComponent = (function () {
                function NotificaitonComponent(_notificationService, _router) {
                    this._notificationService = _notificationService;
                    this._router = _router;
                    this.tags = '';
                }
                NotificaitonComponent.prototype.ngOnInit = function () {
                    this.getNotifications();
                };
                NotificaitonComponent.prototype.getNotifications = function () {
                    var _this = this;
                    this._notificationService.getNotifications()
                        .subscribe(function (_nots) {
                        _this.filteredNotificaitons = JSON.parse(JSON.stringify(_nots));
                        _this.notificationCount = _nots.length;
                        console.log(_this.notifications);
                    }, function (error) {
                        _this.errorMessage = error,
                            console.log(_this.errorMessage);
                    }, function () { return function () { return console.log("Done"); }; });
                };
                NotificaitonComponent.prototype.snoozeClicked = function (notification) {
                    var _this = this;
                    this._notificationService.updateNotifications(notification.id, true)
                        .subscribe(function (_nots) {
                        _this.filteredNotificaitons = JSON.parse(JSON.stringify(_nots));
                        _this.notificationCount = _nots.length;
                        console.log(_this.notificationCount);
                    }, function (error) {
                        _this.errorMessage = error,
                            console.log(_this.errorMessage);
                    }, function () { return function () { return console.log("Done"); }; });
                };
                NotificaitonComponent.prototype.dismissClicked = function (notification) {
                    var _this = this;
                    this._notificationService.updateNotifications(notification.id, false)
                        .subscribe(function (_nots) {
                        _this.filteredNotificaitons = JSON.parse(JSON.stringify(_nots));
                        _this.notificationCount = _nots.length;
                        console.log(_this.notificationCount);
                    }, function (error) {
                        _this.errorMessage = error,
                            console.log(_this.errorMessage);
                    }, function () { return function () { return console.log("Done"); }; });
                };
                NotificaitonComponent.prototype.dismissAllClicked = function () {
                    var _this = this;
                    this._notificationService.dismissAll()
                        .subscribe(function (_nots) {
                        _this.filteredNotificaitons = JSON.parse(JSON.stringify(_nots));
                        _this.notificationCount = _nots.length;
                        console.log(_this.notificationCount);
                    }, function (error) {
                        _this.errorMessage = error,
                            console.log(_this.errorMessage);
                    }, function () { return function () { return console.log("Done"); }; });
                };
                NotificaitonComponent.prototype.select = function (selectedTimeline) {
                    this.tags = '';
                    for (var i = 0; i < selectedTimeline.tags.length; i++) {
                        this.tags = this.tags + (selectedTimeline.tags[i].name + (selectedTimeline.tags.length != i + 1 ? ',' : ''));
                    }
                    this._router.navigate(['/timeline', { tags: this.tags }]);
                };
                NotificaitonComponent = __decorate([
                    core_41.Component({
                        selector: 'notifications',
                        templateUrl: './app/notifications/notifications.component.html',
                        styles: ["\n    .zippy {\n      background-color: #ff0000 !important;\n    }\n   .zippy2 {\n      background-color: #a21318 !important;\n    }\n  "],
                        providers: [
                            notifications_service_1.NotificationService
                        ],
                    }), 
                    __metadata('design:paramtypes', [notifications_service_1.NotificationService, router_9.Router])
                ], NotificaitonComponent);
                return NotificaitonComponent;
            }());
            exports_57("NotificaitonComponent", NotificaitonComponent);
        }
    }
});
System.register("feedback/feedback-request", [], function(exports_58, context_58) {
    "use strict";
    var __moduleName = context_58 && context_58.id;
    var FeedbackRequest;
    return {
        setters:[],
        execute: function() {
            FeedbackRequest = (function () {
                function FeedbackRequest() {
                }
                return FeedbackRequest;
            }());
            exports_58("FeedbackRequest", FeedbackRequest);
        }
    }
});
System.register("services/feedback.service", ['@angular/core', '@angular/http', "app.constants", "feedback/feedback-request"], function(exports_59, context_59) {
    "use strict";
    var __moduleName = context_59 && context_59.id;
    var core_42, http_11, app_constants_13, feedback_request_1;
    var FeedbackService;
    return {
        setters:[
            function (core_42_1) {
                core_42 = core_42_1;
            },
            function (http_11_1) {
                http_11 = http_11_1;
            },
            function (app_constants_13_1) {
                app_constants_13 = app_constants_13_1;
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
                    var headers = new http_11.Headers();
                    headers.append('Content-Type', 'application/json; charset=utf-8');
                    var options = new http_11.RequestOptions({ headers: headers });
                    this.http.post(this.webApiUrl, body, options)
                        .map(function (res) { return res.json(); })
                        .subscribe(function (data) {
                        console.log("Feedback Sent: " + data);
                    }, function (err) { return console.log("error: " + JSON.stringify(err)); }, function () {
                        alert("Feedback submitted successfully");
                    });
                };
                FeedbackService = __decorate([
                    core_42.Injectable(), 
                    __metadata('design:paramtypes', [http_11.Http, app_constants_13.Configuration])
                ], FeedbackService);
                return FeedbackService;
            }());
            exports_59("FeedbackService", FeedbackService);
        }
    }
});
System.register("feedback/feedback.component", ['@angular/core', "services/feedback.service", "modal/modaldialog"], function(exports_60, context_60) {
    "use strict";
    var __moduleName = context_60 && context_60.id;
    var core_43, feedback_service_1, modaldialog_4;
    var FeedbackComponent;
    return {
        setters:[
            function (core_43_1) {
                core_43 = core_43_1;
            },
            function (feedback_service_1_1) {
                feedback_service_1 = feedback_service_1_1;
            },
            function (modaldialog_4_1) {
                modaldialog_4 = modaldialog_4_1;
            }],
        execute: function() {
            FeedbackComponent = (function () {
                function FeedbackComponent(_feedbackService) {
                    this._feedbackService = _feedbackService;
                }
                FeedbackComponent.prototype.sendFeedback = function (response) {
                    var applicationViewId = document.getElementById('application-view-id').value;
                    this._feedbackService.sendFeedback(applicationViewId, response);
                };
                FeedbackComponent = __decorate([
                    core_43.Component({
                        selector: 'user-feedback',
                        templateUrl: 'app/feedback/feedback.component.html',
                        directives: [modaldialog_4.MODAL_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [feedback_service_1.FeedbackService])
                ], FeedbackComponent);
                return FeedbackComponent;
            }());
            exports_60("FeedbackComponent", FeedbackComponent);
        }
    }
});
System.register("tags/tag-detail.component", ['@angular/core', "services/tags.service", '@angular/router'], function(exports_61, context_61) {
    "use strict";
    var __moduleName = context_61 && context_61.id;
    var core_44, tags_service_5, router_10;
    var TagDetailComponent;
    return {
        setters:[
            function (core_44_1) {
                core_44 = core_44_1;
            },
            function (tags_service_5_1) {
                tags_service_5 = tags_service_5_1;
            },
            function (router_10_1) {
                router_10 = router_10_1;
            }],
        execute: function() {
            TagDetailComponent = (function () {
                function TagDetailComponent(_router, routeSegment, _tagsService) {
                    this._router = _router;
                    this.routeSegment = routeSegment;
                    this._tagsService = _tagsService;
                    this.pageTitle = 'Tag Detail';
                }
                TagDetailComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    var id = this.routeSegment.getParam('id');
                    this._tagsService.getAllTags()
                        .subscribe(function (t) {
                        _this.tag = t.data.filter(function (t) { return t.id === +id; })[0];
                        console.log(_this.errorMessage);
                    }, function (error) {
                        console.log(_this.tag);
                    }, function () { return function () { return console.log("Done"); }; });
                };
                TagDetailComponent = __decorate([
                    core_44.Component({
                        templateUrl: './app/tags/tag-detail.component.html',
                        providers: [
                            tags_service_5.TagsService
                        ]
                    }), 
                    __metadata('design:paramtypes', [router_10.Router, router_10.RouteSegment, tags_service_5.TagsService])
                ], TagDetailComponent);
                return TagDetailComponent;
            }());
            exports_61("TagDetailComponent", TagDetailComponent);
        }
    }
});
System.register("app.component", ['@angular/core', '@angular/router', '@angular/common', "services/auth.service", "services/token.service", "notes/add-note.component", "timeline/timeline.component", "authentication/login.component", "app.constants", "tags/tags.component", "userprofile/userprofile.component", "recenttimeline/recenttimeline.component", "dashboard/dashboard.component", "notifications/notifications.component", "feedback/feedback.component", "services/feedback.service", "tags/tag-detail.component", "loader/loading.component"], function(exports_62, context_62) {
    "use strict";
    var __moduleName = context_62 && context_62.id;
    var core_45, core_46, router_11, common_1, auth_service_12, token_service_2, add_note_component_1, timeline_component_2, login_component_1, app_constants_14, tags_component_1, userprofile_component_1, recenttimeline_component_2, dashboard_component_1, notifications_component_1, feedback_component_1, feedback_service_2, tag_detail_component_1, loading_component_1;
    var AppComponent;
    return {
        setters:[
            function (core_45_1) {
                core_45 = core_45_1;
                core_46 = core_45_1;
            },
            function (router_11_1) {
                router_11 = router_11_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (auth_service_12_1) {
                auth_service_12 = auth_service_12_1;
            },
            function (token_service_2_1) {
                token_service_2 = token_service_2_1;
            },
            function (add_note_component_1_1) {
                add_note_component_1 = add_note_component_1_1;
            },
            function (timeline_component_2_1) {
                timeline_component_2 = timeline_component_2_1;
            },
            function (login_component_1_1) {
                login_component_1 = login_component_1_1;
            },
            function (app_constants_14_1) {
                app_constants_14 = app_constants_14_1;
            },
            function (tags_component_1_1) {
                tags_component_1 = tags_component_1_1;
            },
            function (userprofile_component_1_1) {
                userprofile_component_1 = userprofile_component_1_1;
            },
            function (recenttimeline_component_2_1) {
                recenttimeline_component_2 = recenttimeline_component_2_1;
            },
            function (dashboard_component_1_1) {
                dashboard_component_1 = dashboard_component_1_1;
            },
            function (notifications_component_1_1) {
                notifications_component_1 = notifications_component_1_1;
            },
            function (feedback_component_1_1) {
                feedback_component_1 = feedback_component_1_1;
            },
            function (feedback_service_2_1) {
                feedback_service_2 = feedback_service_2_1;
            },
            function (tag_detail_component_1_1) {
                tag_detail_component_1 = tag_detail_component_1_1;
            },
            function (loading_component_1_1) {
                loading_component_1 = loading_component_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(_router, _tokenService) {
                    this._router = _router;
                    this._tokenService = _tokenService;
                    this.isAuthorized = this._tokenService.getTokenFromCookie() != "";
                }
                AppComponent.prototype.ngOnInit = function () {
                    if (this.isAuthorized) {
                        this._tokenService.setToken(this._tokenService.getTokenFromCookie());
                        this._router.navigate(['/dashboard']);
                    }
                    else {
                        this._router.navigate(['/login']);
                    }
                };
                AppComponent = __decorate([
                    core_45.Component({
                        selector: 'my-app',
                        styleUrls: ['app/app.component.css'],
                        templateUrl: 'app/app.component.html',
                        directives: [router_11.ROUTER_DIRECTIVES, userprofile_component_1.UserProfileComponent, notifications_component_1.NotificaitonComponent, feedback_component_1.FeedbackComponent, add_note_component_1.AddNoteComponent, loading_component_1.LoadingComponent],
                        providers: [
                            router_11.ROUTER_PROVIDERS,
                            core_46.provide(common_1.LocationStrategy, { useClass: common_1.HashLocationStrategy }),
                            auth_service_12.AuthService,
                            token_service_2.TokenService,
                            login_component_1.LoginComponent,
                            add_note_component_1.AddNoteComponent,
                            app_constants_14.Configuration,
                            feedback_service_2.FeedbackService
                        ]
                    }),
                    router_11.Routes([
                        {
                            path: '/login',
                            component: login_component_1.LoginComponent,
                        },
                        {
                            path: '/addnote',
                            component: add_note_component_1.AddNoteComponent
                        },
                        {
                            path: '/timeline',
                            component: timeline_component_2.TimeLineComponent
                        },
                        {
                            path: '/tags',
                            component: tags_component_1.TagsComponent
                        },
                        {
                            path: '/tag/:id',
                            component: tag_detail_component_1.TagDetailComponent
                        },
                        {
                            path: '/recenttimeline',
                            component: recenttimeline_component_2.RecentTimeLineComponent
                        },
                        {
                            path: '/dashboard',
                            component: dashboard_component_1.Dashboard
                        }
                    ]), 
                    __metadata('design:paramtypes', [router_11.Router, token_service_2.TokenService])
                ], AppComponent);
                return AppComponent;
            }());
            exports_62("AppComponent", AppComponent);
        }
    }
});
System.register("main", ['@angular/platform-browser-dynamic', '@angular/router', "app.component", 'rxjs/add/operator/map', '@angular/http', 'rxjs/Rx', "services/token.service", '@angular/core', "services/passtag.service"], function(exports_63, context_63) {
    "use strict";
    var __moduleName = context_63 && context_63.id;
    var platform_browser_dynamic_1, router_12, app_component_3, http_12, token_service_3, core_47, passtag_service_3;
    return {
        setters:[
            function (platform_browser_dynamic_1_1) {
                platform_browser_dynamic_1 = platform_browser_dynamic_1_1;
            },
            function (router_12_1) {
                router_12 = router_12_1;
            },
            function (app_component_3_1) {
                app_component_3 = app_component_3_1;
            },
            function (_3) {},
            function (http_12_1) {
                http_12 = http_12_1;
            },
            function (_4) {},
            function (token_service_3_1) {
                token_service_3 = token_service_3_1;
            },
            function (core_47_1) {
                core_47 = core_47_1;
            },
            function (passtag_service_3_1) {
                passtag_service_3 = passtag_service_3_1;
            }],
        execute: function() {
            core_47.enableProdMode();
            platform_browser_dynamic_1.bootstrap(app_component_3.AppComponent, [
                router_12.ROUTER_PROVIDERS,
                http_12.HTTP_PROVIDERS,
                token_service_3.TokenService,
                passtag_service_3.PassTagService
            ]);
        }
    }
});
System.register("noteshareusers/users.component", ['@angular/core', "services/users.service", "directives/collapse.directive"], function(exports_64, context_64) {
    "use strict";
    var __moduleName = context_64 && context_64.id;
    var core_48, users_service_2, collapse_directive_2;
    var UsersComponent;
    return {
        setters:[
            function (core_48_1) {
                core_48 = core_48_1;
            },
            function (users_service_2_1) {
                users_service_2 = users_service_2_1;
            },
            function (collapse_directive_2_1) {
                collapse_directive_2 = collapse_directive_2_1;
            }],
        execute: function() {
            UsersComponent = (function () {
                function UsersComponent(usersService) {
                    this.usersService = usersService;
                    this.userRequest = {
                        userName: '',
                        userId: ''
                    };
                    this.isCollapsed = false;
                    this.title = "Users";
                    this.users = [];
                    this.filteredUsers = [];
                }
                UsersComponent.prototype.ngOnInit = function () {
                    this.getUsers();
                };
                UsersComponent.prototype.filterUser = function (query, users) {
                    var filtered = [];
                    for (var i = 0; i < users.length; i++) {
                        var user = users[i];
                        if (user.userName.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                            filtered.push(user);
                        }
                    }
                    return filtered;
                };
                UsersComponent.prototype.searchUsers = function (event) {
                    var query = event.query;
                    this.filteredUsers = this.filterUser(query, this.users);
                };
                UsersComponent.prototype.getUsers = function () {
                    var _this = this;
                    this.usersService.getUsers().then(function (users) {
                        _this.users = users;
                        _this.filteredUsers = JSON.parse(JSON.stringify(users));
                    });
                };
                UsersComponent.prototype.onSelectedUsersChanged = function (users) {
                    //this.users = users.map(function (d) { return d['userName']; });
                };
                UsersComponent = __decorate([
                    core_48.Component({
                        selector: 'add-user',
                        templateUrl: './app/users/users.component.html',
                        directives: [collapse_directive_2.CollapseDirective],
                        providers: [
                            users_service_2.UsersService
                        ]
                    }), 
                    __metadata('design:paramtypes', [users_service_2.UsersService])
                ], UsersComponent);
                return UsersComponent;
            }());
            exports_64("UsersComponent", UsersComponent);
        }
    }
});
//# sourceMappingURL=bundle.js.map