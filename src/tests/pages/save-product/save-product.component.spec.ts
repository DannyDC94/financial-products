import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule} from '@angular/common/http/testing'
import { SaveProductComponent } from '../../../app/pages/save-product/save-product.component';
import { RouterTestingModule } from "@angular/router/testing";
import {ComponentsModule} from "../../../app/components/components.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgxSpinnerModule} from "ngx-spinner";

describe('SaveProductComponent', () => {
  let component: SaveProductComponent;
  let fixture: ComponentFixture<SaveProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SaveProductComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ComponentsModule,
        ReactiveFormsModule,
        NgxSpinnerModule
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  // test('Debe hacer match con el snapshot', () => {
  //   expect(component).toBeTruthy();
  // });

});
