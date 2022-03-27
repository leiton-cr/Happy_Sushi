import { TableCoveragesComponent } from './shared/table-coverages/table-coverages.component';

import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableIngredientsComponent } from './shared/table-ingredients/table-ingredients.component';
import { IngredientCardComponent } from './shared/ingredients/edit_card/card/card.component';
import { IngredientTypePipe } from './core/pipes/ingredient-type.pipe';
import { IngredientFormularyComponent } from './shared/ingredients/ingredient-formulary/ingredient-formulary.component';
import { MissingIngredientDirective } from './core/directives/missing-ingredient.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { CoverageCardComponent } from '@shared/coverages/edit_card/card/card.component';
import { CoverageFormularyComponent } from '@shared/coverages/coverage-formulary/coverage-formulary.component';
import { TableDishesComponent } from './shared/table-dishes/table-dishes.component';
import { DishCardComponent } from '@shared/dishes/edit_card/card.component';
import { DishFormularyComponent } from './shared/dishes/dish-formulary/dish-formulary.component';


@NgModule({
  declarations: [
    AppComponent,
    TableIngredientsComponent,
    TableCoveragesComponent,
    TableDishesComponent,

    IngredientCardComponent,
    CoverageCardComponent,
    DishCardComponent,

    IngredientTypePipe,
    IngredientFormularyComponent,
    CoverageFormularyComponent,
    MissingIngredientDirective,
    DishFormularyComponent,
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
