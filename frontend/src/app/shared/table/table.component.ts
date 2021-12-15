import { Ingredient } from '@core/models/Ingredient';
import { IngredientService } from '@core/services/Ingredient.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  public opened: boolean;
  public list: Array<Ingredient>;
  public modifyId: number | undefined;

  constructor(private service: IngredientService) {
    this.opened = false;
    this.list = [];
  }

  ngOnInit(): void {
    this.getList();
    this.subscribeEmmiter();
  }

  // Obtencion del listado de ingredientes.
  async getList() {
    const result: any = await this.service.getAll();
    this.list = result.list;
  }

  // Subscripcion a emisor de eventos de actualizacion.
  subscribeEmmiter() {
    this.service.updateEmitter.subscribe(async (data) => {

      // Ingreso de nuevo registro
      if (data.inserted) {
        const res: any = await this.service.getByName(data.inserted);
        this.list.unshift(res.item)
      }

      // Actualizacion de registro
      if (data.updated) {
        this.updateInserted(data);
      }

      // Eliminacion de registro
      if (data.deleted) {
        this.list = this.list.filter((item: any) => item.id !== data.deleted);
      }

      //
      if (data.modified) {
        this.modifyId = data.modified;
        this.openModal(false);
      }
    })
  }

  // Recibe variable de apertura de modal.
  openModal(closing: boolean) {
      setTimeout(()=> this.opened = !closing,closing ? 400 : 0)
  }

  // Actualiza del listado el elemento actualizado.
  async updateInserted(data: any) {

    const index = this.list.findIndex((item: any) => item.id === data.updated);

    if (index >= 0) {
      const newItem: any = await this.service.getById(data.updated)

      // Recargamos el objeto y su imagen.
      this.list[index] = newItem.item;
      this.service.destroyLoadedImage(data.updated)
    }
  }
}