import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';

import { FilterWithOptionsComponent } from './filter-with-options/filter-with-options.component';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    FilterWithOptionsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    DropdownModule,
    ButtonModule
  ],
  exports: [
    FilterWithOptionsComponent
  ]
})
export class InputTypeComponentsModule { }
