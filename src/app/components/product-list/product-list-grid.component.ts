import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list-grid.component.css']
})
export class ProductListGridComponent implements OnInit {

  products: Product[] = [];
  currentCategotyId : number = 0;
  searchMode: boolean = false;

  constructor(private productService: ProductService,
              private route : ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(()=>{
      this.listProducts();
    });
  }

  listProducts(){
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if(this.searchMode){
      this.handleSearchProducts();
    }else{
      this.handleListProducts();
    }
  }
  
  handleSearchProducts() {
    const theKeyWord = this.route.snapshot.paramMap.get('keyword');
    if(theKeyWord != null){
      this.productService.searchProducts(theKeyWord).subscribe(data=>{
        this.products = data;
      });
    }
  }

  handleListProducts(){
    const hasCategory: boolean = this.route.snapshot.paramMap.has('id');
    if(hasCategory){
      let id  = this.route.snapshot.paramMap.get('id');
      if(id != null){
        this.currentCategotyId = +id; 
      }
    }else{
      this.currentCategotyId = 1; 
    }

    this.productService.getProductList(this.currentCategotyId)
      .subscribe(data => {
        this.products = data;
      });
  }

}
