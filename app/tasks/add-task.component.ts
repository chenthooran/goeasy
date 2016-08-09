import {Component, OnInit, NgZone, Input} from '@angular/core';
import {Router} from '@angular/router';
import {ControlGroup, Control, FormBuilder, Validators} from '@angular/common';
import {TaskRequest} from './task-request';
import {Calendar, AutoComplete, Editor, Header} from 'primeng/primeng';
import {TasksService} from '../services/tasks.service';
import {UserProfileData} from '../userprofile/userprofile.component';
import {TagsSelectorComponent} from '../tags/tags-selector.component';
import {PassTagService} from '../services/passtag.service';
import {UserProfileService} from '../services/user_profile.service';
import {UsersService} from '../services/users.service';
import {Tag} from '../tags/tags-response';
import {LoadingComponent} from '../loader/loading.component';
import {NoteEditorComponent} from '../notes/note-editor.component';
declare var $;
declare var ip_country;

interface ValidationResult {
    [key: string]: boolean;
}

@Component({
    selector: 'add-task',
    templateUrl: './app/tasks/add-task.component.html',
    providers: [
        TasksService,
        UserProfileService,
        UsersService
    ],
    directives: [TagsSelectorComponent, Editor, Header, Calendar, AutoComplete, NoteEditorComponent]
})

export class AddTaskComponent implements OnInit {
    taskForm: ControlGroup;
    static users: any[] = [];
    constructor(fb: FormBuilder, private _tasksService: TasksService, public _router: Router, private _passTagService: PassTagService, private _userProfileService: UserProfileService, private _userService: UsersService, private zone: NgZone) {
        (<any>window).angularComponentRef = {
            zone: this.zone, 
            component: this
        };

        this.taskForm = fb.group({
            'title': new Control(this.taskRequest.title, Validators.required),
            'dueDate': new Control(this.taskRequest.dueDate, Validators.required),
            'user': new Control(this.taskRequest.user, Validators.compose([Validators.required, AddTaskComponent.isValidUser]))
        });
    }
    public taskRequest: TaskRequest = {
        title: '',
        description: '',
        tags: [],
        user: '',
        dueDate: ''
    };
	
	public userProfileData: UserProfileData = {
        email: '',
        name: '',
        profileImageId: '',
		userTags:[]
    };

    heading = "ADD NOTES";
    tags: any[] = [];
    errorMessage: string;
    tagList: string = '';
    active = true;
    tagsStr: string='';
    istagSelectionValidated: boolean;
    isFromSlider: boolean = false;
    isToggle: boolean = false;
    passedTags: Tag[] = [];
    initialTags: any[] = [];
    automaticInitialTags: any[] = [];
    userAddedTags: any[] = [];

    filteredUsersSingle: any[];

    @Input() showCloseButton: boolean = false;
    ngOnInit() {
        this.active = false;

        this._userProfileService.getUserProfile()
		.subscribe(data => {
			this.userProfileData = JSON.parse(JSON.stringify(data));
			this.initialTags.push(this.userProfileData.name);
			if(this.userProfileData.userTags && this.userProfileData.userTags.length > 0){
				var tags = this.userProfileData.userTags;
				for(var x=0;x<tags.length;x++){
					this.initialTags.push(tags[x].description);
				}
			}
			this.istagSelectionValidated = true;
			this.isToggle = false;
			if(ip_country && ip_country != '')
				this.initialTags.push(ip_country.trim());
            this.taskRequest.tags = this.initialTags;
			this.active = true;
			},
		error => {
			this.errorMessage = <any>error,
			console.log(this.errorMessage);
		},
		() => () => console.log("Done"));	

        this._userService.getUsers().then(users => {
            AddTaskComponent.users = users;
        });
    }

    filterUserSingle(event) {
        let query = event.query;
        this._userService.getUsers().then(users => {
            this.filteredUsersSingle = this.filteruser(query, users);
        });
    }


