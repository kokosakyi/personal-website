import { Component, OnInit } from '@angular/core';
import { DownloadService } from '../services/download.service';
import * as FileSaver from 'file-saver'; 


@Component({
  selector: 'app-pfa-pro',
  templateUrl: './pfa-pro.component.html',
  styleUrls: ['./pfa-pro.component.css']
})
export class PfaProComponent implements OnInit {

  constructor(
    private downloadService: DownloadService
  ) { }

  ngOnInit() {
  }

  downloadPFA() {
    this.downloadService.downloadPFA().subscribe(data =>{
      FileSaver.saveAs(data, 'PFA-Pro Setup.zip');
    });
  }

  downloadReport() {
    this.downloadService.downloadUndergradReport().subscribe(data =>{
      FileSaver.saveAs(data, 'Undergrad Report.zip');
    });
  }

}
