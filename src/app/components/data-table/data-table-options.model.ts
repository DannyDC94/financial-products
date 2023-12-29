import { DataColumnModel } from './data-column/data-column.model';

export class DataTableOptionsModel {
  columns!: Array<DataColumnModel>;
  btnNew?: boolean;
}
