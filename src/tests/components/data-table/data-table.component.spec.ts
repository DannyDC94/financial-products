import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTableComponent } from '../../../app/components/data-table/data-table.component';
import { FormsModule } from "@angular/forms";
import {Product} from "../../../app/interfaces";

const mockProducts: Product = {
  id: "trg-111",
  name: "Tarjetas Visa",
  description: "Tarjetas para compras exterior",
  logo: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg",
  date_release: "2023-12-04T00:00:00.000+00:00",
  date_revision: "2024-12-04T00:00:00.000+00:00"
};

describe('DataTableComponent', () => {
  let component: DataTableComponent;
  let fixture: ComponentFixture<DataTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DataTableComponent],
      imports: [FormsModule]
    });
    fixture = TestBed.createComponent(DataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('Should create DataTableComponent', () => {
    expect(component).toBeTruthy();
  });

  test('Load data table', () => {
    component.tableData = [mockProducts];
    component.loadDataTable();
    expect(component.filteredData).toEqual([mockProducts]);
  });

  test('Apply filter empty in data table', () => {
    component.tableData = [mockProducts];
    component.filterText = '';
    component.applyFilter();
    expect(component.filteredData).toEqual([mockProducts])
  });

  test('Apply filter "Hola" in data table', () => {
    component.tableData = [mockProducts];
    component.filterText = 'Hola';
    component.applyFilter();
    expect(component.filteredData).toEqual([])
  });

  test('Apply filter "Tarjetas Visa" in data table', () => {
    component.tableData = [mockProducts];
    component.filterText = 'Tarjetas Visa';
    component.applyFilter();
    expect(component.filteredData).toEqual([mockProducts])
  });

  test(`Event btn action emit`, () => {
    const emitSpy = jest.spyOn(component.btnActions, 'next');
    component.btnAction('create', mockProducts);
    expect(emitSpy).toHaveBeenCalledWith({ action: 'create', data: mockProducts });
  });

});
