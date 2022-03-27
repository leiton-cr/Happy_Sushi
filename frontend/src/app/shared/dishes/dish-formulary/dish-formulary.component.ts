import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Dish } from '@core/models/Dish';
import { Ingredient } from '@core/models/Ingredient';
import { DishService } from '@core/services/Dish.service';
import { IngredientService } from '@core/services/Ingredient.service';
import { ToastSucess, ToastDanger } from '@core/utils/Alerts';
import { ModalFormSkeleton } from '@core/utils/ModalFormSkeleton';

@Component({
  selector: 'app-dish-formulary',
  templateUrl: './dish-formulary.component.html',
  styleUrls: ['./dish-formulary.component.scss']
})
export class DishFormularyComponent extends ModalFormSkeleton implements OnInit {

  // Variable de cierre de formulario
  @Input() opened!: boolean;

  // Comunica el cierre al padre
  @Output() closing: EventEmitter<any> = new EventEmitter();

  // Variable de accion de modal (insert/edit)
  public action: string;

  // Datos previos a modificación.
  private oldData!: Dish | undefined;

  // Listado de todos los ingredientes.
  public ingredients: Array<Ingredient>;

  public selectedIngredients: Array<Ingredient>;
  public filteredIngredients: Array<Ingredient>;

  @Input() modifyId!: number | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private service: DishService,
    private ingService: IngredientService
  ) {
    super();
    this.action = 'insert';
    this.ingredients = [];
    this.selectedIngredients = [];
    this.filteredIngredients = [];

    this.buildForm();
  }

  ngOnInit(): void {
    if(this.modifyId !== 0){
      this.loadEditor();
    }

    this.loadIngredients();

  }

  async prepareRegister() {
    if (this.form.invalid)
      return this.form.markAllAsTouched();

    if (!(await this.validateName()))
      return this.form.get('name')?.setErrors({ repeated: true });

    try {

      const dish: FormData = this.getDish();
      const res = await this.service.create(dish);
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
      const dish: FormData = this.getDish();
      const res = await this.service.update(dish, this.oldData?.id || 0);
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
  getDish() {
    const formData = new FormData();
    formData.append('name', this.form.get('name')?.value);
    formData.append('type', this.form.get('type')?.value);
    formData.append('picture', this.form.get('picture')?.value);
    return formData;
  }

  async loadEditor() {
    if (this.modifyId) {
      try {
        const res: any = await this.service.getById(this.modifyId); // Cargar los datos al formulario

        this.oldData = res.item;
        this.imagePreview = this.getImage(this.oldData!.id);
        this.form.patchValue({ name: this.oldData!.name, price: this.oldData!.price, picture: this.imagePreview })
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
      ingredient: [''],
      price: ['', [Validators.required, Validators.min(0)]],
      picture: ['', [Validators.required]],
    });
  }

  getImage(id: number | undefined) {
    if (id) {
      this.service.setLoadedImage(id);
      return this.service.getLoadedImage(id);
    }
  }

  async loadIngredients(){
    const res:any = await this.ingService.getAll();
    this.ingredients = res.list;
    this.filterIngredients();
  }

  filterIngredients(){
    this.filteredIngredients = this.ingredients.filter((ingredient) => !this.selectedIngredients.includes(ingredient))
  }

  selectIngredient(){
    const name:string = this.form.get('ingredient')?.value;
   
    const selected:Ingredient | undefined = this.filteredIngredients.find((itmem:any) => itmem.name === name);
    if(selected){
      this.form.patchValue({ingredient: ''});
      this.selectedIngredients.push(selected);
      ToastSucess('Se agregó el ingrediente con exito')
      this.filterIngredients();
    }else{
      ToastDanger('Seleccione un ingrediente de la lista')
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