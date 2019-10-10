import { EnigmaTypeEnum } from './EnigmaType';

export class PieceOfArt {
    title: string;
    assetLink: string;
    enigmaType: number;
    textIndication?: string;
    answer?: string;
    resultType?: string;
    resultLocation?: string;
    numberOfTap?: number;
}
