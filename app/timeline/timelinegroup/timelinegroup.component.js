System.register(['@angular/core'], function(exports_1, context_1) {
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
    var core_1;
    var TimelineInfo, TimelineGroup;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
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
                    core_1.Input('closeOthers'), 
                    __metadata('design:type', Boolean)
                ], TimelineInfo.prototype, "onlyOneOpen", void 0);
                TimelineInfo = __decorate([
                    core_1.Component({
                        selector: 'timelineinfo',
                        template: "<ng-content></ng-content>"
                    }), 
                    __metadata('design:paramtypes', [])
                ], TimelineInfo);
                return TimelineInfo;
            }());
            exports_1("TimelineInfo", TimelineInfo);
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
                    core_1.Component({
                        selector: 'timeline-group',
                        inputs: ['heading', 'isOpen', 'isDisabled', 'availableCountText'],
                        templateUrl: './app/timeline/timelinegroup/timelinegroup.component.html'
                    }), 
                    __metadata('design:paramtypes', [TimelineInfo])
                ], TimelineGroup);
                return TimelineGroup;
            }());
            exports_1("TimelineGroup", TimelineGroup);
        }
    }
});
//# sourceMappingURL=timelinegroup.component.js.map