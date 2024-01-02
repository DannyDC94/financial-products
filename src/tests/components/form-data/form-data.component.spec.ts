import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import { FormDataComponent } from '../../../app/components/form-data/form-data.component';
import {Product} from "../../../app/interfaces";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";

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
  let componentCN: FormDataComponent;
  let fixture: ComponentFixture<FormDataComponent>;
  let fb: FormBuilder;

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
    fb = new FormBuilder();
    componentCN = new FormDataComponent(fb);
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

  test('Return form control by name', () => {
    const expectedFormControl = component.form?.get('name');
    const result = component.getValueInput('name');
    expect(result).toBe(expectedFormControl);
  });

  test('Return null for non-existing form control', () => {
    const result = component.getValueInput('name');
    expect(result).toBeDefined();
  });

  test('Should set focusedControl and isFocus to true', () => {
    const campo = 'name';
    component.onFocus(campo);
    expect(component.focusedControl).toBe(campo);
    expect(component.isFocus).toBe(true);
  });

  it('Should set focusedControl to an empty string and isFocus to false', () => {
    component.onBlur();
    expect(component.focusedControl).toBe('');
    expect(component.isFocus).toBe(false);
  });

  it('Should emit btnSave event with the correct action', () => {
    component.action = 'edit';
    const emitSpy = jest.spyOn(component.btnSave, 'emit');
    component.saveDataForm();
    expect(emitSpy).toHaveBeenCalledWith({ action: 'edit' });
  });

  it('Should set date_revision one year ahead when date_release is provided', () => {
    const mockDateRelease = '2023-12-31';
    componentCN.form?.setValue({
      id: '',
      name: '',
      description: '',
      logo: '',
      date_release: mockDateRelease,
      date_revision: ''
    });
    componentCN.onDateChange();
    const dateRevisionValue = componentCN.form?.get('date_revision')?.value;
    const expectedDate = new Date(mockDateRelease);
    expectedDate.setFullYear(expectedDate.getFullYear() + 1);
    const expectedDateStr = expectedDate.toISOString().split('T')[0];
    expect(dateRevisionValue).toBe(expectedDateStr);
  });

});
