
import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { PieceOfArtSource } from '../enigmas/enigma.source';
import { IonInput } from '@ionic/angular';
import { Router } from '@angular/router';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion/ngx';


@Component({
    selector: 'slide-comp',
    styleUrls: ['slide.component.scss'],
    templateUrl: 'slide.component.html',
    providers: [DeviceMotion]
})
export class SlideComponent implements AfterViewInit {

    public pieceOfArtSource: PieceOfArtSource = new PieceOfArtSource();

    public selectedPiecOfArtId: number;
    private numberOfClick = 0;
    private interval: any;
    private timeLeft = 10;

    public message = '';

    @ViewChild('input', { static: false }) myInput: IonInput;
    @ViewChild('videoPlayer', { static: false }) videoPlayer: ElementRef;

    constructor(private router: Router, private deviceMotion: DeviceMotion) {

        console.log('toto');

        const subscription = this.deviceMotion.watchAcceleration().subscribe((acceleration: DeviceMotionAccelerationData) => {
            alert(acceleration);
            console.log(acceleration);
        });

        // Stop watch
        subscription.unsubscribe();
    }



    public setInputTextFocus() {
        this.myInput.setFocus();
    }

    public isItCorrect(pieceOfArtId: number) {
        console.log('change', this.message);
        if (this.message.toUpperCase() === this.pieceOfArtSource.peiceOfArts[pieceOfArtId].answer) {
            this.router.navigate(['result'], { queryParams: { pieceOfArt: pieceOfArtId } });
        }
    }

    ngAfterViewInit() {
        if (this.videoPlayer) {
            const video: HTMLVideoElement = this.videoPlayer.nativeElement;
            video.pause();
        }
    }

    public checkNumberOfClick(pieceOfArtId: number) {
        this.numberOfClick++;
        if (this.numberOfClick === 0) {
            this.startTimer();
        }
        if (this.numberOfClick === 9) {
            this.router.navigate(['result'], { queryParams: { pieceOfArt: pieceOfArtId } });
        }

    }

    startTimer() {
        this.interval = setInterval(() => {
            if (this.timeLeft >= 0) {
                this.timeLeft--;
            } else {
                this.numberOfClick = 0;
                this.timeLeft = 10;
            }
        }, 1000);
    }
}
