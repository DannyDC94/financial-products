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

  test(`should have as type 'confirm'`, () => {
    const fixture = TestBed.createComponent(ModalComponent);
    const component = fixture.componentInstance;
    expect(component.type).toEqual('confirm');
  });

  test(`should have as type ''`, () => {
    const fixture = TestBed.createComponent(ModalComponent);
    const component = fixture.componentInstance;
    expect(component.message).toEqual('');
  });

});
