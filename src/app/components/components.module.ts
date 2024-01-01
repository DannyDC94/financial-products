import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { DataTableComponent } from './data-table/data-table.component'
import {SharedModule} from "../shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ModalComponent } from './modal/modal.component';
import { FormDataComponent } from './form-data/form-data.component';
@NgModule({
    exports: [HeaderComponent, DataTableComponent, ModalComponent, FormDataComponent],
  declarations: [HeaderComponent, DataTableComponent, ModalComponent, FormDataComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgOptimizedImage
  ]
})
export class ComponentsModule { }
