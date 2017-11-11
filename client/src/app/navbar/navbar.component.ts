import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToHome() {
    this.router.navigate(['/home']);
  }

  goToAbout() {
    this.router.navigate(['/resume']);
  }

  goToPublications() {
    this.router.navigate(['/publications']);
  }

  goToDesignTools() {
    this.router.navigate(['/design-tools']);
  }

  goToTutorials() {
    this.router.navigate(['/tutorials']);
  }

  goToContact() {
    this.router.navigate(['/contact']);
  }

}
