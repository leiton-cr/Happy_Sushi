export class ModalSkeleton{

  public opened:boolean;    // Controla el desaparecer del modal.

  constructor() {
    this.opened = false;
  }

  closeModal(){
    this.opened = !this.opened;
  }
}