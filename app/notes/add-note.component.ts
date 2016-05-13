﻿import {Component} from 'angular2/core';
import {NoteRequest} from './note-request';
import {NotesService} from '../services/notes.service';
import {TimeLineComponent} from '../timeline/timeline.component';
import { TagsSelectorComponent } from '../tags/tags-selector.component';
import { UsersSelectorComponent } from '../noteshareusers/users-selector.component';
import { MODAL_DIRECTIVES } from 'ng2-bs3-modal/ng2-bs3-modal';
import {Editor} from 'primeng/primeng';
import {Header} from 'primeng/primeng';
import { Router} from 'angular2/router';

@Component({
    selector: 'add-note',
    templateUrl: './app/notes/add-note.component.html',
    providers: [
        NotesService
    ],
    directives: [TimeLineComponent, TagsSelectorComponent, MODAL_DIRECTIVES, Editor, Header,UsersSelectorComponent]
})

export class AddNoteComponent {
    constructor(private _notesService: NotesService, public _router: Router) {
    }
    public noteRequest: NoteRequest = {
        title: '',
        description: '',
        tags: [],
        users: []
    };

    title = "ADD NOTES";
    tags: any[] = [];
    users: any[] = [];
    errorMessage: string;
    tagList: string = '';

    Save() {
        //this._notesService.addNote(this.noteRequest);
        this._notesService.addNote(this.noteRequest)
            .subscribe(note => {
                    for (var i = 0; i < note.tags.length; i++) {
                        this.tagList = this.tagList + (note.tags[i].name + (note.tags.length != i + 1 ? ',' : ''));
                    }
                    this.clear();
                    this._router.navigate(['TimeLine', { tags: this.tagList }]);
                },
                error => {
                    this.errorMessage = <any>error,
                        console.log(this.errorMessage);
                },
                () => () => console.log("Done"));
    }

    Share() {
        console.log('Share This Note');
    }

    onSelectedTagsChanged(tags: any[]): void {
        this.noteRequest.tags = tags.map(function (d) { return d['name']; });
    }

    onSelectedUsersChanged(users: any[]): void {
        this.noteRequest.users = users.map(function (d) { return d['userName']; });
    }
    clear() {
        this.noteRequest.title = '';
        this.noteRequest.description = null;
    }
}