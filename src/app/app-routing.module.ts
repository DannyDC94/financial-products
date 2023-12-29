import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'administration', pathMatch: 'full'},
  { path: 'administration', loadChildren: () => import('./pages/administration/administration.module').then(m => m.AdministrationModule) },
  { path: 'save-product', loadChildren: () => import('./pages/save-product/save-product.module').then(m => m.SaveProductModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
