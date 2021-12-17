import { HttpClient } from '@angular/common/http';
import { API_URL } from '@env/environment';
import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoverageService {

  @Output() updateEmitter: EventEmitter<any> = new EventEmitter();

  private loadedImages: Array<any>;

  constructor(private http: HttpClient) {
    this.loadedImages = [];
  }

  // Obtiene todas las coverturas
  getAll() {
    return this.http.get(`${API_URL}/coverages/`).toPromise();
  }

  // Obtiene una covertura por su id
  getById(id: number) {
    return this.http.get(`${API_URL}/coverages/${id}`).toPromise();
  }

  // Obtiene una covertura por su nombre
  getByName(name: string) {
    return this.http.get(`${API_URL}/coverages/by_name/${name}`).toPromise();
  }

  // Inserta una covertura
  create(coverage: FormData) {
    return this.http.post(`${API_URL}/coverages/`, coverage).toPromise();
  }

  // Actualiza una covertura
  update(coverage: FormData, id: number) {
    return this.http.put(`${API_URL}/coverages/${id}`, coverage).toPromise();
  }

  // Elimina una covertura
  delete(id: number) {
    return this.http.delete(`${API_URL}/coverages/${id}`).toPromise();
  }

  // Obtiene de la API una imagen por id
  getImage(id: number) {
    return this.http.get(`${API_URL}/coverages/images/${id}`).toPromise();
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