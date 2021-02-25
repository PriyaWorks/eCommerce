import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { from } from 'rxjs';
import { HomeComponent } from './home/home.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { CategoriesComponent } from './categories/categories.component';
import { CreateCategoryComponent } from './categories/create-category/create-category.component';
import { ProductsComponent } from './products/products.component';
import { DetailedViewComponent } from './products/detailed-view/detailed-view.component';
import { CreateProductComponent } from './products/create-product/create-product.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: '', component: HomeComponent},
  { path: 'register', component: SigninComponent },
  { path: 'login', component: SignupComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'create-category', component: CreateCategoryComponent },
  { path: 'category/:categoryname/products', component: ProductsComponent },
  { path: 'category/:categoryname/product/create-product', component: CreateProductComponent },
  { path: 'category/product/:product_id', component: DetailedViewComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppRoutingModule { }
export const routingComponents = [
  HomeComponent,
  CategoriesComponent
];
