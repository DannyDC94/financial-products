import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { SaveProductComponent } from '../../../app/pages/save-product/save-product.component';
import { RouterTestingModule } from "@angular/router/testing";
import { ComponentsModule } from "../../../app/components/components.module";
import {ReactiveFormsModule } from "@angular/forms";
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";
import { Observable, of } from "rxjs";
import { Product } from "../../../app/interfaces";
import { FinancialProductsService } from "../../../app/services/financial-products.service";
import {  Router } from '@angular/router';
import { FormBuilder } from "@angular/forms";
// import {} from '../../../assets/mocks'

const mockProducts: Product = {
  id: "trg-111",
  name: "Tarjetas Visa",
  description: "Tarjetas para compras exterior",
  logo: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg",
  date_release: "2023-12-04T00:00:00.000+00:00",
  date_revision: "2024-12-04T00:00:00.000+00:00"
};

const mockedFinancialProductsService: {
  saveFinancialProducts: () => Observable<Product>,
  editFinancialProducts: () => Observable<Product>,
  existFinancialProducts: () => Observable<boolean>
} = {
  saveFinancialProducts: () => of(mockProducts),
  editFinancialProducts: () => of(mockProducts),
  existFinancialProducts: () => of(false),
}

describe('SaveProductComponent', () => {
  let component: SaveProductComponent;
  let fixture: ComponentFixture<SaveProductComponent>;
  let route: any;
  let router: Router;
  let service: FinancialProductsService;
  let componentNR: SaveProductComponent;
  let spinnerSvc: NgxSpinnerService;
  let formB: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SaveProductComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ComponentsModule,
        ReactiveFormsModule,
        NgxSpinnerModule
      ],
      providers: [{provide: FinancialProductsService, useValue: mockedFinancialProductsService}]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveProductComponent);
    component = fixture.componentInstance;
    route = {queryParams: of({ type: 'edit', data: JSON.stringify(mockProducts)})};
    componentNR = new SaveProductComponent(service, router, route, spinnerSvc, formB);
    fixture.detectChanges();
  });

  test('Should create SaveProductComponent', () => {
    expect(component).toBeTruthy();
  });

  test('Load params', () => {
    component.loadParams();
    expect(component.redirectAdmin).toBe(false);
    expect(component.action).toBe('create');
    expect(component.dataForm).toBeUndefined();
  });

  test('Load props queryParams', () => {
    componentNR.loadParams();
    expect(componentNR.redirectAdmin).toBe(false);
    expect(componentNR.action).toBe('edit');
    component.dataForm = mockProducts;
    expect(component.dataForm.name).toEqual('Tarjetas Visa');
  });

  test('Execute save product', () => {
    component.saveProduct({ action: 'create' });
    component.formProduct?.patchValue({...mockProducts});
    expect(component.formProduct?.valid).toBeTruthy();
    jest.spyOn(mockedFinancialProductsService, 'existFinancialProducts').mockReturnValue(of(false));
    jest.spyOn(mockedFinancialProductsService, 'saveFinancialProducts').mockReturnValue(of(mockProducts));
    component.saveNewProduct();
    expect(mockedFinancialProductsService.existFinancialProducts).toHaveBeenCalled();
    expect(mockedFinancialProductsService.saveFinancialProducts).toHaveBeenCalled();
    expect(component.showModal).toBeTruthy();
    expect(component.modalMessage).toEqual('El producto se ha guardado con éxito.');
    expect(component.redirectAdmin).toBeTruthy();
  });

  test('Execute edit product', () => {
    component.saveProduct({ action: 'edit' });
    component.formProduct?.patchValue({...mockProducts});
    expect(component.formProduct?.valid).toBeTruthy();
    jest.spyOn(mockedFinancialProductsService, 'editFinancialProducts').mockReturnValue(of(mockProducts));
    component.editProduct();
    expect(mockedFinancialProductsService.editFinancialProducts).toHaveBeenCalled();
    expect(component.showModal).toBeTruthy();
    expect(component.modalMessage).toEqual('El producto se ha actualizado con éxito.');
    expect(component.redirectAdmin).toBeTruthy();
  });

  test('Show message error', () => {
    component.messageError();
    component.openModal('Producto guardado con exito');
    expect(component.showModal).toBe(true);
    expect(component.modalMessage).toBe('Producto guardado con exito');
    expect(component.redirectAdmin).toBe(false);
  });

  test('Click confirm', () => {
    component.onConfirm();
    expect(component.showModal).toBe(false);
  });

});
