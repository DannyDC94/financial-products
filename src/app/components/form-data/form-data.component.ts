import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Utils } from "../../utils/utils";
import {Product} from "../../interfaces";

@Component({
  selector: 'app-form-data',
  templateUrl: './form-data.component.html',
  styleUrls: ['./form-data.component.scss']
})
export class FormDataComponent implements OnInit {

  @Input() form?: FormGroup;
  @Input() data?: Product;
  @Input() action: string = 'create';
  @Output() btnSave = new EventEmitter<any>();

  maxDate: string = '';
  idSelect: string = '';
  focusedControl: string = '';
  isFocus: boolean = false;

  constructor(private fb: FormBuilder) {
    if (this.fb) {
      this.form = this.fb.group({
        date_release: ['', Validators.required],
        date_revision: [''],
        id: [''],
        name: [''],
        description: [''],
        logo: ['']
      });
    }
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.idSelect = '';
    this.setMaxDate();
    if (this.action === 'edit' && this.data)
      this.loadDataForm(this.data);
  }

  setMaxDate() {
    const currentDate = Utils.getCurrencyDate();
    const yesterday = Utils.getCurrencyDate();
    yesterday.setDate(currentDate.getDate() - 1);
    this.maxDate = yesterday.toISOString().split('T')[0];
  }

  getValueInput(name: string) {
    return this.form?.get(name);
  }

  loadDataForm(data: Product) {
    this.idSelect = data.id;
    const date_release = new Date(data.date_release);
    const date_revision = new Date(data.date_revision);
    this.form?.patchValue({
      ...data,
      date_release: date_release.toISOString().substring(0, 10),
      date_revision: date_revision.toISOString().substring(0, 10)
    });
  }

  onFocus(campo: string): void {
    this.focusedControl = campo;
    this.isFocus = true;
  }

  onBlur(): void {
    this.focusedControl = '';
    this.isFocus = false;
  }

  showErrors(campo: string): boolean {
    const control = this.form?.get(campo);
    if (control && !this.isFocus) {
      return control.invalid && (control.touched || this.focusedControl === campo)
    }
    return false;
  }

  resetForm(): void {
    this.form?.reset();
    const date_release = new Date();
    const date_revision = new Date(date_release.getFullYear() + 1, date_release.getMonth(), date_release.getDate());
    this.form?.patchValue({
      id: this.action === 'edit' ? this.idSelect : '',
      date_release: Utils.formatDate(date_release),
      date_revision: Utils.formatDate(date_revision)
    });
  }

  saveDataForm() {
    this.btnSave.emit({ action: this.action })
  }

  onDateChange() {
    const fechaString = this.getValueInput('date_release')?.value;
    const fechaObjeto = new Date(fechaString);
    fechaObjeto.setFullYear(fechaObjeto.getFullYear() + 1);
    const nuevaFechaString = fechaObjeto.toISOString().split('T')[0];
    this.getValueInput('date_revision')?.setValue(nuevaFechaString) ;
  }

}
