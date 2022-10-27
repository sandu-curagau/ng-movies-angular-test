import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FilterWithOptionsEventTypes } from 'src/app/enums/event-types.enum';
import { KeyLabelObject } from 'src/app/models/generic.model';
import { FilterWithOptionsEvent } from 'src/app/models/output-events.model';

@Component({
  selector: 'app-filter-with-options',
  templateUrl: './filter-with-options.component.html',
  styleUrls: ['./filter-with-options.component.scss']
})
export class FilterWithOptionsComponent implements OnInit {

  @Output() filterEventEmitter = new EventEmitter<FilterWithOptionsEvent>();
  @Input() supportedFilterOptions: KeyLabelObject[] = [];
  selectedFilterOption: KeyLabelObject;
  filterText: string;

  constructor() { }

  ngOnInit(): void {
  }

  search(): void {
    this.filterEventEmitter.emit({
      eventType: FilterWithOptionsEventTypes.Search,
      data: {option: this.selectedFilterOption, text: this.filterText}
    });
  }

}
