export interface Product {
  id: string,
  name: string,
  logo: string,
  description: string,
  date_release: string,
  date_revision: string,
  code?: string
  isDropdownActive?: boolean,
  [key: string]: any;
}
