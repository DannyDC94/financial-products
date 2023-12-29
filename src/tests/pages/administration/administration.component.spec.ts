import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule} from '@angular/common/http/testing'
import { AdministrationComponent } from '../../../app/pages/administration/administration.component';
import { FinancialProductsService } from '../../../app/services/financial-products.service';
import { environment } from '../../../environment/environment';
import { NgxSkeletonLoaderModule } from "ngx-skeleton-loader";
import { ComponentsModule } from "../../../app/components/components.module";
import {NgxSpinnerModule} from "ngx-spinner";

describe('AdministrationComponent', () => {
  let component: AdministrationComponent;
  let fixture: ComponentFixture<AdministrationComponent>;
  let compile:  HTMLElement;
  let service: FinancialProductsService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdministrationComponent],
      imports: [
        HttpClientTestingModule,
        NgxSkeletonLoaderModule,
        ComponentsModule,
        NgxSpinnerModule
      ],
      providers: [FinancialProductsService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrationComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(FinancialProductsService);
    httpMock = TestBed.inject(HttpTestingController)

    fixture.detectChanges();
    compile = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  test('Debe hacer match con el snapshot', () => {
    expect(compile.innerHTML).toMatchSnapshot();
  });

  test('Cargar datos de productos', () => {
    const dummyProducts = [
      {
        id: "trg-111",
        name: "Tarjetas",
        description: "Tarjetas para compras exterior",
        logo: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg",
        date_release: "2023-12-04T00:00:00.000+00:00",
        date_revision: "2024-12-04T00:00:00.000+00:00"
      }
    ];
    const request = httpMock.expectOne(environment.apiUrl);
    expect(request.request.method).toBe('GET');
    request.flush(dummyProducts);
    fixture.detectChanges();
  })

  // test('Abrir modal confirm', () => {
  //   component.openConfirmModal();
  //   component.confirmMessage = 'tg-1';
  //   expect(component.confirmMessage).toEqual('¿Estas seguro de eliminar el producto tg-1?');
  // });
});
