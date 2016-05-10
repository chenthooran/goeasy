﻿import {Component} from 'angular2/core';
import { TagsService } from '../services/tags.service';
import { UsersSelectorComponent } from '../noteshareusers/users-selector.component';

@Component({
    selector: 'sharetimeline',
    directives: [UsersSelectorComponent],
    templateUrl: './app/sharetimeline/sharetimeline.component.html',
    providers: [TagsService]
})
export class ShareTimelineComponent {
    filteredUsersMultiple: any[];
    users: any[] = [];

    constructor(private tagService: TagsService) { }

    filterUserMultiple(event) {
        let query = event.query;
        this.tagService.getTags().then(users => {
            this.filteredUsersMultiple = this.filtertag(query, users);
        });
    }

    filtertag(query, users: any[]): any[] {
        //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
        let filtered: any[] = [];
        for (let i = 0; i < users.length; i++) {
            let user = users[i];
            if (user.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(user);
            }
        }
        return filtered;
    }

    onSelectedUsersChanged(users: any[]): void {
        this.users = users.map(function (d) { return d['userName']; });
    }

}