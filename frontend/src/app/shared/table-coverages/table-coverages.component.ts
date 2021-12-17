import { Coverage } from '@core/models/Coverage';
import { CoverageService } from '@core/services/Coverage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-coverages',
  templateUrl: './table-coverages.component.html',
  styleUrls: ['./table-coverages.component.scss']
})
export class TableCoveragesComponent implements OnInit {

  public opened: boolean;
  public list: Array<Coverage>;
  public modifyId: number | undefined;

  constructor(private service: CoverageService) {
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
    
    // Si se cierra el modal se elimina el id de modificacion
    if(closing) this.modifyId = 0
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