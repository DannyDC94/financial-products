import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { Subscription } from "rxjs";

import { FinancialProductsService } from '../../services/financial-products.service';
import { Product } from "../../interfaces";

const SAVE_PRODUCT_ROUTE = '/save-product';
const EDIT_ACTION = 'edit';
const DELETE_ACTION = 'delete';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss']
})

export class AdministrationComponent implements OnInit, OnDestroy {

  constructor(
    private financialSvc: FinancialProductsService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {
  }

  imgHeader: string = 'assets/imgs/BP_logo.svg'
  tableOptions: any;
  dataTable: Product[] = [];
  showTable = false;
  showConfirmModal = false;
  idSelect: string = '';
  nombreSelect: string = '';
  confirmMessage = '';
  showModalMessage = false;
  modalMessage: string = '';
  skeletonTheme: object = {
    'border-radius': '5px',
    'height': '50px',
    'background-color': '#e5e5e5',
    'border': '1px solid white'
  };
  private subscriptions: Subscription[] = [];

  ngOnInit() {
    this.loadColumnsTable();
    this.loadProducts();
  }

  loadColumnsTable() {
    const columns = [
      {field: 'logo', name: 'Logo', type: 'image', breakpoint: 'sm'},
      {field: 'name', name: 'Nombre del producto', breakpoint: ''},
      {field: 'description', name: 'Descripción', breakpoint: 'lg'},
      {field: 'date_release', name: 'Fecha de liberación', type: 'date', breakpoint: 'lg'},
      {field: 'date_revision', name: 'Fecha de reestructuración', type: 'date', breakpoint: 'md'},
      {field: 'isDropdownActive', name: '', type: 'actions', breakpoint: 'actions'}
    ]
    this.tableOptions = {
      columns: columns,
    };
  }

  loadProducts() {
    this.showTable = false;
    this.subscriptions.push(
      this.financialSvc.getFinancialProducts().subscribe({
        next: (v: Product[]) => this.dataTable = v,
        error: () => this.openModalMessage('Existen errores al cargar productos'),
        complete: () => this.showTable = true
      })
    );
  }

  actionProduct(evt: any) {
    const { action, data } = evt;
    if (action === EDIT_ACTION) {
      this.router.navigate([SAVE_PRODUCT_ROUTE], {
        queryParams: {
          type: action,
          data: JSON.stringify(data)
        }
      });
    } else if (action === DELETE_ACTION) {
      this.idSelect = data.id;
      this.nombreSelect = data.name;
      this.openConfirmModal();
    } else {
      this.router.navigate([SAVE_PRODUCT_ROUTE], {
        queryParams: {
          type: action
        }
      });
    }
  }

  deleteProduct(id: string) {
    this.spinner.show();
    this.subscriptions.push(this.financialSvc.deleteFinancialProducts(id).subscribe({
      next: (v) => {
        if (v.text.indexOf('Product successfully removed') > -1) {
          this.spinner.hide()
          this.loadProducts();
        } else {
          this.openModalMessage('Existen errores el eliminar el producto');
        }
      },
      error: (e) => {
        this.openModalMessage('Existen errores el eliminar el producto');
        this.spinner.hide();
      },
      complete: () => this.spinner.hide()
    }));
  }
  openConfirmModal(): void {
    this.confirmMessage = `¿Estas seguro de eliminar el producto ${this.nombreSelect}?`
    this.showConfirmModal = true;
  }

  onConfirm(): void {
    this.showConfirmModal = false;
    this.deleteProduct(this.idSelect);
  }

  onCancel(): void {
    this.showConfirmModal = false;
    this.showModalMessage = false;
  }

  openModalMessage(message: string): void {
    this.showModalMessage = true;
    this.modalMessage = message;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }

}
