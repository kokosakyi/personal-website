import { Component, OnInit, NgZone, HostListener } from '@angular/core';
import { Video } from '../models/video';

@Component({
  selector: 'app-lsdyna-tutorials',
  templateUrl: './lsdyna-tutorials.component.html',
  styleUrls: ['./lsdyna-tutorials.component.css']
})
export class LsdynaTutorialsComponent implements OnInit {

  width;
  height;
  isLargeScreen: boolean = false;

  player: YT.Player;
  //private id: string = '-u1wT6yILG4';
  private videos: Video[] = [
    new Video('-u1wT6yILG4','1.0 Introduction (LS-DYNA RC Column subjected to blast)'),
    new Video('r0hxd9EF08Y','2.0 Modelling the Reinforced Concrete Column'),
    new Video('Zbl8kMtot0Q','2.1 Section'),
    new Video('VQk889OnyIE','2.2 Grouping Parts')
];

  constructor(private ngZone: NgZone) {
    // window.onresize = (e) => {
    //   this.ngZone.run(() => {
    //     this.width = window.innerWidth;
    //     this.height = window.innerHeight;
       
    //   });
    // }
  }

  ngOnInit() {
 
  }



  savePlayer(player) {
    this.player = player;
    //console.log('player instance', player)
  }

  onStateChange(event) {
    //console.log('player state', event.data);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.width = event.target.innerWidth;
    if (this.width > 768) {
      this.isLargeScreen = true;
    }
    else {
      this.isLargeScreen = false;
    }
  }

}
