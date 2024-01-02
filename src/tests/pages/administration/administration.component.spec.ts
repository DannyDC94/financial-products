import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule} from '@angular/common/http/testing'
import { AdministrationComponent } from '../../../app/pages/administration/administration.component';
import { FinancialProductsService } from '../../../app/services/financial-products.service';
import { NgxSkeletonLoaderModule } from "ngx-skeleton-loader";
import { ComponentsModule } from "../../../app/components/components.module";
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import {NgxSpinnerModule} from "ngx-spinner";
import {Observable, of, throwError} from "rxjs";
import {Product} from "../../../app/interfaces";

const SAVE_PRODUCT_ROUTE = '/save-product';
const EDIT_ACTION = 'edit';

const mockProducts = {
  id: "trg-111",
  name: "Tarjetas",
  description: "Tarjetas para compras exterior",
  logo: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg",
  date_release: "2023-12-04T00:00:00.000+00:00",
  date_revision: "2024-12-04T00:00:00.000+00:00"
};

const mockedFinancialProductsService: {
  getFinancialProducts: () => Observable<Product[]>,
  deleteFinancialProducts: () => Observable<any>
} = {
  getFinancialProducts: () => of([mockProducts]),
  deleteFinancialProducts: () => of('Product successfully removed')
}

const mockedColumns = [
  {field: 'logo', name: 'Logo', type: 'image', breakpoint: 'sm'},
  {field: 'name', name: 'Nombre del producto', breakpoint: ''},
  {field: 'description', name: 'Descripción', breakpoint: 'lg'},
  {field: 'date_release', name: 'Fecha de liberación', type: 'date', breakpoint: 'lg'},
  {field: 'date_revision', name: 'Fecha de reestructuración', type: 'date', breakpoint: 'md'},
  {field: 'isDropdownActive', name: '', type: 'actions', breakpoint: 'actions'}
]

describe('AdministrationComponent', () => {
  let component: AdministrationComponent;
  let fixture: ComponentFixture<AdministrationComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdministrationComponent],
      imports: [
        HttpClientTestingModule,
        NgxSkeletonLoaderModule,
        RouterTestingModule,
        ComponentsModule,
        NgxSpinnerModule
      ],
      providers: [{provide: FinancialProductsService, useValue: mockedFinancialProductsService}]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrationComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    jest.spyOn(router, 'navigate').mockImplementation(jest.fn());
    fixture.detectChanges();
  });

  it('Should create AdministrationComponent', () => {
    expect(component).toBeTruthy();
  });

  test('Load columns table', () => {
    component.loadColumnsTable();
    expect(component.tableOptions.columns).toEqual(mockedColumns);
  });

  test('Load data of products', () => {
    jest.spyOn(mockedFinancialProductsService, 'getFinancialProducts').mockReturnValue(of([mockProducts]));
    component.loadProducts();
    expect(mockedFinancialProductsService.getFinancialProducts).toHaveBeenCalled();
    expect(component.dataTable).toEqual([mockProducts]);
  });

  test('Load data of products error server', () => {
    jest.spyOn(mockedFinancialProductsService, 'getFinancialProducts').mockReturnValue(throwError([mockProducts]));
    component.loadProducts();
    expect(mockedFinancialProductsService.getFinancialProducts).toHaveBeenCalled();
    component.openModalMessage('Existen errores el eliminar el producto');
    expect(component.showModalMessage).toBeTruthy();
    expect(component.modalMessage).toEqual('Existen errores el eliminar el producto');
  });

  it('Should navigate to save product route for edit action', () => {
    const mockEvent = { action: 'edit', data: mockProducts };
    component.actionProduct(mockEvent);
    expect(router.navigate).toHaveBeenCalledWith([SAVE_PRODUCT_ROUTE], {
      queryParams: {
        type: 'edit',
        data: JSON.stringify(mockProducts)
      }
    });
  });

  it('Should open confirm modal for delete action', () => {
    const mockEvent = { action: 'delete', data: mockProducts };
    component.actionProduct(mockEvent);
    expect(component.idSelect).toEqual(mockProducts.id);
    expect(component.nombreSelect).toEqual(mockProducts.name);
    expect(component.confirmMessage).toEqual(`¿Estas seguro de eliminar el producto ${mockProducts.name}?`);
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('Should navigate to save product route create', () => {
    const mockEvent = { action: 'create' };
    component.actionProduct(mockEvent);
    expect(router.navigate).toHaveBeenCalledWith(['/save-product'], {
      queryParams: {
        type: 'create'
      }
    });
  });


  test('Delete product', () => {
    jest.spyOn(mockedFinancialProductsService, 'deleteFinancialProducts').mockReturnValue(of({text: 'Product successfully removed' }));
    component.deleteProduct('trg-111');
    expect(mockedFinancialProductsService.deleteFinancialProducts).toHaveBeenCalled();
  });

  test('Delete product no remove product', () => {
    jest.spyOn(mockedFinancialProductsService, 'deleteFinancialProducts').mockReturnValue(of({text: 'Error delete product' }));
    component.deleteProduct('trg-111');
    expect(mockedFinancialProductsService.deleteFinancialProducts).toHaveBeenCalled();
  });

  test('Delete product error server', () => {
    jest.spyOn(mockedFinancialProductsService, 'deleteFinancialProducts').mockReturnValue(throwError({text: 'Error delete product server' }));
    component.deleteProduct('trg-111');
    expect(mockedFinancialProductsService.deleteFinancialProducts).toHaveBeenCalled();
  });

  test('Click cancel button', () => {
    component.onCancel();
    expect(component.showConfirmModal).toBeFalsy();
    expect(component.showModalMessage).toBeFalsy();
  });

  test('Click confirm button', () => {
    component.onConfirm();
    expect(component.showConfirmModal).toBeFalsy();
    jest.spyOn(mockedFinancialProductsService, 'deleteFinancialProducts').mockReturnValue(of('Product successfully removed'));
    component.deleteProduct('trg-111');
    expect(mockedFinancialProductsService.deleteFinancialProducts).toHaveBeenCalled();
  });

  test('Click open modal', () => {
    component.openModalMessage('Producto guardado exitosamente');
    expect(component.showModalMessage).toBeTruthy();
    expect(component.modalMessage).toEqual('Producto guardado exitosamente');
  });

});
