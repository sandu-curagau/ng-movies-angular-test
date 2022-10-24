import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule} from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects';

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
    EffectsModule.forFeature([
      SearchEffects
    ]),
    StoreModule.forFeature(fromSearch.searchFeatureKey, fromSearch.reducer)
  ]
})
export class SearchModule { }
