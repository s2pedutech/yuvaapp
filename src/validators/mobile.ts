import {FormControl} from '@angular/forms';

export class MobileValidator {

    static isValid(control: FormControl){

      var re = /^[6-9]\d{9}$/.test(control.value);

      if (re){
        return null;
      }

      return {"invalidMobile": true};
    }

}
