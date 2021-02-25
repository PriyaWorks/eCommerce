import { Injectable } from '@angular/core';
import { Product } from '../model/product.model';
import { Category } from '../model/category.model';
import { HttpClient } from "@angular/common/http";
import { from } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";
import { Observable, of, Subject } from 'rxjs';
import { ProductsComponent } from '../products/products.component';
import { Location } from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products: Product[] = [];

  private productUpdate = new Subject<{ products: Product[], productCount: number }>();
  apiUrl = 'http://localhost:5000/api/product/'

  constructor(private http: HttpClient, private router: Router) { }

  // create product
  createProduct(productname:string, productdescription:string, productcategory: string, productcollectionname:string,
     productcolor:string, productmaterial:string, productprice:any, productquantity:any, productsize:string, 
     productbrandname:string,  image: File) {
    const postData = new FormData();
    postData.append("productname", productname);
    postData.append("productdescription", productdescription);
    postData.append("productcategory", productcategory);
    postData.append("productcollectionname", productcollectionname);
    postData.append("productcolor", productcolor);
    postData.append("productmaterial", productmaterial);
    postData.append("productprice", productprice);
    postData.append("productquantity", productquantity);
    postData.append("productsize", productsize);    
    postData.append("productbrandname", productbrandname);    
    postData.append("image", image, productname);
    this.http
      .post<{ message: string; product: Product }>(
        this.apiUrl + 'createproduct',
        postData
      )
      .subscribe(responseData => {
        const post: Product = {
          product_id: responseData.product.product_id,
          productname: productname,
          productdescription: productdescription,
          productcategory: productcategory,
          productcollectionname: productcollectionname,
          productcolor: productcolor,
          productmaterial: productmaterial, 
          productprice: productprice,
          productquantity: productquantity,
          productsize: productsize,
          productbrandname: productbrandname,
          productimageurl: responseData.product.productimageurl,
         
        };
        this.products.push(post);         
      });
  }

  // get products
  getAllProducts(): Promise<any>{
    return this.http.get(this.apiUrl + 'getallproduct')
    .toPromise();
  }
  
  // get product by product id
  getProductById(product_id: any): Promise<any> {
    // console.log(product_id)
    return this.http
    .get(this.apiUrl + 'getproduct/' + product_id)
    .toPromise();
  }

  getProductByCategory(productcategory: any): Observable<any> {
    // console.log(product_id)
    return this.http
    .get(this.apiUrl + 'getAllProductByCategory/' +productcategory);
  }

  fetchProduct(): Observable<any> {
    return of(this.products);
  }



  // getProductByCategory(productcategory: any, productsPerPage: number, currentPage: number){
  //   const queryParams = `?pagesize=${productsPerPage}&page=${currentPage}`;
  //   this.http.get<{ message: string; products: any; maxProducts: number }>
  //     (this.apiUrl + 'getAllProductByCategory/' +productcategory + queryParams)
  //     .pipe(
  //       map( productData => {
  //         return {
  //           products: productData.products.map((post: {_id:any, productname: any; productcategory: any; productcolor: any;
  //             productsize:any, productprice: any, productquantity:any, productbrandname: any,productmaterial:any, productimageurl:any })  => {
  //             return  {
  //               product_id: post._id,
  //               productname: post.productname,
  //               productcategory: post.productcategory,
  //               productcolor: post.productcolor,
  //               productsize: post.productsize,
  //               productprice: post.productprice,
  //               productquantity: post.productquantity,
  //               productbrandname: post.productbrandname,
  //               productmaterial: post.productmaterial,
  //               productimageurl: post.productimageurl
  //             };
  //           }),
  //           maxProducts: productData.maxProducts
  //         };
  //       })
  //     )
  //     .subscribe(transformedPostData => {
  //       this.products = transformedPostData.products;
  //       this.productUpdate.next({
  //         products: [...this.products],
  //         productCount: transformedPostData.maxProducts
  //       });
  //     });
  // }

  getPostUpdateListener() {
    return this.productUpdate.asObservable();
  }
}
