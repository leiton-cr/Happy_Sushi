import { TableCoveragesComponent } from './shared/table-coverages/table-coverages.component';
import { TableIngredientsComponent } from './shared/table-ingredients/table-ingredients.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableDishesComponent } from '@shared/table-dishes/table-dishes.component';

const routes: Routes = [
  {path: '',  component: TableIngredientsComponent, pathMatch: 'full'},
  {path: 'coverages',  component: TableCoveragesComponent, pathMatch: 'full'},
  {path: 'dishes',  component: TableDishesComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
