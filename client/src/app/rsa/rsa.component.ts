import { Component, OnInit } from '@angular/core';
import { Video } from '../models/video';

@Component({
  selector: 'app-rsa',
  templateUrl: './rsa.component.html',
  styleUrls: ['./rsa.component.css']
})
export class RsaComponent implements OnInit {

  player: YT.Player;
  //private id: string = '-u1wT6yILG4';
  private videos: Video[] = [
    new Video('KhChec10vC4', '2D Frame Analysis with Robot Structural Analyis')
  ];

  constructor() { }

  ngOnInit() {
  }

  savePlayer(player) {
    this.player = player;
    console.log('player instance', player)
  }

  onStateChange(event) {
    console.log('player state', event.data);
  }

}
