import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from '../../services/auth.service';
import { ProductService } from '../../services/product.service';
import { Product } from '../../model/product.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-detailed-view',
  templateUrl: './detailed-view.component.html',
  styleUrls: ['./detailed-view.component.css']
})
export class DetailedViewComponent implements OnInit {

  product : Product[] = []
  products: any
  product_id: any
  private postsSub: Subscription;

  constructor(private authService: AuthService,
    private router: ActivatedRoute,
    private route: Router,
    private productService: ProductService,
    ) { }
  

  ngOnInit(){
    this.router.paramMap.subscribe(params => { 
      this.product_id = params.get("product_id")
      console.log(params)
      this.productService.getProductById(this.product_id).then(data => {
        this.products = data;
        console.log(this.products)
      });
    });
    // this.postsSub = this.productService.getPostUpdateListener()
    //   .subscribe((products: Product[]) => {
    //     this.products = products;
    //   });
  }

  // onNavigate(){
  //   this.route.navigate(["/product-view/", this.product_id]);
  // }

  // ngOnDestroy() {
  //   this.postsSub.unsubscribe();
  // }

}
