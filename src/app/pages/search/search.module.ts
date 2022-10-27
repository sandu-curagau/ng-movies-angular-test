import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { StoreModule} from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects';

import { InputTextModule } from 'primeng/inputtext';
import { TabViewModule } from 'primeng/tabview';
import { FieldsetModule } from 'primeng/fieldset';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { ButtonModule } from 'primeng/button';

import { InputTypeComponentsModule } from 'src/app/components/input-type-components/input-type-components.module';
import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search.component';
import { SearchEffects } from './effects/search.effects';
import * as fromSearch from './reducers/search.reducer'


@NgModule({
  declarations: [
    SearchComponent
  ],
  imports: [
    CommonModule,
    SearchRoutingModule,
    FormsModule,
    InputTypeComponentsModule,
    InputTextModule,
    TabViewModule,
    TranslateModule,
    FieldsetModule,
    ButtonModule,
    ProgressSpinnerModule,
    EffectsModule.forFeature([
      SearchEffects
    ]),
    StoreModule.forFeature(fromSearch.searchFeatureKey, fromSearch.reducer),
    InfiniteScrollModule,
    DynamicDialogModule
  ],
  providers: [
    DialogService
  ]
})
export class SearchModule { }
