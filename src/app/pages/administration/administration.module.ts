import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrationRoutingModule } from './administration-routing.module';
import { AdministrationComponent } from './administration.component';
import { ComponentsModule } from '../../components/components.module';
import { FinancialProductsService } from '../../services/financial-products.service'
import {NgxSkeletonLoaderModule} from "ngx-skeleton-loader";
import {NgxSpinnerModule} from "ngx-spinner";


@NgModule({
  declarations: [
    AdministrationComponent
  ],
    imports: [
        CommonModule,
        AdministrationRoutingModule,
        ComponentsModule,
        NgxSkeletonLoaderModule,
        NgxSpinnerModule
    ],
  providers: [FinancialProductsService]
})
export class AdministrationModule { }
