import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTableComponent } from '../../../app/components/data-table/data-table.component';
import { FormsModule } from "@angular/forms";

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

  test('should create', () => {
    expect(component).toBeTruthy();
  });
});
