
import { Component, ViewChild, ElementRef } from '@angular/core';
import { PieceOfArtSource } from '../enigmas/enigma.source';

@Component({
    selector: 'slide-comp',
    styleUrls: ['slide.component.scss'],
    templateUrl: 'slide.component.html'
})
export class SlideComponent {

    // slides = [
    //     {
    //         title: 'Hack my Art',
    //         imageUrl: 'assets/banniere_Hackmyart_v7.jpg',
    //         private: false
    //     },
    //     {
    //         title: 'Pingouin',
    //         imageUrl: 'assets/655x369-pingouin_1452715089.jpg',
    //         private: false
    //     },
    //     {
    //         title: 'La ronde brisée des sœurs ennemies',
    //         imageUrl: 'assets/TexteEnigme1.JPG',
    //         private: false,
    //     }
    // ];

    public piecesOfArt: PieceOfArtSource = new PieceOfArtSource();

    public message = '';

    @ViewChild('input', { static: false }) myInput: ElementRef;


    constructor() { }



    public setInputTextFocus() {
        this.myInput.nativeElement.focus();
    }
}
