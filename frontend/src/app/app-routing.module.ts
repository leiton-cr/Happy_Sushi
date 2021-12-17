import { TableCoveragesComponent } from './shared/table-coverages/table-coverages.component';
import { TableIngredientsComponent } from './shared/table/table-ingredients.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '',  component: TableIngredientsComponent, pathMatch: 'full'},
  {path: 'coverages',  component: TableCoveragesComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
