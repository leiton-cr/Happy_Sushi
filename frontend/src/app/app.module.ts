import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableComponent } from './shared/table/table.component';
import { CardComponent } from './shared/ingredients/edit_card/card/card.component';
import { IngredientTypePipe } from './core/pipes/ingredient-type.pipe';
import { IngredientFormularyComponent } from './shared/ingredients/ingredient-formulary/ingredient-formulary.component';
import { MissingIngredientDirective } from './core/directives/missing-ingredient.directive';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    CardComponent,
    IngredientTypePipe,
    IngredientFormularyComponent,
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
