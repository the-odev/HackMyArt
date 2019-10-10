import { PieceOfArt } from '../models/PieceOfArt';


export class PieceOfArtSource {

    public peiceOfArts: PieceOfArt[];

    constructor() {
        this.peiceOfArts = [];
        this.peiceOfArts.push({
            enigmaType: 1,
            assetLink: 'assets/TexteEnigme1.JPG',
            title: 'La ronde brisée des sœurs ennemies',
            textIndication: 'Qui sont-elles ?',
            answer: 'HEURES',
            resultType: 'HTML',
            resultLocation: 'assets/texteEnigmeAnswer.html'
        });
        this.peiceOfArts.push({
            enigmaType: 3,
            assetLink: 'assets/TROPA WHITNEY AE V1.webm',
            title: 'Shake Withney',
        });
        this.peiceOfArts.push({
            enigmaType: 4,
            assetLink: 'assets/artungopale.jpg',
            title: '',
            resultType: 'OPALE'
        });
        this.peiceOfArts.push({
            enigmaType: 2,
            assetLink: 'assets/Artung enigme 1.mp3',
            title: '',
            resultType: 'SOUND',
            resultLocation: 'assets/Artung réponse 1.mp3'
        });
    }
}
