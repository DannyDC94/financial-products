import { Injectable } from '@angular/core';
import {catchError, Observable, throwError} from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../interfaces/index'
import { environment } from '../../environment/environment';

const HEADERS = new HttpHeaders({
  'Content-Type': 'application/json',
  'authorId': environment.authorId
});
const OPTIONS = { headers: HEADERS };
const URL_REQUEST = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class FinancialProductsService {
  constructor(private httpClient: HttpClient) {}

  getFinancialProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(URL_REQUEST, OPTIONS).pipe(catchError(this.handleError));
  }

  saveFinancialProducts(data: any): Observable<Product> {
    return this.httpClient.post<Product>(URL_REQUEST, data, OPTIONS).pipe(catchError(this.handleError));
  }

  editFinancialProducts(data: any): Observable<Product> {
    return this.httpClient.put<Product>(URL_REQUEST, data, OPTIONS).pipe(catchError(this.handleError));
  }

  deleteFinancialProducts(id: string): Observable<any> {
    const url = `${URL_REQUEST}?id=${id}`
    return this.httpClient.delete(url, OPTIONS).pipe(catchError(this.handleError));
  }

  existFinancialProducts(id: string): Observable<boolean> {
    const url = `${URL_REQUEST}/verification?id=${id}`
    return this.httpClient.get<boolean>(url, OPTIONS).pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    console.error('Error:', error);
    return throwError(error);
  }
}
