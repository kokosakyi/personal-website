import { Component, OnInit } from '@angular/core';
import { DownloadService } from '../services/download.service';
import * as FileSaver from 'file-saver'; 

@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.css']
})
export class PublicationsComponent implements OnInit {

  constructor(
    private downloadService: DownloadService
  ) { }

  ngOnInit() {
  }

  downloadReport() {
    this.downloadService.downloadUndergradReport().subscribe(data =>{
      FileSaver.saveAs(data, 'Undergrad Report.zip');
    });
  }



}
