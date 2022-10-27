import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';

import { FilterWithOptionsComponent } from './filter-with-options/filter-with-options.component';


@NgModule({
  declarations: [
    FilterWithOptionsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    DropdownModule,
    ButtonModule
  ],
  exports: [
    FilterWithOptionsComponent
  ]
})
export class InputTypeComponentsModule { }
