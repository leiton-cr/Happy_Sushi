import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Dish } from '@core/models/Dish';
import { DishService } from '@core/services/Dish.service';
import { AlertPromiseDanger, ToastDanger, ToastSucess } from '@core/utils/Alerts';

@Component({
  selector: 'edit-dish-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class DishCardComponent implements OnInit {
  @Input() item!: Dish;
  @Input() editCard!: Boolean;

  @Output() editing: EventEmitter<any> = new EventEmitter();
  public ingredients: Array<any>;

  constructor(private service: DishService) { 
    this.ingredients = [];
  }

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

  // Emite orden a padre para indicar edicion de un elemento.
  emmitEdit(id:Number){
    this.service.updateEmitter.emit({ modified: id })
  }

  getDetails(){
    this.getIngredients();
  }

  async getIngredients(){
    console.log(123);
    if(this.ingredients.length === 0 && this.item.id){
      const res:any = await this.service.getIngredients(this.item.id);
      this.ingredients = res.list;
    }
  }

}