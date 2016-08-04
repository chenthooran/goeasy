import {Component, OnInit, Input, NgZone} from '@angular/core';
import {Editor} from 'primeng/primeng';
import {Header} from 'primeng/primeng';
import {NotesService} from '../services/notes.service';
import {NoteEditorComponent} from '../notes/note-editor.component';
import { TagsSelectorComponent } from '../tags/tags-selector.component';
import { Tag } from '../tags/tags-response';
declare var $;
export class EditNoteRequest {
    ID: number;
    Title: string;
    Description: string;
}

@Component({
    selector: 'edit-note',
    inputs: ['title', 'description', 'id'],
    templateUrl: './app/notes/edit-note.component.html',
    providers: [
        NotesService
    ],
    directives: [Editor, Header, NoteEditorComponent,TagsSelectorComponent]
})

    export class EditNoteComponent implements OnInit {
    title: string;
    description: string;
    id: number;
    errorMessage: string = "";
    tags: any[] = [];
    constructor(private _notesService: NotesService, private zone: NgZone) {
    }

    heading = "EDIT NOTES";
    public editNoteRequest: EditNoteRequest = {
        ID: 0,
        Title: '',
        Description: '',
    };
    ngOnInit() {
        this.editNoteRequest.Title = this.title;
        this.editNoteRequest.Description = this.description;
        this.editNoteRequest.ID = this.id;
        //this.tags=$('#tagInput').text();
    }

    Save() {
        this._notesService.editNote(this.editNoteRequest)
            .subscribe(note => {
                var result = JSON.parse(note._body);
                (<any>window).timelineComponentRef.zone.run(function () { (<any>window).timelineComponentRef.component.toggleOpenEditNoteWithoutEvent(result); });
            },
            error => {
                this.errorMessage = <any>error,
                    console.log(this.errorMessage);
            },
            () => () => {
                console.log("Done");
            });
    }
    Close() {
    }

    TagsAddedDesc(event: string): void {
        this.editNoteRequest.Description = event;
    }
    TagsAdded(tags: any[]): void {
        var stringTags: any[] = [];
    }
     onSelectedTagsChanged(tags: any[]): void {
            console.log('tags>>');
     };

}