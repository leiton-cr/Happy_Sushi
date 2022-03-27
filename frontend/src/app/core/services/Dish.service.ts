import { API_URL } from '@env/environment';

import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractService } from './Abstract.service';

@Injectable({
  providedIn: 'root'
})
export class DishService extends AbstractService{

  @Output() updateEmitter: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient) {
    super();
  }

  // Obtiene todas las coverturas
  getAll() {
    return this.http.get(`${API_URL}/dishes/`).toPromise();
  }

  // Obtiene una covertura por su id
  getById(id: number) {
    return this.http.get(`${API_URL}/dishes/${id}`).toPromise();
  }

  // Obtiene una covertura por su nombre
  getByName(name: string) {
    return this.http.get(`${API_URL}/dishes/by_name/${name}`).toPromise();
  }

  // Inserta una covertura
  create(coverage: FormData) {
    return this.http.post(`${API_URL}/dishes/`, coverage).toPromise();
  }

  // Actualiza una covertura
  update(coverage: FormData, id: number) {
    return this.http.put(`${API_URL}/dishes/${id}`, coverage).toPromise();
  }

  // Elimina una covertura
  delete(id: number) {
    return this.http.delete(`${API_URL}/dishes/${id}`).toPromise();
  }

  // Obtiene de la API una imagen por id
  getImage(id: number) {
    return this.http.get(`${API_URL}/dishes/images/${id}`).toPromise();
  }

  // Obtiene los ingredientes de un platillo por id
  getIngredients(id: number) {
    return this.http.get(`${API_URL}/dishes/list_ingredients/${id}`).toPromise();
  }

  // Asigna a las imagenes precargadas una nueva imagen
  setLoadedImage(id: number) {
    if (!this.loadedImages[id]) {
      this.loadedImages[id] = ' ';

      this.getImage(id).then((res: any) => {
        this.loadedImages[id] = res.item;
    
      }).catch(() => {
        this.retryLoad(id);
      });
    }
  }
}