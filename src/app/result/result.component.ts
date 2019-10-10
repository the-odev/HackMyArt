import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PieceOfArtSource } from '../enigmas/enigma.source';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-home',
    templateUrl: 'result.component.html',
    styleUrls: ['result.component.scss']
})
export class ResultComponent {

    public pieceOfArtSource = new PieceOfArtSource();

    public htmlAnswer: string;
    constructor(private activatedRoute: ActivatedRoute, private httpClient: HttpClient) {
        this.activatedRoute.queryParams.subscribe(params => {
            const pieceOfArtId = params.pieceOfArt as number;
            if (this.pieceOfArtSource.peiceOfArts[pieceOfArtId].resultType === 'HTML') {
                this.httpClient.get(this.pieceOfArtSource.peiceOfArts[pieceOfArtId].resultLocation, { responseType: 'text' })
                    .subscribe(res => {
                        this.htmlAnswer = res;
                    });

            }
        });
    }
}
