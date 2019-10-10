
import { Component, ViewChild, ElementRef } from '@angular/core';
import { PieceOfArtSource } from '../enigmas/enigma.source';
import { IonInput } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
    selector: 'slide-comp',
    styleUrls: ['slide.component.scss'],
    templateUrl: 'slide.component.html'
})
export class SlideComponent {

    public pieceOfArtSource: PieceOfArtSource = new PieceOfArtSource();

    public selectedPiecOfArtId: number;

    public message = '';

    @ViewChild('input', { static: false }) myInput: IonInput;


    constructor(private router: Router) { }



    public setInputTextFocus() {
        this.myInput.setFocus();
    }

    public isItCorrect(pieceOfArtId: number) {
        console.log('change', this.message);
        if (this.message.toUpperCase() === this.pieceOfArtSource.peiceOfArts[pieceOfArtId].answer) {
            this.router.navigate(['result'], { queryParams: { pieceOfArt: pieceOfArtId } });
        }
    }
}
