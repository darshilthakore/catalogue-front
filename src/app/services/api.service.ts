import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Category } from '../shared/category';
import { baseURL } from '../shared/baseurl';
import { Subcategory } from '../shared/subcategory';
import { Product } from '../shared/product';
import { newProd } from '../shared/newProd';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public mysubject = new Subject();

  constructor(
    private http: HttpClient) { }

    private getAuthHeaders() {
      const httpHeaders = new HttpHeaders({
        'Content-Type': 'application/json'
      });
      return { headers: httpHeaders };
    }

    getCategories(): Observable<Category[]> {
      return this.http.get<Category[]>(baseURL + 'api/categories', this.getAuthHeaders());
    }

    getSubcategories(): Observable<Subcategory[]> {
      return this.http.get<Subcategory[]>(baseURL + 'api/subcategories', this.getAuthHeaders());
    }

    getProducts(): Observable<Product[]> {
      return this.http.get<Product[]>(baseURL + 'api/products', this.getAuthHeaders());
    }

    addProduct(product: newProd): Observable<newProd> {
      return this.http.post<newProd>(baseURL + 'api/add/', product, this.getAuthHeaders());
    }
}
