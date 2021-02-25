import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavabrComponent } from './navabr/navabr.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import { CategoriesComponent } from './categories/categories.component';
import { CreateCategoryComponent } from './categories/create-category/create-category.component';
import { ProductsComponent } from './products/products.component';
import { CreateProductComponent } from './products/create-product/create-product.component';
import { DetailedViewComponent } from './products/detailed-view/detailed-view.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSelectModule} from '@angular/material/select';
import { FilterPipe } from './filter.pipe';
import { SearchComponent } from './search/search.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { SortPipe } from './sort.pipe';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavabrComponent,
    SigninComponent,
    SignupComponent,
    CategoriesComponent,
    CreateCategoryComponent,
    ProductsComponent,
    CreateProductComponent,
    DetailedViewComponent,
    FilterPipe,
    SearchComponent,
    SortPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatSelectModule,
    NgxPaginationModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}],
  bootstrap: [AppComponent],
  entryComponents: [SignupComponent, SigninComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
