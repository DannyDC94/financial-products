import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { DataTableOptionsModel } from './data-table-options.model';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {
  @Input() set tableData(dataRows: any[]) {
    this._tableData = dataRows;
  };
  @Input() tableOptions!: DataTableOptionsModel;
  @Output() btnActions = new EventEmitter<any>();

  private _tableData: any[] = [];
  public filteredData: any[] = [];

  filterText = '';
  cantidadOptions = [5, 10, 20];
  selectedValue: number = 5;

  ngOnInit() {
    if (this._tableData.length > 0) {
      this.filteredData = this._tableData.map(ret => {
        ret.isDropdownActive = false
        return ret;
      });
      this.applyFilter();
    }
  }

  applyFilter(): void {
    this.filteredData = this._tableData.filter(row => {
      return Object.values(row).some(value => {
        if (typeof value === 'string') {
          return value.toLowerCase().includes(this.filterText.toLowerCase());
        }
        return false;
      });
    });
    let selectItem = parseInt(this.selectedValue.toString());
    const block = this.filteredData.slice(0, selectItem);
    this.filteredData = block;
  }

  btnAction(action: string = 'create', data: any) {
    this.btnActions.next({ action, data });
  }
}
