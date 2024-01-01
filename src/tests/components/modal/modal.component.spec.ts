import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalComponent } from '../../../app/components/modal/modal.component';
import {HeaderComponent} from "../../../app/components/header/header.component";

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalComponent]
    });
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test(`Should have as type 'confirm'`, () => {
    expect(component.type).toEqual('confirm');
  });

  test(`Should have as type ''`, () => {
    expect(component.message).toEqual('');
  });

  test(`Event confirm emit`, () => {
    const emitSpy = jest.spyOn(component.confirm, 'emit');
    component.onConfirm();
    expect(emitSpy).toHaveBeenCalled();
  });

  test(`Event cancel emit`, () => {
    const emitSpy = jest.spyOn(component.cancel, 'emit');
    component.onCancel();
    expect(emitSpy).toHaveBeenCalled();
  });

});
