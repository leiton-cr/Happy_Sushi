import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ingredientType'
})
export class IngredientTypePipe implements PipeTransform {

  transform(type:String): string {
    
    switch (type.toLowerCase()) {
      case 'both':
        return 'Ambos';
      case 'roll':
        return 'Rollo';        
      case 'dish':
        return 'Platillo';
      default:
        return 'N/A';
    }
    
  }

}
