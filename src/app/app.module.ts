import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http' ;
import { AppComponent } from './app.component';
import { ProductListGridComponent } from './components/product-list/product-list-grid.component';
import { ProductService } from './services/product.service';
import {Routes, RouterModule} from '@angular/router';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  {path: 'products/:id', component: ProductDetailsComponent},
  {path: 'search/:keyword', component: ProductListGridComponent},
  {path: 'category/:id', component: ProductListGridComponent},
  {path: 'category', component: ProductListGridComponent},
  {path: 'products', component: ProductListGridComponent},
  {path: '', redirectTo : '/products', pathMatch : 'full'},
  {path: '**', redirectTo : '/products', pathMatch : 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    ProductListGridComponent,
    ProductCategoryMenuComponent,
    SearchComponent,
    ProductDetailsComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
