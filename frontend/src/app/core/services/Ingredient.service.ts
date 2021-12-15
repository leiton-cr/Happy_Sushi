import { API_URL } from '@env/environment';

import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class IngredientService {

  @Output() updateEmitter: EventEmitter<any> = new EventEmitter();

  private loadedImages: Array<any>;

  constructor(private http: HttpClient) {
    this.loadedImages = [];
  }

  // Obtiene todos los ingredientes
  getAll() {
    return this.http.get(`${API_URL}/ingredients/`).toPromise();
  }

  // Obtiene los ingredientes por su tipo
  getByType(type: string) {
    return this.http.get(`${API_URL}/ingredients/by_type/${type}`).toPromise();
  }

  // Obtiene un ingrediente por su id
  getById(id: number) {
    return this.http.get(`${API_URL}/ingredients/${id}`).toPromise();
  }

  // Obtiene un ingrediente por su nombre
  getByName(name: string) {
    return this.http.get(`${API_URL}/ingredients/by_name/${name}`).toPromise();
  }

  // Inserta un ingrediente
  create(ingredient: FormData) {
    return this.http.post(`${API_URL}/ingredients/`, ingredient).toPromise();
  }

  // Actualiza un ingrediente
  update(ingredient: FormData, id: number) {
    return this.http.put(`${API_URL}/ingredients/${id}`, ingredient).toPromise();
  }

  // Elimina un ingrediente
  delete(id: number) {
    return this.http.delete(`${API_URL}/ingredients/${id}`).toPromise();
  }

  // Obtiene de la API una imagen por id
  getImage(id: number) {
    return this.http.get(`${API_URL}/ingredients/images/${id}`).toPromise();
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

  // En caso de fallar la carga inicial reintenta tras un tiempo corto.
  retryLoad(id: number) {
    
    setTimeout(() => {
      this.destroyLoadedImage(id);
      
    }, 2000)
  }

  // Este método destruye una imagen precargada.
  destroyLoadedImage(id: number) {
    if (this.loadedImages[id]) {
      this.loadedImages[id] = '';
    }
  }

  // Este método obtiene una imagen precargada por su id.
  getLoadedImage(id: number) {
    return this.loadedImages[id];
  }

}