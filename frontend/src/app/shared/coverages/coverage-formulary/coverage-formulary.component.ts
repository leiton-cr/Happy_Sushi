import { CoverageService } from '@core/services/Coverage.service';
import { ModalFormSkeleton } from '@core/utils/ModalFormSkeleton';
import { ToastDanger, ToastSucess } from '@core/utils/Alerts';

import { Ingredient } from '@core/models/Ingredient';

import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-coverage-formulary',
  templateUrl: './coverage-formulary.component.html',
  styleUrls: ['./coverage-formulary.component.scss'],
})

export class CoverageFormularyComponent extends ModalFormSkeleton implements OnInit {

  // Variable de cierre de formulario
  @Input() opened!: boolean;

  // Comunica el cierre al padre
  @Output() closing: EventEmitter<any> = new EventEmitter();

  // Variable de accion de modal (insert/edit)
  public action: string;

  // Datos previos a modificación
  private oldData!: Ingredient | undefined;

  @Input() modifyId!: number | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private service: CoverageService
  ) {
    super();
    this.action = 'insert';
    this.buildForm();
  }

  ngOnInit(): void {
    if(this.modifyId !== 0){
      this.loadEditor();
    }
  }

  async prepareRegister() {
    if (this.form.invalid)
      return this.form.markAllAsTouched();

    if (!(await this.validateName()))
      return this.form.get('name')?.setErrors({ repeated: true });

    try {

      const ingredient: FormData = this.getIngredient();
      const res = await this.service.create(ingredient);
      this.emmitInsert();
      this.closeModal();

      ToastSucess('Se creó el registro');
    } catch (error) {
      ToastDanger('Surgió un error al crear el registro');
    }
  }

  async prepareEdit() {
    if (this.form.invalid) 
      return this.form.markAllAsTouched();

    if (this.form.get('name')?.value !== this.oldData?.name && !(await this.validateName())) 
      return this.form.get('name')?.setErrors({ repeated: true });
    
    try {
      const ingredient: FormData = this.getIngredient();
      const res = await this.service.update(ingredient, this.oldData?.id || 0);
      this.emmitUpdate();

      this.closeModal();

      ToastSucess('Se modificó el registro');
    } catch (error) {
      ToastDanger('Surgió un error al modificar el registro');
    }
  }

  // Metodo de verificacion de nombre no repetido.
  async validateName() {
    try {
      await this.service.getByName(this.form.get('name')?.value);
    } catch (error) {
      return true;
    }
    return false;
  }

  // Obtiene los datos del formulario para su envio.
  getIngredient() {
    const formData = new FormData();
    formData.append('name', this.form.get('name')?.value);
    formData.append('picture', this.form.get('picture')?.value);
    return formData;
  }

  async loadEditor() {
    if (this.modifyId) {
      try {
        const res: any = await this.service.getById(this.modifyId); // Cargar los datos al formulario

        this.oldData = res.item;
        this.imagePreview = this.getImage(this.oldData!.id);
        this.form.patchValue({ name: this.oldData!.name, picture: this.imagePreview })
        this.action = 'edit'; // Cambiar mensajes de insert a edit
        
      } catch (error) {
        ToastDanger('No se pudieron cargar los datos')
      }
    }
  }

  // Metodo para construir el formulario con validaciones
  buildForm() {
    this.form = this.formBuilder.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(25),
          Validators.pattern('^[a-zA-Z ]+$'),
        ],
      ],
      picture: ['', [Validators.required]],
    });
  }

  getImage(id: number | undefined) {
    if (id) {
      this.service.setLoadedImage(id);
      return this.service.getLoadedImage(id);
    }
  }

  // Emite un nuevo insert para actualizacion de tabla
  emmitInsert() {
    this.service.updateEmitter.emit({ inserted: this.form.get('name')?.value });
  }

  // Emite un nuevo update para actualizacion de tabla
  emmitUpdate() {
    this.service.updateEmitter.emit({ updated: this.oldData?.id });
  }

  closeModal() {
    super.closeModal();
    this.action = 'insert';
    this.imagePreview = '';
    this.oldData = undefined;
    this.closing.emit(true);
  }

}