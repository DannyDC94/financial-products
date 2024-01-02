import { DataTableOptionsModel } from '../../../app/components/data-table/data-table-options.model';
import { DataColumnModel } from '../../../app/components/data-table/data-column/data-column.model';

describe('DataTableOptionsModel', () => {
  it('should create an instance', () => {
    const options = new DataTableOptionsModel();
    expect(options).toBeDefined();
    expect(options).toBeInstanceOf(DataTableOptionsModel);
  });

  it(`should have columns property of type Array<DataColumnModel>`, () => {
    const options = new DataTableOptionsModel();
    const columns: DataColumnModel[] = [
      { field: 'name', name: 'Name' },
      { field: 'age', name: 'Age' },
    ];
    options.columns = columns;
    expect(options.columns).toBeDefined();
    expect(Array.isArray(options.columns)).toBe(true);
    expect(options.columns.length).toBe(2);
  });

  it('should have btnNew property default to undefined', () => {
    const options = new DataTableOptionsModel();

    expect(options.btnNew).toBeUndefined();
  });

  it('should set columns property', () => {
    const columns: DataColumnModel[] = [
      { field: 'name', name: 'Name' },
      { field: 'age', name: 'Age' },
    ];
    const options = new DataTableOptionsModel();
    options.columns = columns;
    expect(options.columns).toEqual(columns);
  });

  it('should set btnNew property', () => {
    const options = new DataTableOptionsModel();
    options.btnNew = true;

    expect(options.btnNew).toBe(true);
  });
});
