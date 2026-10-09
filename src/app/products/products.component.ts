import { environment } from 'src/environments/environment';
import { Product } from '../model/product';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { ProductService } from '../service/product.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit  {

  products: any[] = [];
  constructor (private productService: ProductService){
  }
  ngOnInit(): void {
    this.getProducts() 
  }

  public getProducts() {
     this.productService.getProducts().subscribe(data => {this.products = data})
  }
}
