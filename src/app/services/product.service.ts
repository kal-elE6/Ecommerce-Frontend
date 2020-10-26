import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { map } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/api/products';

  private categoryUrl = 'http://localhost:8080/api/product-category';

  constructor(private httpClient: HttpClient) { }

  getProduct(theProductId: number): Observable<Product> {
    // need to build URL based on product id
    const productUrl = `${this.baseUrl}/${theProductId}`;

    return this.httpClient.get<Product>(productUrl);
  }

  //write new method - returns an observable of product array - This method will map the json data from the Spring REST service to a product array
  getProductList(theCategoryId: number): Observable<Product[]> {

    // need to build URL based on category id ... we're doing it now!
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;

    return this.getProducts(searchUrl);
  }

  searchProducts(theKeyword: string): Observable<Product[]>  {
     // need to build URL based on keyword ... we're doing it now!
     const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;

     return this.getProducts(searchUrl);
  }

  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }

  getProductCategories(): Observable<ProductCategory[]>{

    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }

}

//this interface getrsponse data helps us unwrap the JSON data from spring of data REST API and make use of _embedded from spring data rest API
interface GetResponseProducts {
  _embedded: {
    //this will access some array of products
    products: Product[];
  }
}

interface GetResponseProductCategory {
  _embedded: {
    //this will access some array of products
    productCategory: ProductCategory[];
  }
}
