import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { OmdbApiTitleIdResponse } from 'src/app/models/request-response.model';

@Component({
  selector: 'app-inspect-show',
  templateUrl: './inspect-show.component.html',
  styleUrls: ['./inspect-show.component.scss']
})
export class InspectShowComponent implements OnInit {

  showDetails: any;

  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig) { }

  ngOnInit(): void {
    this.showDetails = this.config.data;
    console.log(this.showDetails);

  }

  close(): void {
    this.ref.close();
  }

}
