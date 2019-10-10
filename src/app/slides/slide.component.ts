
import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { PieceOfArtSource } from '../enigmas/enigma.source';
import { IonInput, IonSlides } from '@ionic/angular';
import { Router } from '@angular/router';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion/ngx';
import { DBMeter } from '@ionic-native/db-meter/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

// import { NativeAudio } from '@ionic-native/native-audio/ngx';


@Component({
    selector: 'slide-comp',
    styleUrls: ['slide.component.scss'],
    templateUrl: 'slide.component.html',
    providers: [DeviceMotion, DBMeter, ScreenOrientation]
})
export class SlideComponent implements AfterViewInit {

    public pieceOfArtSource: PieceOfArtSource = new PieceOfArtSource();

    public selectedPiecOfArtId: number;
    private numberOfClick = 0;
    private interval: any;
    private timeLeft = 10;
    public isUnlock = false;
    public maintimeLeft = 30;

    public message = '';

    @ViewChild('input', { static: false }) myInput: IonInput;
    @ViewChild('videoPlayer', { static: false }) videoPlayer: ElementRef;
    @ViewChild(IonSlides, { static: false }) slides: IonSlides;

    constructor(private router: Router,
        private deviceMotion: DeviceMotion,
        private dbMeter: DBMeter,
        private screenOrientation: ScreenOrientation) {

        console.log('toto');

        this.deviceMotion.watchAcceleration().subscribe((acceleration: DeviceMotionAccelerationData) => {
            console.log(acceleration);
        });
    }



    public setInputTextFocus() {
        this.myInput.setFocus();
    }

    public isItCorrect(pieceOfArtId: number) {
        console.log('change', this.message);
        if (this.message.toUpperCase() === this.pieceOfArtSource.peiceOfArts[pieceOfArtId].answer) {
            this.isUnlock = true;
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
            this.isUnlock = true;
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

    public slideChanged() {
        this.slides.getActiveIndex().then(res => {
            console.log('selectedPieceId', res);
            this.isUnlock = false;
            this.maintimeLeft = 30;
            this.selectedPiecOfArtId = res;
            if (res === 3) {
                console.log('here db meter is gonna start');
                this.dbMeter.start().subscribe(
                    data => {
                        console.log(data);
                        if (data > 80) {
                            this.isUnlock = true;
                            this.router.navigate(['result'], { queryParams: { pieceOfArt: this.selectedPiecOfArtId } });
                        }
                    });
            } else {
                if (this.dbMeter.isListening) {
                    this.dbMeter.stop();
                }
            }
            if (res === 1) {
                this.screenOrientation.onChange().subscribe(
                    () => {
                        console.log('Orientation Changed');
                        console.log(this.screenOrientation.type);
                        const video: HTMLVideoElement = this.videoPlayer.nativeElement;
                        if (this.screenOrientation.type === 'landscape-secondary') {
                            video.play();
                        } else {
                            video.pause();
                        }
                    });
            }
        });
    }
}
