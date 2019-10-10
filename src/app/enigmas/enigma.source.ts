import { PieceOfArt } from '../models/PieceOfArt';
import { EnigmaTypeEnum } from '../models/EnigmaType';
import { runInThisContext } from 'vm';


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
            assetLink: 'assests/whitney.mp4',
            title: 'Shake Withney',
        });
    }
}
