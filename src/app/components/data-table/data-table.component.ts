import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { DataTableOptionsModel } from './data-table-options.model';
import { Product } from "../../interfaces";

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {
  @Input() set tableData(dataRows: Product[]) {
    this._tableData = dataRows;
  };
  @Input() tableOptions!: DataTableOptionsModel;
  @Output() btnActions = new EventEmitter<any>();

  private _tableData: Product[] = [];
  public filteredData: Product[] = [];

  filterText = '';
  cantidadOptions = [5, 10, 20];
  selectedValue: number = 5;

  ngOnInit() {
    this.loadDataTable();
  }

  loadDataTable() {
    if (this._tableData.length > 0) {
      this.filteredData = this._tableData.map(ret => {
        ret.isDropdownActive = false
        return ret;
      });
      this.applyFilter();
    }
  }

  applyFilter(): void {
    const filteredRows = this.filterRows();
    this.limitRows(filteredRows);
  }

  filterRows(): Product[] {
    return this._tableData.filter(row => {
      return Object.values(row).some(value => {
        if (typeof value === 'string') {
          return value.toLowerCase().includes(this.filterText.toLowerCase());
        }
        return false;
      });
    });
  }

  limitRows(rows: Product[]): void {
    const selectItem = parseInt(this.selectedValue.toString(), 10);
    this.filteredData = rows.slice(0, selectItem);
  }

  btnAction(action: string = 'create', data: any) {
    this.btnActions.next({ action, data });
  }
}
