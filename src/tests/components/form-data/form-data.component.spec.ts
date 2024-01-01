import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import { FormDataComponent } from '../../../app/components/form-data/form-data.component';
import {Product} from "../../../app/interfaces";
import {ReactiveFormsModule} from "@angular/forms";

const mockProducts: Product = {
  id: "trg-111",
  name: "Tarjetas Visa",
  description: "Tarjetas para compras exterior",
  logo: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg",
  date_release: "2023-12-04T00:00:00.000+00:00",
  date_revision: "2024-12-04T00:00:00.000+00:00"
};

describe('FormDataComponent', () => {
  let component: FormDataComponent;
  let fixture: ComponentFixture<FormDataComponent>;

  // beforeEach(() => {
  //   TestBed.configureTestingModule({
  //     declarations: [FormDataComponent]
  //   });
  //   fixture = TestBed.createComponent(FormDataComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FormDataComponent],
      imports: [ReactiveFormsModule],
    });

    fixture = TestBed.createComponent(FormDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('Should create FormDataComponent', () => {
    expect(component).toBeTruthy();
  });

  test('Set max date', () => {
    component.setMaxDate();
    expect(component.maxDate).toBeDefined();
  });

  test('Init Form Data', () => {
    component.action = 'edit';
    component.data = mockProducts;
    component.initForm();
    expect(component.idSelect).toBe(mockProducts.id);
  });

  it('Return form control by name', () => {
    const expectedFormControl = component.form?.get('name');
    const result = component.getValueInput('name');
    expect(result).toBe(expectedFormControl);
  });

  it('Return null for non-existing form control', () => {
    const result = component.getValueInput('name');
    expect(result).toBeUndefined();
  });

});
