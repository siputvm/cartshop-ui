import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private urlBase:string = 'http://localhost:8080/api';

  constructor(private httpClient: HttpClient) { }

  getProductList(currentCategotyId : number):Observable<Product[]>{
    const searchUrl = `${this.urlBase}/products/search/findByCategoryId?id=${currentCategotyId}`;
    return this.getProducts(searchUrl);
  }

  getProductListPaginate(thePage: number,thePageSize: number, currentCategotyId : number):Observable<GetResponseProducts>{
    const searchUrl = `${this.urlBase}/products/search/findByCategoryId?id=${currentCategotyId}` + 
                      `&page${thePage}&size=${thePageSize}`;
    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  searchProducts(theKeyWord: string):Observable<Product[]> {
    const searchUrl = `${this.urlBase}/products/search/findByNameContaining?name=${theKeyWord}`;
    return this.getProducts(searchUrl);
  }


  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(searchUrl)
      .pipe(map(response => response._embedded.products));
  }

  getProductCategories() : Observable<ProductCategory[]> {    
    const searchUrl = `${this.urlBase}/product-category`;
    return this.httpClient.get<GetResponseProductCategory>(searchUrl)
                          .pipe(map(response=> response._embedded.productCategory));
  }

  getProductById(theProductId: number) : Observable<Product> {
    const productUrl = `${this.urlBase}/products/${theProductId}`;
    return this.httpClient.get<Product>(productUrl);
  }
}

interface GetResponseProducts extends Pageable{
  _embedded:{
    products: Product[];
  }
}

interface GetResponseProductCategory extends Pageable{
  _embedded:{
    productCategory: ProductCategory[];
  }
}

interface Pageable{
  page:{
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}

