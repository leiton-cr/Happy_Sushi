import { ToastDanger, ToastSucess } from '@core/utils/Alerts';
import { AlertPromiseDanger } from '@core/utils/Alerts';
import { Ingredient } from '@core/models/Ingredient';
import { IngredientService } from '@core/services/Ingredient.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'edit-ingredient-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})

export class CardComponent implements OnInit {
  @Input() item!: Ingredient;
  @Input() editCard!: Boolean;

  @Output() editing: EventEmitter<any> = new EventEmitter();

  constructor(private service: IngredientService) { }

  ngOnInit(): void { }

  // Obtiene una imagen del service para mostrar
  getImage(id: number | undefined) {
    if (id) {
      this.service.setLoadedImage(id);
      return this.service.getLoadedImage(id);
    }
  }

  // Maneja la eliminacion de un ingrediente.
  onDelete(id: number | undefined) {
    if (!id) return ToastDanger('Surgió un error al eliminar');

    AlertPromiseDanger('Atención', 'Seguro desea eliminar, esta accion es irreversible')
      .then(data => {
        if (data.isConfirmed) {
          try {
            this.service.delete(id);
            ToastSucess('Se eliminó exitosamente');
            this.emmitDelete(id)
          } catch (error) {
            ToastDanger('Surgió un error al eliminar');
          }
        }
      }
    )
  }

  // Emite la eliminacion de un elemento para la actualizacion del listado.
  emmitDelete(id:Number){
    this.service.updateEmitter.emit({ deleted: id })
  }

  // Llama al modal de edición si el id es correcto.
  onEdit(id:Number | undefined){
    if (!id) return ToastDanger('Surgió un error al intentar editar');
    this.emmitEdit(id);
  }

  // Emite orden a elemento padre para indicar edicion de un elemento.
  emmitEdit(id:Number){
    this.service.updateEmitter.emit({ modified: id })
  }

}