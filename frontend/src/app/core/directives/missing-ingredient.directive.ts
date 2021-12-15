import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appMissingIngredient]'
})
export class MissingIngredientDirective {

  constructor(private elementRef:ElementRef) {}
  @HostListener('error')
  loadDefaultImage(){
    const element = this.elementRef.nativeElement;
    element.src = '../../../assets/images/ingredient.svg'
  }

}
