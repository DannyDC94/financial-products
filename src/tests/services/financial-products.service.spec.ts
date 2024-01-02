import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FinancialProductsService } from '../../app/services/financial-products.service';
import { environment } from '../../environment/environment';

describe('FinancialProductsService', () => {
  let service: FinancialProductsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FinancialProductsService]
    });

    service = TestBed.inject(FinancialProductsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get financial products', () => {
    const mockProducts = [{/* mock product data */}];
    service.getFinancialProducts().subscribe(products => {
      expect(products).toEqual(mockProducts);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);
  });

  it('should save financial products', () => {
    const mockProduct = {/* mock product data */};
    service.saveFinancialProducts(mockProduct).subscribe(product => {
      expect(product).toEqual(mockProduct);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}`);
    expect(req.request.method).toBe('POST');
    req.flush(mockProduct);
  });

  it('should edit financial products', () => {
    const mockProduct = {/* mock product data */};
    service.editFinancialProducts(mockProduct).subscribe(product => {
      expect(product).toEqual(mockProduct);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}`);
    expect(req.request.method).toBe('PUT');
    req.flush(mockProduct);
  });

  it('should delete financial products', () => {
    const mockProductId = '123';
    service.deleteFinancialProducts(mockProductId).subscribe(response => {
      // Assuming your delete endpoint returns some response
      expect(response).toBeDefined();
    });

    const req = httpMock.expectOne(`${environment.apiUrl}?id=${mockProductId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({/* mock response data */});
  });

  it('should check if financial products exist', () => {
    const mockProductId = '123';
    service.existFinancialProducts(mockProductId).subscribe(result => {
      expect(result).toBe(true); // Assuming your exist endpoint returns a boolean
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/verification?id=${mockProductId}`);
    expect(req.request.method).toBe('GET');
    req.flush(true); // Assuming the endpoint returns true for existence
  });
});
