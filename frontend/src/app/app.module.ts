import { TableCoveragesComponent } from './shared/table-coverages/table-coverages.component';
import { CoverageFormularyComponent } from './shared/coverage/coverage-formulary/coverage-formulary.component';
import { CoverageCardComponent } from './shared/coverage/edit_card/card/card.component';

import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableIngredientsComponent } from './shared/table/table-ingredients.component';
import { CardComponent } from './shared/ingredients/edit_card/card/card.component';
import { IngredientTypePipe } from './core/pipes/ingredient-type.pipe';
import { IngredientFormularyComponent } from './shared/ingredients/ingredient-formulary/ingredient-formulary.component';
import { MissingIngredientDirective } from './core/directives/missing-ingredient.directive';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    TableIngredientsComponent,
    TableCoveragesComponent,
    CardComponent,
    CoverageCardComponent,

    IngredientTypePipe,
    IngredientFormularyComponent,
    CoverageFormularyComponent,
    MissingIngredientDirective,

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
