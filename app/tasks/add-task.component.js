System.register(['@angular/core', '@angular/router', '@angular/common', './task-request', 'primeng/primeng', '../services/tasks.service', '../tags/tags-selector.component', '../services/passtag.service', '../services/user_profile.service', '../services/users.service', '../notes/note-editor.component'], function(exports_1, context_1) {
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
    var core_1, router_1, common_1, task_request_1, primeng_1, tasks_service_1, tags_selector_component_1, passtag_service_1, user_profile_service_1, users_service_1, note_editor_component_1;
    var AddTaskComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (task_request_1_1) {
                task_request_1 = task_request_1_1;
            },
            function (primeng_1_1) {
                primeng_1 = primeng_1_1;
            },
            function (tasks_service_1_1) {
                tasks_service_1 = tasks_service_1_1;
            },
            function (tags_selector_component_1_1) {
                tags_selector_component_1 = tags_selector_component_1_1;
            },
            function (passtag_service_1_1) {
                passtag_service_1 = passtag_service_1_1;
            },
            function (user_profile_service_1_1) {
                user_profile_service_1 = user_profile_service_1_1;
            },
            function (users_service_1_1) {
                users_service_1 = users_service_1_1;
            },
            function (note_editor_component_1_1) {
                note_editor_component_1 = note_editor_component_1_1;
            }],
        execute: function() {
            AddTaskComponent = (function () {
                function AddTaskComponent(fb, _tasksService, _router, _passTagService, _userProfileService, _userService, zone) {
                    this._tasksService = _tasksService;
                    this._router = _router;
                    this._passTagService = _passTagService;
                    this._userProfileService = _userProfileService;
                    this._userService = _userService;
                    this.zone = zone;
                    this.taskRequest = {
                        title: '',
                        description: '',
                        tags: [],
                        user: '',
                        dueDate: ''
                    };
                    this.userProfileData = {
                        email: '',
                        name: '',
                        profileImageId: '',
                        userTags: []
                    };
                    this.heading = "ADD NOTES";
                    this.tags = [];
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
                    this.taskForm = fb.group({
                        'title': new common_1.Control(this.taskRequest.title, common_1.Validators.required),
                        'dueDate': new common_1.Control(this.taskRequest.dueDate, common_1.Validators.required),
                        'user': new common_1.Control(this.taskRequest.user, common_1.Validators.compose([common_1.Validators.required, AddTaskComponent.isValidUser]))
                    });
                }
                AddTaskComponent.prototype.ngOnInit = function () {
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
                        _this.taskRequest.tags = _this.initialTags;
                        _this.active = true;
                    }, function (error) {
                        _this.errorMessage = error,
                            console.log(_this.errorMessage);
                    }, function () { return function () { return console.log("Done"); }; });
                    this._userService.getUsers().then(function (users) {
                        AddTaskComponent.users = users;
                    });
                };
                AddTaskComponent.prototype.filterUserSingle = function (event) {
                    var _this = this;
                    var query = event.query;
                    this._userService.getUsers().then(function (users) {
                        _this.filteredUsersSingle = _this.filteruser(query, users);
                    });
                };
                AddTaskComponent.prototype.filteruser = function (query, users) {
                    var filtered = [];
                    for (var i = 0; i < users.length; i++) {
                        var user = users[i];
                        if (user.userName.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                            filtered.push(user);
                        }
                    }
                    return filtered;
                };
                AddTaskComponent.isValidUser = function (control) {
                    if (control.value && control.value.length > 0) {
                        var filtered = [];
                        for (var i = 0; i < AddTaskComponent.users.length; i++) {
                            var user = AddTaskComponent.users[i];
                            if (user.userName.toLowerCase() === control.value.toLowerCase()) {
                                filtered.push(user);
                            }
                        }
                        if (filtered.length == 0)
                            return { 'isValidUser': false };
                    }
                    else if (control.value === '') {
                        return { 'isValidUser': false };
                    }
                    return null;
                };
                AddTaskComponent.prototype.Save = function () {
                    var _this = this;
                    if (!this.showCloseButton)
                        $('#tagInput').text('');
                    var inputTagStr = $('#tagInput').text();
                    if (inputTagStr.trim() == '') {
                        if (this.taskRequest.tags.length == 0) {
                            this.istagSelectionValidated = false;
                            return;
                        }
                        else
                            this.istagSelectionValidated = true;
                        this.isFromSlider = false;
                    }
                    else {
                        this.taskRequest.tags = inputTagStr.trim().split(",");
                        this.istagSelectionValidated = true;
                        this.isFromSlider = true;
                    }
                    window.loadingComponentRef.zone.run(function () { window.loadingComponentRef.component.show(); });
                    this._tasksService.addTask(this.taskRequest)
                        .subscribe(function (task) {
                        _this.tagList = '';
                        for (var i = 0; i < task.tags.length; i++) {
                            _this.tagList = _this.tagList + (task.tags[i].name + (task.tags.length != i + 1 ? ',' : ''));
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
                AddTaskComponent.prototype.onSelectedTagsChanged = function (tags) {
                    var automaticInitialTags = this.automaticInitialTags;
                    var userAddedTags = [];
                    //Identify user entered tags via Autocomplete component
                    this.taskRequest.tags = tags.map(function (d) {
                        var tag = d['name'];
                        if (automaticInitialTags.indexOf(tag) === -1) {
                            userAddedTags.push(tag);
                        }
                        return tag;
                    });
                    this.userAddedTags = userAddedTags;
                    if (this.taskRequest.tags.length == 0) {
                        this.istagSelectionValidated = false;
                    }
                    else
                        this.istagSelectionValidated = true;
                };
                AddTaskComponent.prototype.clear = function () {
                    var _this = this;
                    this.taskRequest = new task_request_1.TaskRequest('', '', [], '', '');
                    this.active = false;
                    setTimeout(function () { return _this.active = true; }, 0);
                };
                AddTaskComponent.prototype.TagsAdded = function (tags) {
                    var stringTags = [];
                    //automaticInitialTags = InitialTags + Automatic tags
                    var automaticInitialTags = [];
                    //Get existing tags from AutoComplete component 
                    var existingTags = this.taskRequest.tags.map(function (item) {
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
                        this.taskRequest.tags.length = 0;
                        this.taskRequest.tags = stringTags;
                        window.AutoCompleteComponentRef.zone.run(function () { window.AutoCompleteComponentRef.component.LoadExternalInputData(true); });
                    }
                };
                AddTaskComponent.prototype.TagsAddedDesc = function (event) {
                    this.taskRequest.description = event;
                };
                AddTaskComponent.prototype.updateSelectedTags = function () {
                    this.tagsStr = this._passTagService.getTags();
                    console.log('calledFromOutside ' + this._passTagService.getTags());
                    if (this.tagsStr != null) {
                        var tagsArr = this.tagsStr.split(",");
                        for (var i = 0; i < tagsArr.length; i++) {
                            var tag = tagsArr[i];
                            this.passedTags.push(tag);
                        }
                        this.taskRequest.tags = this.passedTags;
                    }
                    console.log('calledFromOutside tags ' + this.taskRequest.tags);
                };
                AddTaskComponent.prototype.Close = function () {
                    this.clear();
                };
                AddTaskComponent.users = [];
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], AddTaskComponent.prototype, "showCloseButton", void 0);
                AddTaskComponent = __decorate([
                    core_1.Component({
                        selector: 'add-task',
                        templateUrl: './app/tasks/add-task.component.html',
                        providers: [
                            tasks_service_1.TasksService,
                            user_profile_service_1.UserProfileService,
                            users_service_1.UsersService
                        ],
                        directives: [tags_selector_component_1.TagsSelectorComponent, primeng_1.Editor, primeng_1.Header, primeng_1.Calendar, primeng_1.AutoComplete, note_editor_component_1.NoteEditorComponent]
                    }), 
                    __metadata('design:paramtypes', [common_1.FormBuilder, tasks_service_1.TasksService, router_1.Router, passtag_service_1.PassTagService, user_profile_service_1.UserProfileService, users_service_1.UsersService, core_1.NgZone])
                ], AddTaskComponent);
                return AddTaskComponent;
            }());
            exports_1("AddTaskComponent", AddTaskComponent);
        }
    }
});
//# sourceMappingURL=add-task.component.js.map