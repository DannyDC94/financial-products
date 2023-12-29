import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SaveProductRoutingModule } from './save-product-routing.module';
import { SaveProductComponent } from './save-product.component';
import {ComponentsModule} from "../../components/components.module";
import {ReactiveFormsModule} from "@angular/forms";
import {NgxSpinnerModule} from "ngx-spinner";

@NgModule({
  declarations: [
    SaveProductComponent
  ],
    imports: [
        CommonModule,
        SaveProductRoutingModule,
        ComponentsModule,
        ReactiveFormsModule,
        NgxSpinnerModule
    ]
})
export class SaveProductModule { }
