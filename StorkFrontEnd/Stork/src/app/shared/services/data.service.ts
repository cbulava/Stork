import { Injectable } from '@angular/core';

@Injectable()
export class DataService {
    
    constructor() { }
    
    getProjectName() {
        return 'Angular 2 Bare Bones';
    }

}