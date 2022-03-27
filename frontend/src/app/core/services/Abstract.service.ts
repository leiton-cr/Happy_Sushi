export class AbstractService {
  protected loadedImages: Array<any>;

  constructor() {
    this.loadedImages = [];
  }
 
  // En caso de fallar la carga inicial destruye el error y reintenta tras un tiempo corto.
  retryLoad(id: number) {
    setTimeout(() => {
      this.destroyLoadedImage(id);
    }, 2000);
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
