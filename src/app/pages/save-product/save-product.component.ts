import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { of, Subscription } from "rxjs";
import { concatMap } from 'rxjs/operators';

import { FinancialProductsService} from '../../services/financial-products.service';
import { Utils } from '../../utils/utils';
import {Product} from "../../interfaces";

@Component({
  selector: 'app-save-product',
  templateUrl: './save-product.component.html',
  styleUrls: ['./save-product.component.scss']
})

export class SaveProductComponent implements OnInit, OnDestroy {

  imgHeader: string = 'assets/imgs/BP_logo.svg'
  action: string = 'create';
  showModal: boolean = false;
  modalMessage = '';
  redirectAdmin: boolean = false;
  formProduct: FormGroup | undefined;
  dataForm?: Product;

  private subscriptions: Subscription[] = [];

  constructor(
      private financialSvc: FinancialProductsService,
      private router: Router,
      private route: ActivatedRoute,
      private spinner: NgxSpinnerService,
      private fb: FormBuilder
  ) {

      this.formProduct = this.fb.group({
          id: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
          name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
          description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
          logo: ['', [Validators.required]],
          date_release: [Utils.formatDate(Utils.getCurrencyDate()), Validators.required],
          date_revision: [Utils.formatDate(this.getDateEndDefault()), Validators.required]
      });
  }

  ngOnInit() {
    this.redirectAdmin = false;
    this.subscriptions.push(
        this.route.queryParams.subscribe(data => {
            this.action = data && data['type'] ? data['type'] : 'create';
            if (this.action === 'edit')
                this.dataForm = JSON.parse(data['data']);
        })
    );
  }
   saveProduct(evt: any) {
    if (this.formProduct && this.formProduct.valid) {
      if (evt.action === 'edit') {
        this.editProduct();
      } else {
        this.saveNewProduct();
      }
    }
  }

  editProduct() {
      this.spinner.show();
      this.subscriptions.push(
          this.financialSvc.editFinancialProducts(this.formProduct?.value).subscribe({
              next: (v) => {
                  if (v && v.id) {
                      const messagge = `El producto se ha actualizado con éxito.`;
                      this.openModal(messagge , true);
                  } else {
                      this.messageError();
                  }
              },
              error: (e) => {
                  this.messageError();
                  this.spinner.hide();
              },
              complete: () => this.spinner.hide()
          })
      );
  }

  saveNewProduct() {
      this.spinner.show();
      const id = this.formProduct?.get('id');
      this.subscriptions.push(
          this.financialSvc.existFinancialProducts(id?.value).pipe(
              concatMap(existProduct => {
                  if (!existProduct)
                      return this.financialSvc.saveFinancialProducts(this.formProduct?.value);
                  else
                      return of({ code: 'EXIST_PRODUCT' });
              })
          ).subscribe({
              next: (v) => {
                  if (v && v.id) {
                      const messagge = `El producto se ha guardado con éxito.`;
                      this.openModal(messagge , true);
                  } else if (v && v.code === 'EXIST_PRODUCT') {
                      const message = `El producto con ID: ${id?.value} ya existe.`;
                      this.openModal(message);
                  } else {
                      this.messageError();
                  }
              },
              error: (e) => {
                  this.messageError();
                  this.spinner.hide();
              },
              complete: () => this.spinner.hide()
          })
      );
  }

  messageError() {
    const message = 'Existen errores al guardar el producto.';
    this.openModal(message);
  }

  getDateEndDefault(): Date {
      const currentDate = Utils.getCurrencyDate();
      return new Date(currentDate.getFullYear() + 1, currentDate.getMonth(), currentDate.getDate());
  }

  openModal(message: string, redirect: boolean = false): void {
    this.showModal = true;
    this.modalMessage = message;
    this.redirectAdmin = redirect;
  }

  onConfirm(): void {
    this.showModal = false;
    if (this.redirectAdmin)
      this.router.navigate(['/administration']);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }
}
