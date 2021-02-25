import { Injectable } from '@angular/core';
import { Category } from '../model/category.model';
import { HttpClient } from "@angular/common/http";
import { Subject, from } from "rxjs";
import { map } from "rxjs/operators";
import { Observable } from 'rxjs';
import { Router } from "@angular/router";
import {Product} from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categories: Category[] = [];
  private products: Product[] = [];
  
  // category : Category;
  private categoryUpdate = new Subject<{ categories: Category[]; categoryCount: number }>();
  apiUrl = 'http://localhost:5000/api/category/'

  constructor(private http: HttpClient, private router: Router) { }

  // create category
  createCategory(categoryname:string, categorydescription:string, image: File) {
    const postData = new FormData();
    postData.append("categoryname", categoryname);
    postData.append("categorydescription", categorydescription);
    postData.append("image", image, categoryname);
    
    this.http
      .post<{ message: string; category: Category }>(
        this.apiUrl + 'createcategory',
        postData
      )
      .subscribe(responseData => {
        const post: Category = {
          _id: responseData.category._id,
          categoryname: categoryname,
          categorydescription: categorydescription,
          categoryimageurl: responseData.category.categoryimageurl,
         
        };
        this.categories.push(post);
                
        // this.categoryUpdate.next([...this.categories]);
        this.router.navigate(["/categories"]); 
      });
  }

  // get categories
  getCategories(categoriesPerPage: number, currentPage: number){
    const queryParams = `?pagesize=${categoriesPerPage}&page=${currentPage}`;
    this.http.get<{ message: string; categories: any; maxCategories: number }>
    (this.apiUrl + 'getcategories' + queryParams)
    .pipe(
      map( categoryData => {
        return {
          categories: categoryData.categories.map((post: { categoryname: any; categorydescription: any; categoryimageurl: any; })  => {
            return {
              categoryname: post.categoryname,
              categorydescription: post.categorydescription,
              categoryimageurl: post.categoryimageurl,
            };
          }),
          maxCategories: categoryData.maxCategories
        };
      })
    )
    .subscribe(transformedPostData => {
      this.categories = transformedPostData.categories;
      this.categoryUpdate.next({
        categories: [...this.categories],
        categoryCount: transformedPostData.maxCategories
      });
    });
  }

  getAllCategories(): Promise<any>{
    return this.http.get(this.apiUrl + 'getallcategories').toPromise();
  }
  
  getPostUpdateListener() {
    return this.categoryUpdate.asObservable();
  }

  // get category by id
  // getCategoryById(): Promise<any>{
  //   return this.http.get('')
  //   .toPromise();
  // }
}
