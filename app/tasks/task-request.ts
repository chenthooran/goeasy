import { Tag } from '../tags/tags-response';

export class TaskRequest {
    constructor(public title: string,
        public description: string,
        public tags: Tag[],
        public user: string,
        public dueDate: string
    ){}
    
}