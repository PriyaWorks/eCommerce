import { Component, OnInit } from '@angular/core';
import { mimeType } from "./mime-type.validator";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Category } from '../../model/category.model';
import { Product } from '../../model/product.model';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from '../../services/auth.service';
import { Location } from "@angular/common";

interface Size {
  value: string;
}

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  sizes: Size[] = [
    {value: 'Small'},
    {value: 'XS'},
    {value: 'Medium'},
    {value: 'Large'},
    {value: 'XL'},
  ];

  categories: Category[] = [];
  productname : string = '';
  productdescription : string = '';
  productcategory : string = '';
  productcolor : string = '';
  productsize : string = '';
  productprice : string = '';
  productquantity : string = '';
  productbrandname : string = '';
  productcollectionname : string = '';
  productmaterial : string = '';
  productimageurl: string = '';
  product: Product;
  category: any;
  form: FormGroup;
  imagePreview:string;
  private mode = "create";

  constructor(private authService: AuthService,
    public route: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryService,
    private location: Location) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => { 
      this.category = params.get("categoryname")
    });
    // getting categories name
    this.categoryService.getAllCategories().then( data => {
      this.categories = data.categories;
    }).catch( err => { err; })
    // form data
    this.form = new FormGroup({
      productname: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      productdescription: new FormControl(null, { validators: [Validators.required] }),
      productcategory: new FormControl(null, { validators: [Validators.required] }),
      productcollectionname: new FormControl(null, { validators: [Validators.required] }),
      productcolor: new FormControl(null, { validators: [Validators.required] }),
      productmaterial: new FormControl(null, { validators: [Validators.required] }),
      productprice: new FormControl(null, { validators: [Validators.required] }), 
      productquantity: new FormControl(null, { validators: [Validators.required]}),    
      productsize: new FormControl(null, { validators: [Validators.required] }),      
      productbrandname: new FormControl(null, { validators: [Validators.required] }),
      
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      }),

    });
  }

  onImagePicked(event :Event){
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get("image").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
    console.log(file);
  }

  onSaveProduct(){
    if (this.form.invalid) {
      return;
    }
    if (this.mode === "create") {
      // console.log("inside create product")
      this.productService.createProduct(
        
        this.form.value.productname,
        this.form.value.productdescription,
        this.form.value.productcategory,
        this.form.value.productcollectionname,
        this.form.value.productcolor,
        this.form.value.productmaterial,
        this.form.value.productprice,
        this.form.value.productquantity,
        this.form.value.productsize,
        this.form.value.productbrandname,
        this.form.value.image
      );
    this.form.reset();
  }
  }

  backWithLocation(){
    this.location.back();
  }
}