    filteruser(query, users: any[]): any[] {
        let filtered: any[] = [];
        for (let i = 0; i < users.length; i++) {
            let user = users[i];
            if (user.userName.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(user);
            }
        }
        return filtered;
    }

    static isValidUser(control: Control): ValidationResult {
        if (control.value && control.value.length > 0) {
            let filtered: any[] = [];
            for (let i = 0; i < AddTaskComponent.users.length; i++) {
                let user = AddTaskComponent.users[i];
                if (user.userName.toLowerCase() === control.value.toLowerCase()) {
                    filtered.push(user);
                }
            }

            if (filtered.length == 0)
                return { 'isValidUser': false };
        }
        else if (control.value === ''){
            return { 'isValidUser': false };
        }
        
        return null;
    }

    Save() {

        if (!this.showCloseButton)
            $('#tagInput').text('');

        let inputTagStr = $('#tagInput').text();

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

        (<any>window).loadingComponentRef.zone.run(function () { (<any>window).loadingComponentRef.component.show(); });
        this._tasksService.addTask(this.taskRequest)
            .subscribe(task => {
                this.tagList = '';
                for (var i = 0; i < task.tags.length; i++) {
                    this.tagList = this.tagList + (task.tags[i].name + (task.tags.length != i + 1 ? ',' : ''));
                }
                this.clear();
                (<any>window).loadingComponentRef.zone.run(function () { (<any>window).loadingComponentRef.component.hide(); });
                if (this.isFromSlider) {
                    if (this.isToggle)
                        this._router.navigate(['/timeline', { tags: this.tagList + ',,' }]);
                    else
                        this._router.navigate(['/timeline', { tags: this.tagList + ',' }]);

                    this.isToggle = !this.isToggle;
                }
                else {
                    this._router.navigate(['/timeline', { tags: this.tagList }]);
                }
            },
            error => {
                this.errorMessage = <any>error,
                    console.log(this.errorMessage);
                (<any>window).loadingComponentRef.zone.run(function () { (<any>window).loadingComponentRef.component.hide(); });
            },
            () => () => {
                console.log("Done");
                (<any>window).loadingComponentRef.zone.run(function () { (<any>window).loadingComponentRef.component.hide(); });
            });
    }
	
    onSelectedTagsChanged(tags: any[]): void {
        var automaticInitialTags = this.automaticInitialTags;
        var userAddedTags: any[] = [];

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
    }
	
    clear() {
        this.taskRequest = new TaskRequest('', '', [], '', '');
        this.active = false;
        setTimeout(() => this.active = true, 0);
    }

    TagsAdded(tags: any[]): void {
        var stringTags: any[] = [];

        //automaticInitialTags = InitialTags + Automatic tags
        var automaticInitialTags: any[] = [];

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
            var strArray = a.toString().toLowerCase().split(',')
            if (strArray.indexOf(b.toLowerCase()) < 0) a.push(b);
            return a;
        }, []);

        this.automaticInitialTags = automaticInitialTags;

        if (stringTags.length != 0) {
            this.taskRequest.tags.length = 0;
            this.taskRequest.tags = stringTags;         
            (<any>window).AutoCompleteComponentRef.zone.run(function () { (<any>window).AutoCompleteComponentRef.component.LoadExternalInputData(true); });
        }
    }

    TagsAddedDesc(event: string): void {
        this.taskRequest.description = event;
    }

    updateSelectedTags() {
        this.tagsStr = this._passTagService.getTags();
        console.log('calledFromOutside ' + this._passTagService.getTags());

        if (this.tagsStr != null) {
            var tagsArr = this.tagsStr.split(",");
            for (var i = 0; i < tagsArr.length; i++) {
                var tag: any = tagsArr[i];
                this.passedTags.push(tag);
            }
            this.taskRequest.tags = this.passedTags;
        }
        console.log('calledFromOutside tags ' + this.taskRequest.tags);  
    }

    Close() {
        this.clear();
    }
}