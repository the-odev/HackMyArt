import { PieceOfArt } from '../models/PieceOfArt'
import { EnigmaTypeEnum } from '../models/EnigmaType';


export class PieceOfArtSource {

    public peiceOfArts: PieceOfArt[];

    constructor() {
        this.peiceOfArts = [];
        this.peiceOfArts.push({
            enigmaType: EnigmaTypeEnum.Text,
            assetLink: 'assets/TexteEnigme1.JPG',
            title: 'La ronde brisée des sœurs ennemies',
            textIndication: 'Qui sont-elles ?'
        });
    }
}
