import { FormGroup } from '@angular/forms';
import { verifyImageType, verifyImageSize } from './Validation';
import { ModalSkeleton } from './ModalSkeleton';
export class ModalFormSkeleton extends ModalSkeleton {

  public form!: FormGroup;   
  public imagePreview: any;  // Controla la imagen del ingrediente.
  
  constructor() {
    super();
    this.imagePreview = '';
  }

  closeModal() {
    this.opened = !this.opened;
    this.form.reset();
  }

  loadPreview(e: any) {
    this.form.get('picture')?.markAsTouched();

    if (e.target.files[0]) {

      if (this.validateImage(e.target.files[0])) {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = (event) => {
          this.form.patchValue({ picture: e.target.files[0] });
          this.imagePreview = event.target?.result;
        }
      } else {
        this.imagePreview = '';
      }

    } else {
      this.imagePreview = '';
      this.form.patchValue({ picture: '' });
    }
  }

  validateImage(image: any) {

    if (!verifyImageType(image.type)) {
      this.form.get('picture')?.setErrors({ 'format': true });
      return false;
    }

    if (!verifyImageSize(image.size)) {
      console.log('s');
      this.form.get('picture')?.setErrors({ 'size': true });
      return false;
    }

    this.form.get('picture')?.setErrors(null);
    return true;
  }
}