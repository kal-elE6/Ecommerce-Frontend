import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/api/products';

  constructor(private httpClient: HttpClient) { }

  //write new method - returns an observable of product array - This method will map the json data from the Spring REST service to a product array
  getProductList(): Observable<Product[]> {
    return this.httpClient.get<GetResponse>(this.baseUrl).pipe(
      map(response => response._embedded.products)
    );
  }
}

//this interface getrsponse data helps us unwrap the JSON data from spring of data REST API and make use of _embedded from spring data rest API
interface GetResponse {
  _embedded: {
    //this will access some array of products
    products: Product[];
  }
}
