import { TestBed } from '@angular/core/testing';
import {HttpClientModule} from "@angular/common/http";

import { FinancialProductsService } from '../../app/services/financial-products.service';
import {Product} from "../../app/interfaces";

describe('FinancialProductsService', () => {
  let service: FinancialProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(FinancialProductsService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  test('Validar retorno de información productos', (done) => {
    service.getFinancialProducts().subscribe({next: (v) => {
      const firstProduct = v[0];
      expect(firstProduct).toBeDefined();
      expect(firstProduct.id).toBeDefined();
      expect(firstProduct.name).toBeDefined();
      expect(firstProduct.description).toBeDefined();
      expect(firstProduct.logo).toBeDefined();
      expect(firstProduct.date_release).toBeDefined();
      expect(firstProduct.date_revision).toBeDefined();
      done();
    }})
  });

});
