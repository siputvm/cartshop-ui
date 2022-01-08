import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {


  constructor(private productService: ProductService, private route: ActivatedRoute) { }
  
   product!: Product;

  ngOnInit(): void {
    this.route.paramMap.subscribe(()=>{
      this.handleProductDetails();
    });
  }
  handleProductDetails() {
    const theParamProductId = this.route.snapshot.paramMap.get('id');
    if(theParamProductId != null){
      const theProductId: number = +theParamProductId; 
      this.productService.getProductById(theProductId).subscribe(data=>{
        console.log(data);
        this.product = data;
      });
    }
   
  }

}
