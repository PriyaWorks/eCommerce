import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from '../services/auth.service';
import { Category } from '../model/category.model';
import { CategoryService } from '../services/category.service';
import {ProductService} from '../services/product.service';
import { Subscription } from 'rxjs';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categories : Category[] = []
  userIsAuthenticated: string = "Admin";
  iconDisable = true;
  totalCategories = 10;
  categoriesPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [2,3,4,5];
  private postsSub: Subscription;

  constructor(private authService: AuthService,
    private router: ActivatedRoute,
    private route: Router,
    private categoryService: CategoryService,
    private productService: ProductService) { }

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getUserType();
    this.categoryService.getCategories(this.categoriesPerPage, this.currentPage);
    this.postsSub = this.categoryService.getPostUpdateListener()
      .subscribe((categoryData: {categories: Category[], categoryCount: number }) => {
        this.totalCategories = categoryData.categoryCount;
        this.categories = categoryData.categories;
      });
  }

  onCreateCatergory(){
    this.route.navigate(["/create-category"]);
  }

  onChangedPage(pageData: PageEvent){
    this.currentPage = pageData.pageIndex + 1;
    console.log(this.currentPage)
    this.categoriesPerPage = pageData.pageSize;
    console.log(this.categoriesPerPage)
    this.categoryService.getCategories(this.categoriesPerPage, this.currentPage)
  }


  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}
