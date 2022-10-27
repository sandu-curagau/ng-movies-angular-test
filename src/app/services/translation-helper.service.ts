import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { KeyLabelObject } from '../models/generic.model';

@Injectable({
  providedIn: 'root'
})
export class TranslationHelperService {

  constructor(private translate: TranslateService) { }

  getTranslatedDropdownOptions(translationsPath: string): KeyLabelObject[] {
    const translationList: KeyLabelObject[] = [];
    const getTranslationsSub = this.translate.get(translationsPath).subscribe((res: any) => {
      for (const [key, value] of Object.entries(res)) {
        let dropdownObject: any = {};
        dropdownObject['value'] = key;
        dropdownObject['name'] = value;
        translationList.push(dropdownObject);
      }
    });
    getTranslationsSub.unsubscribe();
    return translationList;
  }
}
