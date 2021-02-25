import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from '../services/auth.service';
import { ProductService } from '../services/product.service';
import { Product } from '../model/product.model';
import { Subscription } from 'rxjs';
import { CategoryService } from '../services/category.service';
import { Location } from "@angular/common";
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import { FilterPipe } from '../filter.pipe';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
 
  product : Product[] = []
  products: any;
  userIsAuthenticated: string = "Admin";
  iconDisable = true;
  category  : any;
  productname = '';
  totalProducts : any;
  currentPage = 1;
  sortByParam = '';
  sortDirection = 'asc';
  private postsSub: Subscription;

  constructor(private authService: AuthService,
    private router: ActivatedRoute,
    private route: Router,
    private productService: ProductService,
    private categoryService: CategoryService,
    private location: Location) { }

  ngOnInit() {
    this.router.paramMap.subscribe(params => { 
        this.category = params.get("categoryname")        
    });
    
    // this.productService.getProductByCategory(this.category, this.productsPerPage, this.currentPage)
    this.productService.getProductByCategory(this.category).subscribe(data => {
      this.product = data.products;
      this.totalProducts = data.products.length;
      console.log(this.totalProducts)
      console.log(this.product)
    });
    this.postsSub = this.productService.getPostUpdateListener()
      .subscribe(( productData: { products: Product[] , productCount: number }) => {
        // this.totalProducts = productData.productCount;
        // this.products = productData.products;
        // console.log(this.products)
      });
    this.userIsAuthenticated = this.authService.getUserType();
    
  }

  onCreateProduct(){
    this.route.navigate(["/category/", this.category, "product", "create-product"]);
  }

  onSearch(){
    this.productname = '';
  }

  onSortDirection(){
    if (this.sortDirection === 'desc'){
      this.sortDirection = 'asc';
    } else {
      this.sortDirection = 'desc';
    }
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}
