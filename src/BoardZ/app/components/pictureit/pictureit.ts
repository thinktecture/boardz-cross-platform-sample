import {Component, Input} from 'angular2/core';

@Component({
    selector: 'picture-it',
    templateUrl: 'app/components/pictureit/pictureit.html'
})
export class PictureItComponenet{
    
    @Input('picture-url') _pictureUrl: string;
    
    
    constructor(){
        
    }
    
    public takePicture(){
        
    }
}