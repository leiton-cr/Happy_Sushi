import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientFormularyComponent } from './ingredient-formulary.component';

describe('IngredientFormularyComponent', () => {
  let component: IngredientFormularyComponent;
  let fixture: ComponentFixture<IngredientFormularyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngredientFormularyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredientFormularyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
