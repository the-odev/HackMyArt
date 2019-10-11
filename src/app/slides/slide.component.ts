
import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { PieceOfArtSource } from '../enigmas/enigma.source';
import { IonInput, IonSlides } from '@ionic/angular';
import { Router } from '@angular/router';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion/ngx';
import { DBMeter } from '@ionic-native/db-meter/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { Subscription } from 'rxjs';
import { Time } from '@angular/common';

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
    private deviceMotionsubscribe: Subscription;
    private dbMeterSubscribe: Subscription;
    private lastUpdate: number;
    private lastX: number;
    private lastY: number;
    private lastZ: number;

    public message = '';

    @ViewChild('input', { static: false }) myInput: IonInput;
    @ViewChild('videoPlayer', { static: false }) videoPlayer: ElementRef;
    @ViewChild('videoPlayer2', { static: false }) videoPlayer2: ElementRef;
    @ViewChild(IonSlides, { static: false }) slides: IonSlides;

    constructor(
        private router: Router,
        private deviceMotion: DeviceMotion,
        private dbMeter: DBMeter,
        private screenOrientation: ScreenOrientation) {
    }

    ngAfterViewInit() {
        if (this.videoPlayer) {
            const video: HTMLVideoElement = this.videoPlayer.nativeElement;
            const video2: HTMLVideoElement = this.videoPlayer2.nativeElement;
            video.pause();
            video2.pause();
        }
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
                if (!this.dbMeterSubscribe) {
                    this.dbMeter.start().subscribe(
                        data => {
                            console.log(data);
                            if (data > 80) {
                                this.isUnlock = true;
                                this.router.navigate(['result'], { queryParams: { pieceOfArt: this.selectedPiecOfArtId } });
                            }
                        });
                }
            } else {
                if (this.dbMeterSubscribe) {
                    this.dbMeter.isListening().then(listen => {
                        if (listen) {
                            this.dbMeter.stop();
                        }
                    });
                    this.dbMeterSubscribe.unsubscribe();
                    this.dbMeterSubscribe = null;
                }
            }
            if (res === 1) {
                if (!this.deviceMotionsubscribe) {
                    this.deviceMotionsubscribe = this.deviceMotion.watchAcceleration({ frequency: 200 })
                        .subscribe((acceleration: DeviceMotionAccelerationData) => {
                            this.checkAccelartion(acceleration);
                        });
                }
            } else {
                if (this.deviceMotionsubscribe) {
                    this.deviceMotionsubscribe.unsubscribe();
                    this.deviceMotionsubscribe = null;
                    const video: HTMLVideoElement = this.videoPlayer.nativeElement;
                    video.pause();
                }
            }
            if (res === 4) {
                console.log('orientation');
                this.screenOrientation.onChange().subscribe(
                    () => {
                        console.log('Orientation Changed');
                        console.log(this.screenOrientation.type);
                        const video: HTMLVideoElement = this.videoPlayer2.nativeElement;
                        if (this.screenOrientation.type === 'portrait-secondary') {
                            video.play();
                        } else {
                            video.pause();
                        }
                    });
            }
        });
    }

    public checkAccelartion(acceleration: DeviceMotionAccelerationData) {
        const video: HTMLVideoElement = this.videoPlayer.nativeElement;
        if (!this.lastUpdate) {
            this.lastUpdate = new Date().getTime();
            this.lastX = acceleration.x;
            this.lastY = acceleration.y;
            this.lastZ = acceleration.z;
        }
        const currentTime = new Date().getTime();
        if (currentTime - this.lastUpdate > 100) {
            const diffTime = currentTime - this.lastUpdate;
            this.lastUpdate = currentTime;
            const speed = Math.abs((acceleration.x + acceleration.y + acceleration.z - this.lastX - this.lastY - this.lastZ)
                / diffTime * 10000);
            console.log('speed', speed);
            if (speed > 800) {
                video.play();
            }
        }
    }
}
