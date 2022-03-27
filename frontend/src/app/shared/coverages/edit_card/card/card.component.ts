import { CoverageService } from '@core/services/Coverage.service';
import { Coverage } from '@core/models/Coverage';
import { ToastDanger, ToastSucess } from '@core/utils/Alerts';
import { AlertPromiseDanger } from '@core/utils/Alerts';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'edit-coverage-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})

export class CoverageCardComponent implements OnInit {
  @Input() item!: Coverage;
  @Input() editCard!: Boolean;

  @Output() editing: EventEmitter<any> = new EventEmitter();

  constructor(private service: CoverageService) { }

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

}